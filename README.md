# COWORKING PROJECT - Proyecto Final Hack a Boss
![](/front-end/src/assets/logos/COWORKproject.png)
## DESCRIPCION:

El proyecto aquí presentado despliega una web app donde publicar espacios de coworking, reservar y gestionar cada espacio.

Consta de una APP creada a partir de **ReactJS** para el frontEnd y una APIrest en **NodeJS** + Base de datos en **MySQL** que conforman el backend del proyecto.

Las características mínimas que el proyecto debe cumplir son las enumeradas debajo:

### Usuario Anónimo:

-   Visualizar la landing page

-   Búsqueda por:

    -   Nombre
    -   Localidad
    -   Tipo de espacio (puestos de trabajo, sala, auditorio…)
    -   Equipamiento necesario (mesas, sillas, proyector, pantalla…)
    -   Fechas

-   Acceder a la ficha del espacio donde se ve la descripción

-   Login

-   Registro (le llega email de registro)

    -   Email
    -   Nombre
    -   Bio
    -   Foto

### Usuario Registrado:

-   Gestión del perfil (cambio de datos)

-   Búsqueda por:

    -   Nombre

    -   Localidad

    -   Tipo de espacio (puestos de trabajo, sala, auditorio…)

    -   Equipamiento necesario (mesas, sillas, proyector, pantalla…)

    -   Fechas

-   Acceder a la ficha del espacio donde se ve la descripción

-   Reservar (llega email de confirmación)

-   **MI COWORKING**: panel de gestión de las reservas activas:

    -   Reporte de estado actual de cada espacio

        -   Limpio/pendiente limpieza

        -   Pagado/pendiente de pago (botón con opción de pago “fake”, simplemente el usuario recibe un email con el pago confirmado)

        -   Estado de las incidencias reportadas

    -   Reporte de incidencia sobre espacio:

        -   Categoría incidencia

        -   Descripción

    -   Rating del espacio

### Usuario Administrador:

-   La plataforma permitirá introducir la información y actualización necesaria sobre los espacios de coworking:

    -   Nombre

    -   Localidad

    -   Disponibilidad

    -   Fechas

    -   Tipo de espacio

    -   Estado:

        -   Limpio

        -   Pagado

    -   Gestión de incidencias.

## REQUISITOS

Para poder ejecutar correctamente la web app que contiene este repositorio (APP + API), necesitas lo siguientes programas:

-   MySQL
-   Node
-   Npm ó yarn
-   Git

A su vez es recomendable tengas cuentas creadas en los siguientes servicios, para un funcionamiento completo del proyecto:

-   Google
-   Sengrid

## INSTALACION

1.  Clona el repositorio completo en tu ordenador local.

    Mediante SSH

        git@github.com:rzarroca/coworking_HAB.git

    Mediante HTTP

        https://github.com/rzarroca/coworking_HAB.git

2.  Ve a la carpeta back-end e instala las dependencias del proyecto las dependencias del proyecto:

            npm install

3.  Ve a la carpeta front-end y repita el proceso de instalacion de dependencias para esta parte:

    **Nota:** _Las 2 partes del proyecto funcionan con dependencias diferentes y de manera independiente una de la otra. Debes instalar las dependencias necesarias en cada proyecto._

4.  Crea una nueva Base de Datos con tu usuario de MySQL con el nombre que desees.

5.  Configura los **_.env_** de la APP y la API respectivamente.

    -   **Backend**:

        -   Debes tener **MySQL** instalado para poder completar con tus datos de usuario y la información de la DB creada.

        -   Elije el **SERVER_HOST** y **SERVER_PORT** que desees. Ten cuidado con elegir como puerto 3000 o 5000 ya que esos valores los toma por defecto React.

        -   Setea el **FRONT_ORIGIN** para no tener problemas de CORS (debe ser el que genere la APP de front)

        -   Puedes cambiar los valores por defecto que hemos dejado en el .env a tu comodidad.

        -   Completa tu información de usuario de SENGRID (en caso de no tenerlo [Crea un Usuario Sengrid aquí](https://sendgrid.com/))

    -   **Frontend**:

        -   Elije el **REACT_APP_API_LOCAL_SERVER_HOST** y **REACT_APP_API_LOCAL_SERVER_PORT** que hayas elegido para tu API.

        -   Te recomendamos no cambiar el valor de **REACT_APP_MIN_WIDTH_FULL_VIEW_MAIN_SECTION** ya este es el valor que reconfigura la visualización de movil a portatil y al modificarlo puede que ciertos elementos no queden bien alineados.

        -   Completa tu **API KEY de Google** (en caso de no tenerlo infórmate en el siguiente enlace: [Using API Keys](https://developers.google.com/maps/documentation/javascript/get-api-key))

## USO

Si quieres probar las funcionalidades de este proyecto, hemos dejado un poblador incluido para facilitar tus tests :bowtie:.

1.  Levanta el servidor backend. Dentro de su carpeta ejecuta:

        npm run dev

2.  Haz una petición **HTTP GET** para resetear la base de datos a:

        http://[SERVER_HOST]:[SERVER_PORT]/api/reset/

    Esto borrará los datos del servidor.

Puedes utilizar el navegador o bien algún programa como [Postman](https://www.postman.com/)

3.  Haz una petición **HTTP POST** para poblar la base de datos a:

        http://[SERVER_HOST]:[SERVER_PORT]/api/reset/

    Esto repoblará la base de datos.

    _**NOTA**: En la carpeta static del backend verás que hemos dejado varias imágenes precargadas, para que al poblar la base de datos los espacios y centros tengan alguna imagen que mostrar._

    Puedes utilizar el navegador o bien algún programa como [Postman](https://www.postman.com/)

4.  Levanta la APP frontend. Dentro de su carpeta ejecuta:

        npm start

    Listo! A testear!

5.  Si quieres puede probar la APP frontend en modo de producción. Para ello ejecuta:

        npm run build

    Y luego

        npx serve

    Eso es todo!

_NOTA:_ Los pasos 2 y 3 sólo tienes que hacerlo al comenzar a usar el proyecto o cuando desees reiniciar la base de datos para testear de otra forma

## CREDITOS

Este desarrollo fue realizado para ser presentada como proyecto final en el bootcamp fullstack web development realizado con Hack a Boss.
Los responsables de este proyecto son:

-   **@j-coast** - [**Daniel Martinez**](www.linkedin.com/in/danielmartinezgonzalez-developer)

-   **@rzarroca** - [**Ricardo Zarroca**](www.linkedin.com/in/rzarroca)

## **_Recuerda entrar a las páginas de documentación del frontend y backend respectivamente para conocer mejor las funcionalidades de cada helper / middleware / hook / etc..._**

-   [Documentación FrontEnd](./front-end/README.md)
-   [Documentación BackEnd](./back-end/README.md)
