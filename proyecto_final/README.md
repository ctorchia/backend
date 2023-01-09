## Entrega Final - Backend (E-Commerce con nodeJs):

API RESTful desarrollada con NodeJS y ExpressJS.

Las funcionalidades principales son:

1. Login: Registro de usuario e Inicio de sesión mediante PassportJS (Local Strategy)
2. ABM de productos, carritos y ordenes de compra.
3. Agregado de productos al carrito.
4. Generación de orden de compra.
5. Envio de alertas por email a una casilla configurable en archivo .env
6. Capa de persistencia de datos implementada con Factory que permite cambiar de tecnologia desde la variable entorno.
     - mongoDB (Mongo Atlas)
     - fileSystem
7. Canal de chat basado en websockets.
8. Opcion de visualizacion de la info del sistema.

# 1. Puesta en marcha

## A. Instalación del proyecto y dependencias

- Clonar el repositorio

- Instalar las dependencias según fichero package.json.
  
  ```npm install```

## B. Ejecución en localhost
  - En el fichero ".env" se pueden setear las siguientes variables:
   * Tecnología de Persistencia
   * Entorno de ejecucion (DEVELOPMENT o PRODUCTION)
   * Puerto
   * Modo de ejecucion (FORK o CLUSTER)
   * Tiempo de duracion de sesion en Minutos
   * Mail del administrador
   * Informacion de conexion a Base de Datos

  - El host por defecto será:   ```localhost:8080/```

# 2. Tecnologías y librerías utilizadas

  - NodeJS 18.7.xx
  - NPM 8.19.xx
  - Express 4.18.xx
  - Express-handlebars: 6.0.xx
  - Express-session: 1.17.xx
  - Mongoose: 6.7.xx
  - Firebase-admin: 11.2.xx
  - Connect-mongo: 4.6.0
  - Cookie-parser: 1.4.6
  - Bcrypt: 5.1.xx
  - Dotenv: 16.0.xx
  - Log4js: 6.7.xx
  - Nodemailer: 6.8.xx
  - Passport: 0.6.xx
  - Passport-local: 1.0.xx
  - Twilio: 3.83.xx

# 3. Endpoints

## A. Login:
  - **POST de registro de usuario:**
    ```localhost:8080/signup```
  
  - **GET de inicio de sesión de usuario:**
    ```localhost:8080/login```
  
  - **GET de cierre de sesión de usuario:**
    ```localhost:8080/logout```

## B. Productos:
  - **GET de todos los productos:** 
    ```localhost:8080/productos```

  - **GET de producto por id:**
    ```localhost:8080/productos/:id```

  - **GET de filtrado de productos por Categoria:**
    ```localhost:8080/productos/categoria/:categoria```  

  - **POST de producto:**
    ```localhost:8080/productos/```

  - **PUT de producto:**
    ```localhost:8080/productos/:id```

  - **DELETE de producto:**
    ```localhost:8080/productos/:id```

## C. Carritos:

  - **GET de todos los productos en carrito por id:** 
    ```localhost:8080/carrito/:id/productos```

  - **POST de creación de carrito vacío con id de cliente:** 
    ```localhost:8080/carrito/```

  - **POST de producto con id en carrito por id del mismo:** 
    ```localhost:8080/carrito/:id/productos```

  - **DELETE de carrito por id:** 
    ```localhost:8080/carrito/:id```

  - **DELETE de producto con id en carrito y de producto:** 
    ```localhost:8080/carrito/:idCarrito/productos/:idProducto```

## D. Ordenes:
  - **GET de todas las ordenes:** 
    ```localhost:8080/ordenes/```

  - **GET de orden por id:** 
    ```localhost:8080/ordenes/:id```

  - **POST de creación de orden:** 
    ```localhost:8080/ordenes/```

  - **PUT de orden:** 
    ```localhost:8080/ordenes/:id```

  - **DELETE de orden por id:** 
    ```localhost:8080/ordenes/:id```

## INFO:
- El archivo .REST tiene configuradas rutas de prueba para los endpoint.