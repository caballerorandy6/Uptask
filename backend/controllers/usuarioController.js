import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";

//Registrando usuario y almacenando en la base de datos
const registrar = async (req, res) => {
  //Evitar registros duplicados
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({ email }); //Encuentra el primero que coincida con el email

  if (existeUsuario) {
    //Comprobacion
    const error = new Error("Usuario ya registrado");
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
  res.status(200).json({ msg: "Autenticando" });
};

export { registrar, autenticar };
