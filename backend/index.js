import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express(); //Creando servidor express
app.use(express.json()); //Permite procesar la informacion de tipo json

dotenv.config();

conectarDB();

//Routing //Gracias a USE soporta los verbos GET, POST, PUT, PATCH, DELETE
app.use("/api/usuarios", usuarioRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
