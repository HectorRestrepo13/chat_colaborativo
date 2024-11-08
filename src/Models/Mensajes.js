import { DataTypes } from "sequelize";
import sequelize from "./conexion.js";

export const tbl_mensajes = sequelize.define('mensajes', {
    id_mensaje: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    contenido: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tipo_contenido: {
        type: DataTypes.STRING(45),
        allowNull: true  // Se establece true para de default para estar activo
    },
    fecha_envio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    multimedia: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    estado_lectura: {
        type: DataTypes.BOOLEAN,
        allowNull: false  // Se establece false de default para mensaje no leido
    },
    estado_mensaje: {
        type: DataTypes.BOOLEAN,
        allowNull: true  // Se establece true de default para estar activo
    },
}, {
    timestamps: false // Desactiva las columnas createdAt y updatedAt
});

tbl_mensajes.associate = (models) => {
    tbl_mensajes.belongsTo(models.tbl_usuarios, {
        foreignKey: {
            allowNull: false,
            name: 'id_usuario'
        },
    });
    return tbl_mensajes;
};
