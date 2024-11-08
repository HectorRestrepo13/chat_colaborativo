-- Eliminar base de datos si ya existe.
DROP DATABASE IF EXISTS DBChatColaborativo;

-- Crear la base de datos.
CREATE DATABASE DBChatColaborativo;

-- Usar la base de datos recién creada.
USE DBChatColaborativo;

-- Tabla roles para determinar el rol del usuario dentro del sistema.
CREATE TABLE roles (
    id_rol INT PRIMARY KEY AUTO_INCREMENT, 
    nombre_rol VARCHAR(20) NOT NULL UNIQUE
);

-- Tabla usuarios con los datos requeridos.
CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(80) NOT NULL,
    usuario_red VARCHAR(100) NOT NULL UNIQUE, 
    dominio VARCHAR(50), 
    foto_perfil VARCHAR(255),
    clave VARCHAR(255) NOT NULL, 
    estado_usuario BIT NOT NULL DEFAULT 1,  -- Estado del usuario (activo = 1, inactivo = 0).
    enviar_mensajes BIT NOT NULL DEFAULT 0,  -- Estado para saber si el usuario puede mandar mensajes al grupo (puede = 1, no puede = 0).
    contacto_directo BIT NOT NULL DEFAULT 0, -- Contacto directo (se le pueden enviar mensajes a este usuario = 1, no = 0).
    fecha_registro DATETIME,
    id_rol INT NOT NULL, 
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);

-- Tabla grupos con los datos requeridos.
CREATE TABLE grupos (
    id_grupo INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(55) NOT NULL,
    descripcion VARCHAR(105) NOT NULL,
    estado_grupo BIT NOT NULL DEFAULT 1, -- Estado del grupo (activo = 1, inactivo = 0).
    fecha_creacion DATETIME NOT NULL,
    fecha_actualizacion DATETIME
);

-- Tabla en donde se guardan los mensajes individuales 
-- Para posteriormente unirlos a los grupos o al chat directo.
CREATE TABLE mensajes (
    id_mensaje INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    contenido TEXT,
    tipo_contenido VARCHAR(45) NOT NULL,
    fecha_envio DATETIME NOT NULL,
    multimedia VARCHAR(255),
    estado_lectura BIT DEFAULT 0, -- 1 para leido, 0 para no leido
    estado_mensaje BIT DEFAULT 1, -- 1 para activo, 0 para eliminado
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Tabla para el mensaje grupal (es diferente al mensaje directo)
-- Es donde se unen los mensajes con los grupos.
CREATE TABLE mensajes_grupo (
    id_mensaje INT,
    id_grupo INT,
    PRIMARY KEY (id_mensaje, id_grupo),
    FOREIGN KEY (id_grupo) REFERENCES grupos(id_grupo),
    FOREIGN KEY (id_mensaje) REFERENCES mensajes(id_mensaje)
);

-- Tabla para el mensaje directo (es diferente al mensaje grupal)
-- Es donde se unen los mensajes con el receptor (usuario).
CREATE TABLE mensajes_directo (
    id_mensaje INT,
    id_receptor INT, -- Id del usuario que tiene el atributo de 'mensaje directo'.
    PRIMARY KEY (id_mensaje, id_receptor),
    FOREIGN KEY (id_mensaje) REFERENCES mensajes(id_mensaje),
    FOREIGN KEY (id_receptor) REFERENCES usuarios(id_usuario)
);

-- Tabla en donde se unen los los integrantes a los grupos.
CREATE TABLE integrantes_grupo (
    id_grupo INT,
    id_usuario INT,
    fecha_ingreso DATETIME NOT NULL,
    PRIMARY KEY (id_grupo, id_usuario),
    FOREIGN KEY (id_grupo) REFERENCES grupos(id_grupo),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Tabla en donde se muestra los mantenimientos que hace el usuario
-- Con rol administrador
CREATE TABLE historial_mantenimientos (
    id_mantenimiento INT PRIMARY KEY AUTO_INCREMENT, 
    id_usuario INT, 
    fecha_mantenimiento DATETIME NOT NULL,
    descripcion TEXT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);


