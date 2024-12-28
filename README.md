# Planifica Tu Ocio - Sistema de Gestión de Eventos y Reservas
## Descripción
Este proyecto es una aplicación de gestión de eventos y reservas desarrollada con Node.js y Express. Permite a los usuarios registrarse, iniciar sesión, explorar eventos, ver detalles, y realizar reservas para diferentes tipos de eventos. La aplicación simula una base de datos local para gestionar usuarios y eventos.

## Requisitos
- Node.js instalado.
- Gestor de paquetes npm o yarn.
## Instalación

### 1. Clona el repositorio:
    git clone https://github.com/1805Luis/AGR_frontend.git
    cd planifica-tu-ocio  
### 2. Instala las dependencias:
    npm install  
### 3.Configura tu base de datos simulado o cualquier otro servicio de base de datos necesario (opcional).
### 4.Inicia el servidor:
    npm start  

## Estructura del Proyecto

- planifica-tu-ocio/  
    - /public                # Carpeta para recursos estáticos como CSS, imágenes, etc.  
    - /views                 # Plantillas EJS para renderización de vistas  
    - /routes                # Rutas de la aplicación  
    - /models                # Estructura de datos y simulación de usuarios y eventos  
    - /controllers           # Controladores para manejar lógica de negocios  
    - app.js                 # Archivo principal de la aplicación  
    - package.json           # Archivo de configuración del proyecto y dependencias  

## Funcionalidades
### 1. Login y Registro:
    - Los usuarios pueden registrarse proporcionando un DNI y contraseña.
    - Autenticación para verificar las credenciales.

### 2.Vista del Menú Principal:
    - Muestra una lista de eventos disponibles.
    - Permite a los usuarios seleccionar y ver detalles de los eventos.

### 3.Reserva de Asientos:
    - Los usuarios pueden seleccionar categorías de asiento y realizar reservas.
    - La cantidad de asientos se actualiza según la disponibilidad.

### 4.Perfil de Usuario:

    - Permite a los usuarios actualizar su perfil con nuevos datos de nombre o contraseña.
### 5.Simulación de Base de Datos:
- El proyecto tiene la opcion de conectarse a una base de datos o simularla con un array de usuarios y eventos para manejar la persistencia de datos local.

## Uso
    - Visita la aplicación en tu navegador accediendo a http://localhost:3000/.
    - Sigue los pasos de autenticación para entrar en el sistema.
    - Explora los eventos y realiza reservas según tus necesidades.
## Contribuciones
Si deseas contribuir a este proyecto:
    - Haz un fork del repositorio.
    - Crea una rama nueva.
    - Haz los cambios necesarios y envía un pull request.
## Licencia
Este proyecto está licenciado bajo la MIT License.
