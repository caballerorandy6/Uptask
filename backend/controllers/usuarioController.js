import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import e from "express";

//Registrando usuario y almacenando en la base de datos
const registrar = async (req, res) => {
  //Evitar registros duplicados
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({ email }); //Encuentra el primero que coincida con el email

  if (existeUsuario) {
    //Comprobacion
    const error = new Error("Usuario ya registrado!");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const usuario = new Usuario(req.body); //Crea un objeto de tipo usuario
    usuario.token = generarId(); //Generando un Id unico
    const usuarioAlmacenado = await usuario.save(); //Almacena el usuario en la BD
    res.json(usuarioAlmacenado); //Retorna el usuario almacenado
  } catch (error) {
    console.log(error);
  }
};

//Autenticar Usuario
const autenticar = async (req, res) => {
  const { email, password } = req.body;

  //Comprobar si el usuario existe
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe!");
    return res.status(404).json({ msg: error.message });
  }

  //Comprobar si el usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error("Tu cuenta no ha sido confirmada!");
    return res.status(403).json({ msg: error.message });
  }

  //Comprobar su password //No colocar en el JWT informacion sensible como tarjetas de credito, password, etc
  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("El password es incorrecto!");
    return res.status(403).json({ msg: error.message });
  }
};

//Confirmar Cuenta de Usuario
const confirmar = async (req, res) => {
  const { token } = req.params; //token es la variable generada para el routing dinamico
  const usuarioConfirmar = await Usuario.findOne({ token });
  if (!usuarioConfirmar) {
    const error = new Error("Token no válido");
    return res.status(403).json({ msg: error.message });
  }
  try {
    usuarioConfirmar.confirmado = true;
    usuarioConfirmar.token = "";
    await usuarioConfirmar.save();
    res.json({ msg: "Usuario confirmado correctamente!" });
    console.log(usuarioConfirmar);
  } catch (error) {
    console.log(error);
  }
};

export { registrar, autenticar, confirmar };
