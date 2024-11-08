import { tbl_usuarios } from "../Models/Usuarios.js";
import bcrypt from "bcrypt";
import fs from 'fs';




/**
 * Registra un nuevo usuario en la base de datos. La función realiza varias validaciones, como comprobar que los 
 * datos del usuario estén completos, verificar si el nombre de usuario ya existe, encriptar la contraseña y 
 * validar el tipo y existencia de un archivo de imagen.
 * 
 * @async
 * @param {Object} req - Objeto de solicitud (Request) de Express.
 * @param {Object} res - Objeto de respuesta (Response) de Express.
 * @param {string} req.body.nombreCompleto - Nombre completo del usuario, debe ser una cadena no vacía.
 * @param {string} req.body.password - Contraseña del usuario, será encriptada antes de guardarse.
 * @param {string} req.body.nombreUsuario - Nombre de usuario único para la cuenta.
 * @param {number} req.body.idRol - ID del rol del usuario, debe coincidir con un rol existente en la base de datos.
 * @param {Object} req.file - Archivo de imagen de perfil, debe ser tipo JPEG o PNG.
 * @returns {Object} Respuesta en formato JSON con el estado de la operación:
 * - `status`: `true` si el usuario fue creado correctamente, `false` si ocurrió un error.
 * - `descripcion`: Descripción detallada de la operación.
 * - `error`: El mensaje de error si algo falla, o `null` si la operación fue exitosa.
 * 
 * @throws {Error} Si ocurre un error al insertar el usuario en la base de datos o al procesar el archivo.
 */


export const registrarUsuario = async (req, res) => {
    const { nombreCompleto, password, nombreUsuario, idRol } = req.body;

    // Validación de entrada
    if (!nombreCompleto || !password || !nombreUsuario || !idRol) {

        // Eliminar archivo si no es válido
        fs.unlinkSync(req.file.path);

        return res.status(400).send({
            status: false,
            descripcion: "Faltan Datos Por Enviar!!",
            error: null
        });
    }

    try {
        // Verificar si el usuario ya está registrado
        const usuarioExiste = await tbl_usuarios.findOne({ where: { usuario: nombreUsuario } });
        if (usuarioExiste) {

            // Eliminar archivo si no es válido
            fs.unlinkSync(req.file.path);

            return res.status(400).send({
                status: false,
                descripcion: "Usuario ya está Registrado",
                error: null
            });
        }

        // Encriptar la contraseña
        const salRondas = 10;
        const contraIncriptada = `s0/\/${password}\P4$$w0rD`;
        const hash = await bcrypt.hash(contraIncriptada, salRondas);

        // Validar la existencia y tipo de archivo
        if (!req.file) {
            return res.status(400).send({
                status: false,
                descripcion: "No se ha proporcionado ningún archivo",
                error: null
            });
        }

        const archivo = req.file.mimetype.split("/");
        const type = archivo[1].toUpperCase();
        if (type !== "JPEG" && type !== "PNG") {
            // Eliminar archivo si no es válido
            fs.unlinkSync(req.file.path);
            return res.status(400).send({
                status: false,
                descripcion: "Solo se aceptan imágenes como PNG o JPEG",
                error: null
            });
        }
        let fechaAcutal = new Date();
        const fechaFormateada = formatoFecha(fechaAcutal);

        // Insertar usuario en la base de datos
        await tbl_usuarios.create({
            nombre_completo: nombreCompleto,
            dominio: "Null",
            foto_perfil: req.file.filename,
            password: hash,
            usuario: nombreUsuario,
            fecha_registro: fechaFormateada,
            RoleIdRoles: idRol,
        });

        res.status(200).send({
            status: true,
            descripcion: "Usuario insertado con éxito",
            error: null
        });

    } catch (error) {
        // Eliminar archivo si no es válido
        fs.unlinkSync(req.file.path);

        res.status(500).send({
            status: false,
            descripcion: "No se pudo insertar los datos",
            error: error.message
        });
    }
};



/**
 * Formatea una fecha en el formato YYYY/MM/DD HH:MM:SS
 * 
 * @param {Date} fecha - La fecha a formatear.
 * @returns {string} La fecha formateada como una cadena en el formato YYYY/MM/DD HH:MM:SS.
 */

const formatoFecha = (fecha) => {
    const year = fecha.getFullYear();
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Mes empieza desde 0
    const day = fecha.getDate().toString().padStart(2, '0');
    const hours = fecha.getHours().toString().padStart(2, '0');
    const minutes = fecha.getMinutes().toString().padStart(2, '0');
    const seconds = fecha.getSeconds().toString().padStart(2, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
};

// -- fin funcion --