import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express(); //Creando servidor express
app.use(express.json()); //Permite procesar la informacion de tipo json

//Busca archivo que contiene las variables de entorno .ENV
dotenv.config();

//LLamada al metodo que connecta la Base de Datos con la aplicacion.
conectarDB();

//Routing //Gracias a USE soporta los verbos GET, POST, PUT, PATCH, DELETE
app.use("/api/usuarios", usuarioRoutes);

//Variable de entorno para el puerto
const PORT = process.env.PORT || 4000;

//Escuchando por el puerto determinado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
