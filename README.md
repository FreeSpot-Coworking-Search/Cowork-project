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

-   **POST - [api/users/login/]** - Logea a un usuario retornando un token. ✅
    **Requiere:** ✅
-   **GET - [api/users/] -** Retorna información de un usuario concreto y su avatar.✅
    **Requiere:** userIsLogin / userExist / userIsOwner ✅
-   **POST - [api/users] -** Crea un usuario.✅
    **Requiere:** ✅
-   **PUT - [api/users/] -** Edita un usuario.✅
    **Requiere:** userIsLogin/userExist/userIsOwner ✅
-   **DELETE - [api/users/] -** Borra un usuario.✅
    **Requiere:** userIsLogin /userExist / userIsOwner ✅

-   **POST - [api/users/photo/]** - Cambia la foto usuario.✅
    **Requiere:** userIsLogin / userExist / userIsOwner ✅

#### Middlewares:

        - userExists - Comprueba la existencia de un usuario. ✅
        - userIsLogin - Comprueba si el usuario tiene token valido. ✅
        - userIsOwner - Comprueba si el usuario accede a sus datos propios. ✅

### Admins

-   **GET - [api/admins/] -** Retorna información de un administrador concreto y avatar.
    **Requiere:** adminExist / adminIsLogged / adminIsOwner ✅
-   **POST - [api/admins/] -** Crea un administrador.
    **Requiere:** ✅
-   **PUT - [api/admins/validate/] -** Activa un administrador recién creado.
    **Requiere:** ✅
-   **POST - [api/admins/login/]** - Logea a un administrador retornando un token.
    **Requiere:** ✅
-   **DELETE - [api/admins/] -** Borra un administrador.
    **Requiere:** adminExist / adminIsLogged / adminIsOwner ✅
-   **PUT - [api/admins/] -** Edita un administrador.
    **Requiere:** adminExist / adminIsLogged / adminIsOwner ✅
-   **POST - [api/admins/photo/]** - Cambia la foto administrador.
    **Requiere:** adminExist / adminIsLogged / adminIsOwner ✅

#### Middlewares:

        - adminExists - Comprueba la existencia de un administrador. ✅
        - adminIsLogged - Comprueba si el administrador tiene token valido. ✅
        - adminIsOwner - Comprueba si el administrador accede a sus datos propios. ✅

### Spaces

-   **GET - [api/spaces/] -** Retorna información de un espacio concreto, sus servicios e imagenes.✅
    **Requiere:** spaceExists ✅
-   **POST - [api/spaces] -** Crea un espacio.✅
    **Requiere:** adminIsLogged ❌
-   **PUT - [api/spaces/] -** Edita un espacio y sus servicios. ✅
    **Requiere:** spaceExists / adminIsLogged / adminIsOwner ❌
-   **DELETE - [api/spaces/] -** Borra un espacio. ✅
    **Requiere:** spaceExists / adminIsLogged / adminIsOwner ❌

-   **POST - [api/spaces/photo/]** - Añade una foto del espacio.✅
    **Requiere:** adminIsLogged / spaceExists / adminExist / adminIsOwner ❌
-   **DELETE - [api/spaces/photo/]** - Borra una foto del espacio.✅
    **Requiere:** adminIsLogged / photoExists / spaceExist / adminExist / adminIsOwner ❌

#### Middlewares:

        - adminIsLogged - Comprueba que se trate de un administrador logueado. ✅
        - adminIsOwner - Comprueba que el administrador sea propietario. ✅
        - spaceExists - Comprueba la existencia del espacio. ✅

### Centers

-   **GET - [api/centers/] -** Retorna información de un centro concreto y sus imagenes.❌
    **Requiere:** centerExists ❌
-   **POST - [api/centers] -** Crea un centro.❌
    **Requiere:** adminIsLogged ❌
-   **PUT - [api/centers/] -** Edita un centro. ❌
    **Requiere:** centerExists / adminIsLogged / adminIsOwner ❌
-   **DELETE - [api/centers/] -** Borra un centro. ❌
    **Requiere:** centerExists / adminIsLogged / adminIsOwner ❌

-   **POST - [api/centers/photo/]** - Añade una foto del centro.❌
    **Requiere:** adminIsLogged / centerExists / adminExist / adminIsOwner ❌
-   **DELETE - [api/centers/photo/]** - Borra una foto del centro.❌
    **Requiere:** adminIsLogged / photoExists / centerExist / adminExist / adminIsOwner ❌

#### Middlewares:

        - adminIsLogged - Comprueba que se trate de un administrador logueado. ✅
        - adminIsOwner - Comprueba que el administrador sea propietario. ✅
        - centerExists - Comprueba la existencia del espacio. ❌
