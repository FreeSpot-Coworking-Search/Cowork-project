##LANDING PAGE## LO VEMOS EN UN RATITO

INFORMACION QUE RECIBE

-   10 centros con mejor puntuacion:
    -imagen del centro
    -puntuacion
    -precio
    -nombre
-   Las últimas 3 o 4 entradas al blog:
    Título
    Resumen
-   Las 2 imágenes de portada y el logo.

INFOMACION QUE ENVÍA --> GET - localizacion - tipo - fechas de reserva

Objeto con informacion o querystring??
Objeto de consulta condicional

##ADMINISTRADOR ESPACIO## DANI

INFORMACION QUE RECIBE (espacio previamente creado) --> GET

-   TODOS LOS DATOS DEL USUARIO
-   ESTADO DE LIMPIEZA
-   INCIDENCIAS DE ESE ESPACIO Y USUARIO
-   FECHAS DE RESERVA DE ESE ESPACIO Y USUARIO

espacio no creado --> POST

-   TODOS LOS DATOS DEL USUARIO

espacio creado --> PUT

-   DATOS A MODIFICAR

##ADMINISTRADOR CENTRO##

INFORMACION QUE RECIBE (centro previamente creado) --> GET

-   TODOS LOS DATOS DEL USUARIO
-   PUNTUACION MEDIA
-   FOTOS
-   ESPACIOS DE ESE CENTRO
-   INCIDENCIAS DE LOS ESPACIOS DE DICHO CENTRO
-   ESTADO DE LIMPIEZA DE LOS ESPACIOS DE DICHO CENTRO

centro no creado --> POST

-   TODOS LOS DATOS DEL USUARIO

centro creado --> PUT

-   DATOS A MODIFICAR

##PERFIL USUARIO## DANI

INFORMACION QUE RECIBE (centro previamente creado) --> GET

-   TODOS LOS DATOS DEL USUARIO
-   RESERVAS E INCIDENCIAS DE ESTA
-   FECHAS DE RESERVA
-   ESTADO DE RESERVA Y PAGO
-   ESTADO DE LIMPIEZA

centro no creado --> POST

-   TODOS LOS DATOS DEL USUARIO

centro creado --> PUT

-   DATOS A MODIFICAR

##PERFIL ADMINISTRADOR## RICHARD

INFORMACION QUE RECIBE (centro previamente creado) --> GET

-   TODOS LOS DATOS DEL USUARIO
-   INFORMACION DE CENTROS (LIMPIEZA, CALENDARIO, PUNTUACION, INCIDENCIAS SI EXISTEN)

centro no creado --> POST

-   TODOS LOS DATOS DEL ADMINSITRADOR

centro creado --> PUT

-   DATOS A MODIFICAR
