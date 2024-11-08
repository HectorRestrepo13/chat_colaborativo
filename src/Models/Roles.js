import { DataTypes } from "sequelize";

import sequelize from "./conexion.js";

export const tbl_rol = sequelize.define('roles', {
    id_rol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true, // Define id_rol como llave primaria
        autoIncrement: true // Establece el campo como autoincrementable
    },
    nombre_rol: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
}, {
    timestamps: false // Desactiva las columnas createdAt y updatedAt
}
)

// Hook para agregar datos iniciales después de sincronizar
tbl_rol.afterSync(async () => {
    const tbl_RolsIniciales = [
        { nombre_rol: "ADMIN" },
        { nombre_rol: "USUARIO" },
    ];

    //findOrCreate: Intenta encontrar una fila con la descripción especificada. Si no la encuentra, la crea.

    for (const cat of tbl_RolsIniciales) {
        await tbl_rol.findOrCreate({ where: { nombre_rol: cat.nombre_rol } });
    }
});

tbl_rol.associate = (models) => {
    tbl_rol.hasMany(models.tbl_usuarios, {
        foreignKey: 'id_rol', // El nombre de la clave foránea
    });
    return tbl_rol;
};

