import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize, { models } from './src/Models/index.js';
import './src/Models/Usuarios.js'
import './src/Models/Roles.js'


// Inicializar dotenv para cargar variables de entorno
dotenv.config();


// Inicializar Express
const app = express();


// Configuración de CORS para permitir solicitudes desde múltiples orígenes
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());


// Importar rutas
import rutaLogin from './src/Routes/login.js';


// Usar rutas
app.use('/api/login', rutaLogin);




// Sincronizar con la base de datos
sequelize.sync({ force: false })
    .then(() => {
        console.log('¡Sincronización con la base de datos completada!');
    })
    .catch(error => {
        console.log(`Error en la sincronización: ${error}`);
    });

// Iniciar el servidor
const puerto = process.env.PORT || 3000;
app.listen(puerto, () => {
    console.log(`Servidor ejecutándose en el puerto ${puerto}...`);
});
