import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

//Comprobar que el usuario esta autenticado
const checkAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; //Separando la palabra Bearer del Token

      const decoded = jwt.verify(token, process.env.JWT_SECRET); //Decodificando el Token

      req.usuario = await Usuario.findById(decoded.id).select(
        "-password -confirmado -token -createdAt -updatedAt -__v"
      ); //Creando la variable que contiene la informacion del usuario //Las variables con el signo de menos adelante son campos que no necesito en este momento

      //console.log(req.usuario);

      //Una ves que verificamos el JWT y lo asignamos al req.usuario nos vamos al siguiente middleware
      return next();
    } catch (error) {
      console.log(error);
      return res.status(404).json({ msg: "Hubo un error" });
    }
  }

  //En caso de que el usuario no mande un TOKEN mostramos un mensaje de error
  if (!token) {
    const error = new Error("Token no válido");
    return res.status(401).json({ msg: error.message });
  }

  next(); //Ejecuta el siguiente middleware
};

export default checkAuth;
