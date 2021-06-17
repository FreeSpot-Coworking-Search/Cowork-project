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

### Users
-   **POST - [api/users/login]** - Logea a un usuario retornando un token. 
        **Requiere:** ✅
-   **GET - [api/users/] -** Retorna información de un usuario concreto y listado de sus fotos.
        **Requiere:** userIsLogin / userExist / userIsOwner ✅
-   **POST - [api/users] -** Crea un usuario.
        **Requiere:** ✅
-   **PUT - [api/users/] -** Edita un usuario.
        **Requiere:** userIsLogin/userExist/userIsOwner ✅
-   **DELETE - [api/users/] -** Borra un usuario.
        **Requiere:** userIsLogin /userExist / userIsOwner ✅

-   **POST - [api/users/photo/]** - Cambia la foto usuario.
        **Requiere:** userIsLogin / userExist / userIsOwner ✅

####     Middlewares:
        - userExists - Comprueba la existencia de un usuario. ✅
        - userIsLogin - Comprueba si el usuario tiene token valido. ✅
        - userIsOwner - Comprueba si el usuario accede a sus datos propios. ✅

### Spaces

-   **GET - [api/users/] -** Retorna información de un espacio concreto.✅
        **Requiere:** spaceExists ✅
-   **POST - [api/users] -** Crea un espacio.✅
        **Requiere:** adminIsLogin  ❌
-   **PUT - [api/users/] -** Edita un espacio. ✅
        **Requiere:** spaceExists / adminIsLogin / adminIsOwner ❌
-   **DELETE - [api/users/] -** Borra un espacio. ✅
        **Requiere:** spaceExists ✅

####    Middlewares:
        - adminIsLogin - Comprueba que se trate de un administrador logueado. ❌
        - adminIsOwner - Comprueba que el administrador sea propietario. ❌
        - spaceExists - Comprueba la existencia del espacio. ✅
        

