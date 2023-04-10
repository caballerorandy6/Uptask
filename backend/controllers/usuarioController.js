import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import { emailRegistro } from "../helpers/emails.js";

//Registrando usuario y almacenando en la base de datos
const registrar = async (req, res) => {
  //Evitar registros duplicados
  const { email } = req.body; // req.body extrae los valores del formulario
  const existeUsuario = await Usuario.findOne({ email }); //Encuentra el primero que coincida con el email

  if (existeUsuario) {
    //Comprobacion
    const error = new Error("Usuario ya registrado!");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const usuario = new Usuario(req.body); //Crea un objeto de tipo usuario
    usuario.token = generarId(); //Generando un Id unico
    await usuario.save(); //const usuarioAlmacenado = await usuario.save(); Almacena el usuario en la BD

    //Enviar el email de confirmacion
    const { email, nombre, token } = usuario;

    emailRegistro({
      email,
      nombre,
      token,
    });

    res.json({
      msg: "Usuario creado correctamente. Revisa tu email para confirmar tu cuenta.",
    }); //res.json(usuarioAlmacenado); //Retorna el usuario almacenado
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
  //token es la variable generada para el routing dinamico //req.params extrae token de la url
  const { token } = req.params;
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
  } catch (error) {
    console.log(error);
  }
};

//Olvide Password
const olvidePassword = async (req, res) => {
  const { email } = req.body;

  //Comprobar si el usuario existe
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe!");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuario.token = generarId();
    await usuario.save();
    res.json({ msg: "Hemos enviado un email con las instrucciones!" });
  } catch (error) {
    console.log(error);
  }
};

//Comprobar Token
const comprobarToken = async (req, res) => {
  const { token } = req.params;

  const tokenValido = await Usuario.findOne({ token });

  if (tokenValido) {
    res.json({ msg: "Token válido y el usuario existe!" });
  } else {
    const error = new Error("Token no válido!");
    return res.status(404).json({ msg: error.message });
  }
};

//Nuevo Password
const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const usuario = await Usuario.findOne({ token });

  if (usuario) {
    res.json({ msg: "Token válido y el usuario existe!" });
  } else {
    const error = new Error("Token no válido!");
    return res.status(404).json({ msg: error.message });
  }
};

//Perfil del Usuario, estos datos se obtienen desde el servidor despues de verificar el usuario con el middleware checkAuth
const perfil = async (req, res) => {
  //leyendo estos datos desde el servidor despues que se autenticó el usuario
  const { usuario } = req;

  res.json(usuario);
};

export {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
};
