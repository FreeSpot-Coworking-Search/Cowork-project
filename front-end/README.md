# coworking_HAB

## COMPONENTS

### Setting Components

Componentes que sirven para dar forma al proyecto.

-   **Layout** - En el se configura el responsive grid de la página completa y los componentes que tendrá cada sección.
    Componentes internos: BackGroundLeft, BackGroundRight, Header, LeftArticle, MainNavigation, RightArticle.
-   **Header** - En el se especifica la ubicación del header.
    Componentes internos: Logo, TopNavigation, Avatar.
-   **MainNavigation** - ❌
-   **LeftArticle** - ❌
-   **RightArticle** - ❌
-   **BackGroundLeft** - Componente que sirve para dar mejora visual a la página.
-   **BackGroundRight** - Componente que sirve para dar mejora visual a la página.

### Main Components

Componentes reutilizables dentro de la app.

-   **Avatar** - Componente que muestra informacion del usuario.
    Acciones principales: - Ejecutar login. - Ejecutar logout.

-   **Login** - Componente que permite realizar login de forma aislada.
    Acciones principales: - Ejecutar login. - Guardar informacion de usuario en local storage.

## PAGES

<!-- ### Users

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
    **Requiere:** userIsLogin / userExist / userIsOwner ✅ -->

## CUSTOM HOOKS

-   **useToLocalStorage** - Permite utilizar y modificar la información un objeto en localStorage, con el valor de "key" que definamos al instaciar el hook ✅
    **Uso:** - const [localObject, storageLocalObject] = useToLocalStorage(key). ✅

    **useClient** - Permite utilizar y modificar información del usuario logueado (idAuth, roll, tipo, authorization, avatarUrl, name). ✅
    **Uso:** - const [clientData, setClientData] = useClient() ✅

    ✅❌
