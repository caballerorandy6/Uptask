import express from "express";

const router = express.Router();

import {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
} from "../controllers/usuarioController.js";

import checkAuth from "../middleware/checkAuth.js";

//Autenticacion, Registro y Confirmacion de Usuarios
//Crea un nuevo usuario
router.post("/", registrar);

//Autenticarse en la cuenta
router.post("/login", autenticar);

//Routing Dinamico. Lo que se escriba despues de los 2 puntos ":", sera la variable que generará Express y podremos acceder a ella en el Controller
router.get("/confirmar/:token", confirmar);

//Cuando el usuario olvida el password generar un nuevo token para enviarselo al usuario
router.post("/olvide-password", olvidePassword);

//Validar el token que se le envia al usuario para cambiar el password
//router.get("/olvide-password/:token", comprobarToken);

//Creando nuevo Password
//router.post("/olvide-password/:token", nuevoPassword);

//Es lo mismo que los dos anteriores, es la forma que se debe de utilizar cuando tenemos un mismo endpoint con diferentes funciones
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

router.get("/perfil", checkAuth, perfil);

export default router;
