import { DataTypes } from "sequelize";

import sequelize from "./conexion.js";

export const tbl_usuarios = sequelize.define('Usuarios', {
    idUsuarios: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_completo: {
        type: DataTypes.STRING(85),
        allowNull: false
    },
    dominio: {
        type: DataTypes.STRING(105),
        allowNull: false
    },
    foto_perfil: {
        type: DataTypes.STRING(155),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING(35),
        allowNull: false,
        defaultValue: "Activo"
    },
    usuario: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false
    },


}, {
    timestamps: false // Desactiva las columnas createdAt y updatedAt
}
)



tbl_usuarios.associate = (models) => {


    tbl_usuarios.belongsTo(models.tbl_Rol, {
        foreignKey: {
            allowNull: false,
        },
    });


    return tbl_usuarios;
};
