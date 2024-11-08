import { Router } from "express";
import { registrarUsuario } from "../Controllers/login.js";
let rutaLogin = Router();




import fs from 'fs'; // para manejar archivos locales
import path from "path"; // para manejar rutas del archivo
import multer from "multer"; // para subir archivos
import { fileURLToPath } from "url";



// Obtén la ruta del archivo actual y el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '../../PUBLIC/uploads/perfilesUsuarios'); // aca meto la ruta del archivo
if (!fs.existsSync(uploadDir)) { // verifico si existe
    fs.mkdirSync(uploadDir, { recursive: true }); // si no existe lo creo 
}




// configuracion del middleware para subir archivos al server
const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // aca coloco la ruta donde se va enviar los archivos
    },
    filename: (req, file, cb) => {
        cb(null, "pe-" + Date.now() + "-" + file.originalname); // aca coloco como quiero que se guarde el archivo
    },
});
const upload = multer({ storage: almacenamiento });

//==================================================================



// RUTAS


// RUTA REGISTRAR USUARIO
rutaLogin.post("/registrarUsuario/", upload.single('foto'), registrarUsuario);


export default rutaLogin;