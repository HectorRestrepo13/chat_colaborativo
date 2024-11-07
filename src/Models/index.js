import sequelize from './conexion.js'; // Asegúrate de importar la conexión a la base de datos
import { tbl_Rol } from './Roles.js';
import { tbl_usuarios } from './Usuarios.js';
// Importa todos los modelos aquí

// Llama a los métodos associate después de definir todos los modelos

// Objeto de modelos
const models = { tbl_Rol, tbl_usuarios };

// Establecer asociaciones
Object.keys(models).forEach(modelName => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

// Exporta todos los modelos y la conexión para que puedan ser usados en otros lugares
export { models }
export default sequelize;