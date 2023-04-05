import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";
import tareaRoutes from "./routes/tareaRoutes.js";

const app = express(); //Creando servidor express
app.use(express.json()); //Permite procesar la informacion de tipo json

//Busca archivo que contiene las variables de entorno .ENV
dotenv.config();

//LLamada al metodo que connecta la Base de Datos con la aplicacion.
conectarDB();

//Configurar CORS
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    //console.log(origin);
    //Puede Consultar la API
    callback(null, true);
    if (whitelist.includes(origin)) {
    } else {
      //No esta permitido
      callback(new Error("Error de Cors"));
    }
  },
};

app.use(cors(corsOptions));

//Routing //Gracias a USE soporta los verbos GET, POST, PUT, PATCH, DELETE
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/tareas", tareaRoutes);

//Variable de entorno para el puerto
const PORT = process.env.PORT || 4000;

//Escuchando por el puerto determinado
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
