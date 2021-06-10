# coworking_HAB
Hack a Boss Final Project




# ENDPOINTS

## Application

```
{
    id,
    title,
    description
    idUser,
}
```

-   **GET** - [/stories] - Obtener la lista de relatos. ✅
-   **GET** - [/stories/:idStory] - Obtener la info de un relato concreto. ✅
-   **POST** - [/stories] - Insertar un nuevo relato. ✅
-   **PUT** - [/stories/:idStory] - Editar un relato. ✅
-   **DELETE** - [/stories/:idStory] - Eliminar un relato. ✅

## Users

```
{
    id,
    email,
    password,
    deleted
}
```

-   **GET** - [/users/:idUser] - Obtener info de un usuario.
-   **POST** - [/users] - Crear un usuario.
-   **POST** - [/users/login] - Login de usuario.
-   **PUT** - [/users/:idUser] - Editar datos de usuario.
-   **PUT** - [/users/:idUser/password] - Editar contraseña.
-   **DELETE** - [/users/:idUser] - Desactivar usuario.
