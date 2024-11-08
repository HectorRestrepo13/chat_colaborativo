import { DataTypes } from "sequelize";
import sequelize from "./conexion.js";

export const tbl_grupos = sequelize.define('grupos', {
    id_grupo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(55),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(105),
        allowNull: false
    },
    estado_grupo: {
        type: DataTypes.BOOLEAN,
        allowNull: true  // Se establece true de default para estar activo
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_actualizacion: {
        type: DataTypes.DATE,
        allowNull: true
    },
}, {
    timestamps: false // Desactiva las columnas createdAt y updatedAt
});

