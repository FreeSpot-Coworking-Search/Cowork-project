# Coworking Project - Backend

## Descripcion:

Esta sección contiene el backend del proyecto, el cual consta de dos partes:

-   _Base de datos tipo relacional_, utilizando el gestor **MySQL**.
-   _RestAPI_ que comunica las peticiones de los clientes y les proporciona una respuesta. Para su ejecución se ha utilizado **Node.js** y **Express.js**.

## Tabla de contenidos

1. [HELPERS](#helpers)

    1. [dbHelpers](#dbHelpers)
    2. [dateHelpers](#dateHelpers)
    3. [mailHelpers](#mailHelpers)
    4. [photoHelpers](#photoHelpers)
    5. [schemaHelpers](#schemaHelpers)

2. [MIDDLEWARES](#middlewares)

    1. [Users](#middlewares-users)
    2. [Admins](#middlewares-admins)
    3. [Spaces](#middlewares-spaces)
    4. [Centers](#middlewares-centers)
    5. [Reserves](#middlewares-reserves)

3. [ENDPOINTS](#endpoints)

    1. [Users](#endpoints-users)
    2. [Admins](#endpoints-admins)
    3. [Spaces](#endpoints-spaces)
    4. [Centers](#endpoints-centers)
    5. [Reserves](#endpoints-reserves)
    6. [Incidences](#endpoints-incidences)
    7. [Search](#endpoints-search)
    8. [Photos](#endpoints-photos)
    9. [MyCenter](#endpoints-mycenter)

4. [STATIC](#static)

    1. [Html](#static-html)
    2. [Uploads](#static-uploads)

## HELPERS <a name="helpers"></a>

### dbHelpers <a name="dbHelpers"></a>

1.  **getConnection** - Genera una nueva conexión activa con la base de datos. Esta función es utilizada como base en las siguientes funciones.

2.  **getRegistrations** - Ejecuta una sentencia SQL de búsqueda sencilla.

    Recibe:

    -   nombre de la tabla en formato string.
    -   Objeto con los pares nombre/valor de los datos a buscar.
    -   _Opcionalmente, se puede ejecutar una sentencia SQL (cualquier tipo) de manera directa, inyectándola como único parámetro de tipo string._

    Retorna:

    -   Objeto con los datos buscados.

3.  **insertRegistration** - Ejecuta una sentencia SQL de inserción sencilla.

    Recibe:

    -   Nombre de la tabla en formato string.
    -   Objeto con pares nombre/valor del registro a insertar.

4.  **updateRegistration** - Ejecuta una sentencia SQL de modificacion sencilla.

    Recibe:

    -   Nombre de la tabla en formato string.
    -   Id del registo a modificar.
    -   Objeto con los pares nombre/valor de los datos a modificar.

5.  **deleteRegistrations** - Ejecuta una sentencia SQL de borrado sencilla.

    Recibe:

    -   Nombre de la tabla en formato string
    -   Objeto con pares nombre/valor con condiciones a cumplir para seleccionar los elementos a borrar.

6.  **getSearchCenters** - Ejecuta una sentencia SQL de busqueda de centros.

    Recibe:

    -   Objeto con pares nombre/valor con condiciones a cumplir para filtrar los centros a buscar.

    Retorna:

    -   Objeto con los centros buscados.

7.  **getSearchSpaces** - Ejecuta una sentencia SQL de busqueda de espacios.

    Recibe:

    -   Objeto con pares nombre/valor con condiciones a cumplir para filtrar los espacios a buscar.

    Retorna:

    -   Objeto con los espacios buscados.

### dateHelpers <a name="dateHelpers"></a>

1. **formatDateToDB** - Devuelve una fecha en formato compatible con MySQL DateTime _'YYYY-MM-DD hh:mm:ss'_.

    Recibe:

    - Variable formato Date.

### mailHelpers <a name="mailHelpers"></a>

1. **sendMail** - Envía de forma asíncrona un mail con la información recibida, mediante la librería sengrid, al usuario requerido.

    Recibe:

    - Correo del destinatario.
    - Asunto del correo.
    - Mensaje a enviar.

### photoHelpers <a name="photoHelpers"></a>

1. **saveUserPhoto** - Guarda en el disco local la imagen enviada por el usuario, con un nombre generado aleatoriamente, para ser utilizada como su avatar.

    Recibe:

    - Imagen enviada por el usuario.

    Retorna:

    - Ruta donde se encuentra guardada la nueva imagen.

2. **saveAdminPhoto** - Guarda en el disco local la imagen enviada por un administrador, con un nombre generado aleatoriamente, para ser utilizada como su avatar.

    Recibe:

    - Imagen enviada por el usuario.

    Retorna:

    - Ruta donde se encuentra guardada la nueva imagen.

3. **saveSpacesCentersPhoto** - Guarda en el disco local la imagen enviada por un administrador, con un nombre generado aleatoriamente, para ser utilizada en sus espacios o centros.

    Recibe:

    - Imagen enviada por el usuario.

    Retorna:

    - Ruta donde se encuentra guardada la nueva imagen.

4. **removeUserPhoto** - Elimina la foto de avatar de un usuario.

    Recibe:

    - Ruta de la imagen a eliminar.

5. **removeAdminPhoto** - Elimina la foto de avatar de un administrador.

    Recibe:

    - Ruta de la imagen a eliminar.

6. **removeUserPhoto** - Elimina la foto de espacio o centro requerida por un administrador.

    Recibe:

    - Ruta de la imagen a eliminar.

### schemaHelpers <a name="schemaHelpers"></a>

1. **validation** - Valida que la informacion recibida se ajuste a las condiciones requeridas por los esquemas de validación.

    Recibe:

    - Esquema de validación (provenientes de la carpeta _[schemas]_ )
    - Objeto con pares nombre/valor que contienen la información a validar.

## MIDDLEWARES <a name="middlewares"></a>

### Users <a name="middlewares-users"></a>

-   **userIsLogin** - Comprueba si el usuario tiene token valido.
-   **userExists** - Comprueba la existencia de un usuario.
-   **userIsOwner** - Comprueba si el usuario accede a sus datos propios.

### Admins <a name="middlewares-admins"></a>

-   **adminIsLogged** - Comprueba si el administrador tiene token valido.
-   **adminExists** - Comprueba la existencia de un administrador.
-   **adminIsOwner** - Comprueba si el administrador accede a sus datos propios.
-   **whoIs** - Comprueba el usuario es de tipo administrador o usuario devolviendo la información contenida en el token.

### Spaces <a name="middlewares-spaces"></a>

-   **spaceExist** - Comprueba la existencia de un usuario.
-   **adminOwnsSpace** - Comprueba que el administrador sea el propietario del espacio.
-   **adminOwnsSpaceCenter** - Comprueba que el administrador sea el propietario del centro que desea modificar.

### Centers <a name="middlewares-centers"></a>

-   **entityExist** - Comprueba que el id requerido exista en la tabla buscada (centro, espacio, usuario, etc...)
-   **adminOwnsCenter** - Comprueba que el administrador sea el propietario del centro.

### Reserves <a name="middlewares-reserves"></a>

-   **userOwnsReserva** - Comprueba que el usuario sea propietario de la reserva.
-   **adminOwnsReserva** - Comprueba que el administrador sea propietario del espacio donde se realizó la reserva.

## ENDPOINTS <a name="endpoints"></a>

### Users <a name="endpoints-users"></a>

1.  **GET - _/api/users/_** - Envía información de un usuario concreto y su avatar.

    Middlewares requeridos:

    -   userIsLogin
    -   userExist
    -   userIsOwner

2.  **GET - _/api/users/validate_** - Finaliza el alta de un usuario que recibió el correo de validación al registrarse.

    Middlewares requeridos:

3.  **POST - _/api/users/_** - Crea un nuevo usuario y envía mail de confirmación.

    Middlewares requeridos:

4.  **POST - _/api/users/login_** - Logea a un usuario retornando un token.

    Middlewares requeridos:

5.  **POST - _/api/users/photo_** - Cambia la foto usuario.

    Middlewares requeridos:

    -   userIsLogin
    -   userExist

6.  **PUT - _/api/users/_** - Edita un usuario.

    Middlewares requeridos:

    -   userIsLogin
    -   userIsOwner
    -   userExist

7.  **DELETE - _/api/users/_** - Borra un usuario.

    Middlewares requeridos:

    -   userIsLogin
    -   userExist

### Admins <a name="endpoints-admins"></a>

1.  **GET - _/api/admins/_** - Envía información de un administrador concreto y su avatar.

    Middlewares requeridos:

    -   adminExists
    -   adminIsLogged
    -   adminIsOwner

2.  **GET - _/api/admins/validate_** - Finaliza el alta de un administrador que recibió el correo de validación al registrarse.

    Middlewares requeridos:

3.  **POST - _/api/admins/_** - Crea un nuevo administrador y envía mail de confirmación.

    Middlewares requeridos:

4.  **POST - _/api/admins/login_** - Logea a un administrador retornando un token.

    Middlewares requeridos:

5.  **POST - _/api/admins/photo_** - Cambia la foto de administrador.

    Middlewares requeridos:

    -   adminExists
    -   adminIsLogged
    -   adminIsOwner

6.  **PUT - _/api/admins/_** - Edita un administrador.

    Middlewares requeridos:

    -   adminExists
    -   adminIsLogged
    -   adminIsOwner

7.  **DELETE - _/api/admins/_** - Borra un administrador.

    Middlewares requeridos:

    -   adminExists
    -   adminIsLogged
    -   adminIsOwner

### Spaces <a name="endpoints-spaces"></a>

1.  **GET - _/api/spaces/_** - Envía información del espacio buscado.

    Middlewares requeridos:

    -   spaceExist
    -   whoIs

2.  **POST - _/api/spaces/_** - Crea un nuevo espacio en el centro asignado.

    Middlewares requeridos:

    -   adminIsLogged
    -   adminOwnsSpaceCenter

3.  **POST - _/api/spaces/photo_** - Sube una nueva foto al espacio requerido

    Middlewares requeridos:

    -   spaceExists
    -   adminIsLogged
    -   adminOwnsSpaceCenter

4.  **PUT - _/api/spaces/_** - Edita un espacio.

    Middlewares requeridos:

    -   spaceExists
    -   adminIsLogged
    -   adminOwnsSpace

5.  **DELETE - _/api/spaces/_** - Borra un espacio.

    Middlewares requeridos:

    -   spaceExists
    -   adminIsLogged
    -   adminOwnsSpace

### Centers <a name="endpoints-centers"></a>

1.  **GET - _/api/centers/_** - Envía información del centro buscado.

    Middlewares requeridos:

    -   whoIs
    -   entityExist

2.  **POST - _/api/centers/_** - Crea un nuevo centro para el administrador.

    Middlewares requeridos:

    -   adminIsLogged

3.  **POST - _/api/centers/photo_** - Sube una nueva foto al centro requerido

    Middlewares requeridos:

    -   entityExists
    -   adminIsLogged
    -   adminOwnsCenter

4.  **PUT - _/api/centers/_** - Edita un centro.

    Middlewares requeridos:

    -   entityExists
    -   adminIsLogged
    -   adminOwnsCenter

5.  **DELETE - _/api/centers/_** - Borra un centro.

    Middlewares requeridos:

    -   entityExists
    -   adminIsLogged
    -   adminOwnsCenter

### Reserves <a name="endpoints-reserves"></a>

1.  **GET - _/api/reserves/_** - Envía la información de la reserva solicitada.

    Middlewares requeridos:

    -   entityExists
    -   userIsLogin
    -   userOwnsReserve

2.  **GET - _/api/reserves/allreserves_** - Envía un resumen de todas las reservas de un usuario.

    Middlewares requeridos:

    -   userIsLogin

3.  **GET - _/api/reserves/payment_** - Envía un correo al usuario desde el cual puede abonar la reserva especificada.

    Middlewares requeridos:

    -   entityExists
    -   userIsLogin
    -   userOwnsReserve

4.  **GET - _/api/reserves/validate_** - Finaliza el abono de una reserva para el usuario que solicitó un correo de pago.

    Middlewares requeridos:

5.  **POST - _/api/reserves/_** - Crea una nueva reserva.

    Middlewares requeridos:

    -   userIsLogin

6.  **PUT - _/api/reserves/cleaning_** - Cambia el estado de limpieza del espacio solicitado

    Middlewares requeridos:

    -   entityExists
    -   userIsLogin,
    -   userOwnsReserve

7.  **PUT - _/api/reserves/rate_** - Puntúa la reserva especificada.

    Middlewares requeridos:

    -   entityExists
    -   userIsLogin,
    -   userOwnsReserve

### Incidences <a name="endpoints-incidences"></a>

1.  **GET - _/api/incidences/_** - Envía la información de la incidencia solicitada.

    Middlewares requeridos:

    -   entityExists
    -   userIsLogin
    -   userOwnsReserve

2.  **GET - _/api/incidences/allincidences_** - Envía un resumen de todas las incidencias de un usuario.

    Middlewares requeridos:

    -   userIsLogin

3.  **POST - _/api/incidences/_** - Crea una nueva incidencia.

    Middlewares requeridos:

    -   userIsLogin
    -   userOwnsReserve

4.  **PUT - _/api/incidences/_** - Modifica el estado de una incidencia creada por un usuario.

    Middlewares requeridos:

    -   entityExists,
    -   adminIsLogged,
    -   adminOwnsReserve,

### Search <a name="endpoints-search"></a>

1.  **GET - _/api/search/center_** - Envía la información de los centros que cumplen con los requisitos solicitados.

    Middlewares requeridos:

2.  **GET - _/api/search/space_** - Envía la información de los espacios que cumplen con los requisitos solicitados.

    Middlewares requeridos:

### Photos <a name="endpoints-photos"></a>

1.  **GET - _api/images/adminsPhotos_** - Retorna el avatar solicitado por el cliente tipo administrador.

    Middlewares requeridos:

2.  **GET - _api/images/usersPhotos_** - Retorna el avatar solicitado por el cliente tipo usuario.

    Middlewares requeridos:

3.  **GET - _api/images/spacesCentersPhotos_** - Retorna la imagen solicitada.

    Middlewares requeridos:

### MyCenter <a name="endpoints-mycenter"></a>

1.  **GET - _api/mycenter/_** - Retorna un resumen con la información de todos los centros de un administrador. Esto incluye reservas, incidencias y valoraciones.

    Middlewares requeridos:

## STATIC <a name="static"></a>

### Html <a name="static-html"></a>

1.  **validatedPayment** - Página estática a la que se redirige al usuario cuando ha realizado exitosamente el pago de su reserva.

2.  **validatedUser** - Página estática a la que se redirige tanto la usuario como al administrador cuando ha dado de alta su cuenta.

### Uploads <a name="static-uploads"></a>

1.  **adminsPhotos** - Espacio de la memoria donde se guardan las imágenes de los avatar de los administradores.

2.  **adminsPhotos** - Espacio de la memoria donde se guardan las imágenes de los avatar de los usuarios.

3.  **spaceCentersPhotos** - Espacio de la memoria donde se guardan las imágenes de los espacios y tambien los centros.
