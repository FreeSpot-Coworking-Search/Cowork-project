# coworking_HAB

## HELPERS

### dbHelpers


-   **getConnection** - Conecta con la base de datos.
-   **insertRegistration** - Ejecuta una sentencia SQL de busqueda sencilla.
        Recibe ( nombre de la tabla en formato string , objectSearch objeto con las propiedades que han de ser iguales )
-   **getRegistrations** - Ejecuta una sentencia SQL de inserción sencilla.
        Recibe ( nombre de la tabla en formato string , objectUpdate objeto con las propiedades a insertar )
-   **updateRegistration** - Ejecuta una sentencia SQL de modificacion sencilla.
        Recibe ( nombre de la tabla en formato string , id del registo a modificar, objectUpdate objeto con las propiedades a modificar ) 


-   **createSelectAllWhereQuerry** - Crea una sentencia SQL de busqueda sencilla.
        Recibe ( nombre de la tabla en formato string , objectSearch objeto con las propiedades que han de ser iguales )
-   **createInsertQuerry** - Crea una sentencia SQL de inserción sencilla.
        Recibe ( nombre de la tabla en formato string , objectUpdate objeto con las propiedades a insertar )
-   **createUpdateQuerry** - Crea una sentencia SQL de modificacion sencilla.
        Recibe ( nombre de la tabla en formato string , id del registo a modificar, objectUpdate objeto con las propiedades a modificar ) 

## ENDPOINTS

### Login

-   POST - [api/users/login] - Logea a un usuario retornando un token. ✅

### Users

-   GET - [api/users/] - Retorna información de un usuario concreto. ✅
-   POST - [api/users] - Crea un usuario.✅
-   PUT - [api/users/] - Edita un usuario. ✅
-   DELETE - [api/users/] - Borra un usuario. ✅

##### -    Middlewares:
        - userExists - Comprueba la existencia de un usuario. ✅
        - userIsLogin - Comprueba si el usuario tiene token valido. ✅
        - userIsOwner - Comprueba si el usuario accede a sus datos propios. ✅

### Spaces

-   GET - [api/users/] - Retorna información de un espacio concreto. ✅
-   POST - [api/users] - Crea un espacio.✅
-   PUT - [api/users/] - Edita un espacio. ✅
-   DELETE - [api/users/] - Borra un espacio. ✅

##### -   Middlewares:
        - spaceExists - Comprueba la existencia de un usuario. ✅
        