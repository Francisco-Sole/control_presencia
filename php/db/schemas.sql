CREATE DATABASE IF NOT EXISTS bdpresencia
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;

USE bdpresencia;

-- =========================================================
-- Esquema del sistema de control de presencia
-- =========================================================

-- 1. Tabla TARJETA
CREATE TABLE tarjeta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    activo TINYINT(1) DEFAULT 1,
    observaciones TEXT DEFAULT NULL
);

-- 2. Tabla HORARIO
CREATE TABLE horario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL
);

-- 3. Tabla ACTIVIDAD
CREATE TABLE actividad (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    activo TINYINT(1) DEFAULT 1,
    absentismo TINYINT(1) DEFAULT 0
);

-- 4. Tabla USUARIO
CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido1 VARCHAR(100) NOT NULL,
    apellido2 VARCHAR(100) DEFAULT NULL,
    dni VARCHAR(20) UNIQUE NOT NULL,
    foto VARCHAR(255) DEFAULT NULL,
    id_tarjeta INT DEFAULT NULL,
    id_horario INT DEFAULT NULL,
    activo TINYINT(1) DEFAULT 1,
    jornada_iniciada TINYINT(1) DEFAULT 0,
    FOREIGN KEY (id_tarjeta) REFERENCES tarjeta(id),
    FOREIGN KEY (id_horario) REFERENCES horario(id)
);

-- 5. Tabla REGISTRO
CREATE TABLE registro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_actividad INT NOT NULL,
    fecha_de_registro DATE NOT NULL,
    hora TIME NOT NULL,
    tipo ENUM('inicio','fin','manual','otro') NOT NULL DEFAULT 'inicio',
    FOREIGN KEY (id_usuario) REFERENCES usuario(id),
    FOREIGN KEY (id_actividad) REFERENCES actividad(id)
);


-- ============================================
-- Datos de ejemplo para bdpresencia
-- ============================================

-- 1. TARJETAS
INSERT INTO tarjeta (codigo, activo, observaciones) VALUES
('T001', 1, 'Tarjeta asignada a Ana Pérez'),
('T002', 1, 'Tarjeta asignada a Carlos García'),
('T003', 1, 'Tarjeta asignada a Marta Sánchez');

-- 2. HORARIOS
INSERT INTO horario (nombre, hora_inicio, hora_fin) VALUES
('Mañana', '08:00:00', '15:00:00'),
('Tarde', '15:00:00', '22:00:00'),
('Noche', '22:00:00', '06:00:00');

-- 3. ACTIVIDADES
INSERT INTO actividad (nombre, codigo, activo, absentismo) VALUES
('Jornada laboral', 'JORN', 1, 0),
('Vacaciones', 'VAC', 1, 1),
('Baja médica', 'BAJ', 1, 1),
('Permiso', 'PERM', 1, 1);

-- 4. USUARIOS
INSERT INTO usuario (nombre, apellido1, apellido2, dni, foto, id_tarjeta, id_horario, activo, jornada_iniciada) VALUES
('Ana', 'Pérez', 'López', '12345678A', 'ana.jpg', 1, 1, 1, 0),
('Carlos', 'García', 'Torres', '87654321B', 'carlos.png', 2, 2, 1, 0),
('Marta', 'Sánchez', 'Ruiz', '11223344C', 'marta.jpeg', 3, 3, 1, 0);

-- 5. REGISTROS (ejemplo de fichajes)
INSERT INTO registro (id_usuario, id_actividad, fecha_de_registro, hora, tipo) VALUES
(1, 1, '2025-09-29', '08:01:00', 'inicio'),
(1, 1, '2025-09-29', '15:02:00', 'fin'),
(2, 1, '2025-09-29', '15:05:00', 'inicio'),
(2, 1, '2025-09-29', '22:01:00', 'fin'),
(3, 1, '2025-09-29', '22:10:00', 'inicio');
