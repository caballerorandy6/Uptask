import express from "express";
const router = express.Router();

import {
  registrar,
  autenticar,
  confirmar,
} from "../controllers/usuarioController.js";

//Autenticacion, Registro y Confirmacion de Usuarios
router.post("/", registrar); //Crea un nuevo usuario
router.post("/login", autenticar);
//Routing Dinamico. Lo que se escriba despues de los 2 puntos ":", sera la variable que generará Express y podremos acceder a ella en el Controller
router.get("/confirmar/:token", confirmar);

export default router;
