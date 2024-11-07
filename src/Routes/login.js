import { Router } from "express";
import { registrarUsuario } from "../Controllers/login.js";
let rutaLogin = Router();

// RUTAS


// RUTA REGISTRAR USUARIO
rutaLogin.post("/registrarUsuario/", registrarUsuario);


export default rutaLogin;