import { DataTypes } from "sequelize";
import sequelize from "./conexion.js";

export const tbl_usuarios = sequelize.define('usuarios', {
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    usuario_red: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    dominio: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    foto_perfil: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    clave: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    estado_usuario: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true  
    },
    enviar_mensajes: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false  // Se establece en false porque no todos tienen permiso de enviar mensajes
    },
    contacto_directo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false  // Se establece en false porque no todos tienen contacto directo
    },
    fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false
    },
    id_rol: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    timestamps: false // Desactiva las columnas createdAt y updatedAt
});

tbl_usuarios.associate = (models) => {
    tbl_usuarios.belongsTo(models.tbl_rol, {
        foreignKey: {
            allowNull: false,
            name: 'id_rol'
        },
    });
    return tbl_usuarios;
};

tbl_usuarios.associate = (models) => {
    tbl_usuarios.hasMany(models.tbl_mensajes, {
        foreignKey: 'id_usuario', // El nombre de la clave foránea
    });
    return tbl_usuarios;
};


