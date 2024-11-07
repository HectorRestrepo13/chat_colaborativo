

export const registrarUsuario = async (req, res) => {


    res.send({
        status: false,
        descripcion: "No se pudo Insertar los datos",
        datos: null,
        error: null,
        validaciones: null
    })
}