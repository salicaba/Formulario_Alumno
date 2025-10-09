# Proyecto de Gestión de Estudiantes

Este es un proyecto Full-Stack que consiste en un frontend con React y un backend con Node.js/Express conectado a una base de datos MySQL.

## Prerrequisitos

Asegúrate de tener instalado lo siguiente en tu sistema:
- Node.js (versión 16 o superior)
- MySQL

## Instrucciones de Instalación

Sigue estos pasos para levantar el proyecto en tu máquina local.

### 1. Clonar el Repositorio
```bash
git clone [URL_DE_TU_REPOSITORIO_EN_GITHUB]
cd [NOMBRE_DE_LA_CARPETA_DEL_PROYECTO]

### 2. Configurar la Base de Datos
- Accede a MySQL y crea la base de datos y la tabla.
- Necesitarás crear la base de datos `gestion_estudiantes` y la tabla `estudiantes`.

### 2. Configurar la Base de Datos
Accede a tu consola de MySQL y ejecuta los siguientes comandos:

```sql
CREATE DATABASE gestion_estudiantes;
USE gestion_estudiantes;
CREATE TABLE estudiantes (
    documento VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL
);
