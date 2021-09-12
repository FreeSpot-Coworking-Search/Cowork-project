# Coworking Project - Frontend

## Descripcion:

Esta sección contiene el frontend del proyecto, donde se genera la interfaz de usuario del mismo. La misma es una _web APP_, de tipo _Single Page_, que puede ser utilizada tanto en dispositivos móviles como en ordenadores ya que fue diseñada con fundamentos responsive.

-   Para construir dicha interfaz se utilizó como base la librería **ReactJS** junto a **Axios** para hacer pedidos HTTP.

## Tabla de contenidos

1. [APP](#app)

    1. [Contextos](#app-contextos)
    2. [Layout](#app-layout)
    3. [Otros componentes de Layout](#app-otros)

2. [CSS](#css)

3. [PAGES](#pages)

4. [HELPERS](#helpers)

    1. [calendarHelper](#helpers-calendarHelper)
    2. [cleanSearchObject](#helpers-cleanSearchObject)
    3. [objectToQuerryParamsString](#helpers-objectToQuerryParamsString)
    4. [dateHelper](#helpers-dateHelper)
    5. [getData](#helpers-getData)
    6. [lastDayReservation](#helpers-lastDayReservation)
    7. [nextDay](#helpers-nextDay)
    8. [prevDay](#helpers-prevDay)
    9. [orderBy](#helpers-orderBy)
    10. [rangeDaysMonthReader](#helpers-rangeDaysMonthReader)
    11. [reservationHelper](#helpers-reservationHelper)
    12. [reservesHelper](#helpers-reservesHelper)
    13. [servicesHelper](#helpers-servicesHelper)
    14. [spaceOccupied](#helpers-spaceOccupied)
    15. [spaceTypeToPlural](#helpers-spaceTypeToPlural)
    16. [spaceTyping](#helpers-spaceTyping)

5. [CUSTOM HOOKS](#customHooks)

    1. [useFetch](#customHooks-useFetch)
    2. [useFullView](#customHooks-useFullView)
    3. [useDialog](#customHooks-useDialog)
    4. [useClient](#customHooks-useClient)
    5. [useCenter](#customHooks-useCenter)
    6. [useCenterSpaces](#customHooks-useCenterSpaces)
    7. [useMyCenter](#customHooks-useMyCenter)
    8. [useSearchCenter](#customHooks-useSearchCenter)
    9. [useSearchSpace](#customHooks-useSearchSpace)

## APP <a name="app"></a>

Componente principal de React. En conjunto con el componente Layout establece el marco de trabajo de la web APP, definiendo variables, fuentes, disposición de los diferentes elementos y otras características que son comunes a toda la APP.

### Contextos <a name="app-contextos"></a>

-   **ClientProvider** - Contexto que guarda la información del usuario/administrador, cuando este realiza el login, de manera que todas las páginas puedan acceder a esta información mediante el _customHook UseClient()_.

### Layout <a name="app-layout"></a>

-   Contiene los atributos de CSS globales, ellos serán utilizados de forma común por todas los componentes:

    1. Layout.css
    2. mainSection.css
    3. tooltip.css

-   Renderiza los componentes con las diferentes secciones que contiene la web APP:

    1.  **BackGroundLeft** - Componente para decoración borde izquierdo.
    2.  **BackGroundRight** - Componente para decoración borde derecho.
    3.  **Decoration** - Componente para decoración de arriba y abajo.
    4.  **Header** - Componente que renderiza el `<header>` de la web APP.
    5.  **Routes** - Componente que renderiza el `<main>` de la web APP.

### Otros componentes de Layout: <a name="app-otros"></a>

-   **BrowserRouter** - Componente necesario para el funcionamiento de las rutas que cargan las diferentes páginas.

-   **ErrorHeader** y **ErrorMain** - Componentes que renderizan una página de error en el caso de encontrarse un evento no esperado.

## CSS <a name="css"></a>

Carpeta donde se guardan las definiciones CSS utilizadas de manera global y/o común a muchos otros elementos de la APP.

-   Contiene:
    1.  **mainSection.css** - Se definen las clases CSS que irán poblando el esquema Grid definido en Layout, con sus variaciones tanto para formato movil como ordenador.
    2.  **variables.css** - Se definen las variables globales de colores y tamaño de fuentes.
    3.  **dialog.css** - Se definen los atributos CSS que tendrán los pop up que se rendericen en todas las páginas.
    4.  **tooltip.css** - Se defina de manera global el css para los textos de información.
    5.  **presentation.css** - Se definen estilos comunes a utilizar para todas los artículos que generan las diferentes rutas.
    6.  **notifications.css** - Se defina de manera global el css para las notificaciones.

## PAGES <a name="pages"></a>

Páginas que renderiza el componente `<Routes />` dependiendo de la URL en la que se encuentre el usuario.

Estas páginas pueden ser de tipo privadas cuando se la designa con el atributo `typeRequired: 'administrador'` o bien `typeRequired: 'usuario'`. De ser así, el componente antes comprueba que el tipo de cliente coincida con el requerimiento y de no ser así lo redirige a la página de inicio `/`.

## HELPERS <a name="helpers"></a>

### calendarHelper <a name="helpers-calendarHelper"></a>

-   **thisWeek** - Devuelve los días de la semana indicada.

    Recibe:

    -   Dia actual en formato date.

    Retorna:

    -   Array conteniendo los valores numéricos de la semana indicada.

-   **addDate** - Devuelve una fecha futura, a partir del día indicado.

    Recibe:

    -   Fecha de inicio en formato Date.
    -   Número de días a adelantar en formato Number

    Retorna:

    -   Valor numérico del día buscado.

-   **nextWeek** - Devuelve el primer día de la semana siguiente, a partir de la semana indicada.

    Recibe:

-   Array conteniendo los valores numéricos de la semana indicada.

    Retorna:

-   Array conteniendo los valores numéricos de la semana siguiente.

-   **prevWeek** - Devuelve el día del mes de la semana anterior al valor insertado.

Recibe:

-   Array conteniendo los valores numéricos de la semana indicada.

    Retorna:

-   Array conteniendo los valores numéricos de la semana anterior.

### cleanSearchObject <a name="helpers-cleanSearchObject"></a>

-   **cleanSearchObject** - Limpia los valores vaciós del objeto de busqueda

    Recibe:

    -   Objeto con los pares nombre/valor que se generan al realizar una búsqueda de centros o espacios.

    Retorna:

    -   Objeto de búsqueda con los pares vacíos eliminados.

### objectToQuerryParamsString <a name="helpers-objectToQuerryParamsString"></a>

-   **objectToQuerryParamsString** - Transforma los objetos indicados en query params, sumándolos a la ruta base

    Recibe:

    -   Ruta base en formato string.
    -   Objetos con los pares nombre/valor a convertir en query params.

    Retorna:

    -   String con ruta base y query params sumados

### dateHelper <a name="helpers-dateHelper"></a>

-   **toFormDate** - Cambia el formato de una fecha para que sea compatible con los formularios

    Recibe:

    -   Fecha en formato Date.

    Retorna:

    -   Fecha en formato String compatible con formularios 'yyyy-MM-dd'.

-   **isBetween** - Revisa el día en curso se encuentre entre las 2 fechas indicadas.

    Recibe:

    -   Fecha inicial.
    -   Fecha final.

    Retorna:

    -   Booleano confirmando/negando la condición.

-   **isPrevious** - Revisa que la fecha indicada sea previa al día en curso.

    Recibe:

    -   Fecha indicada.

    Retorna:

    -   Booleano confirmando/negando la condición.

-   **isFuture** - Revisa que la fecha indicada sea futura al día en curso.

    Recibe:

    -   Fecha indicada.

    Retorna:

    -   Booleano confirmando/negando la condición.

### getData <a name="helpers-getData"></a>

-   Función que realiza una peticion HTTP GET al endPoint solicitado.

    Recibe:

    -   Endpoint con la ruta relativa en formato String.
    -   Objeto con los pares nombre/valor que se desean bucar.

    Retorna:

    -   Información de respuesta del servidor.

### lastDayReservation <a name="helpers-lastDayReservation"></a>

-   Revisa que la fecha indicada coincida con alguna fecha de fin de las reservas de un espacio.

    Recibe:

    -   Objeto con la información del espacio, incluyendo sus reservas.
    -   Fecha que se quiere revisar.

    Retorna:

    -   Booleano confirmando/negando la condición.

### nextDay <a name="helpers-nextDay"></a>

-   Suma un día a la fecha indicada

    Recibe:

    -   Fecha indicada.

    Retorna:

    -   Fecha un día mayor en formato Date.

### prevDay <a name="helpers-prevDay"></a>

-   Resta un día a la fecha indicada

    Recibe:

    -   Fecha indicada.

    Retorna:

    -   Fecha un día menor en formato Date.

### orderBy <a name="helpers-orderBy"></a>

_En desarrollo_

### rangeDaysMonthReader <a name="helpers-rangeDaysMonthReader"></a>

_En desarrollo_

### reservationHelper <a name="helpers-reservationHelper"></a>

Todos los siguientes helpers se nutren de una misma fuente, por lo tanto reciben:

-   Objeto con información del espacio y reservas anteriores.

-   Objeto con la información de la reserva a realizar por el usuario.

-   **serviciosAgregados** - Filtra los servicios que el usuario ha agregado a su reserva.

    Recibe:

    -   Array con todos los servicios extra.

    Retorna:

    -   Array con los servicios extra incluidos.

-   **listsGroup** - Devuelve la información de la reserva a confirmar, en el formato requerido para la generación automática de listas.

    Recibe:

    -   Fecha de inicio en formato Date.
    -   Número de días a adelantar en formato Number

    Retorna:

    -   Array de objetos. En cada objeto se tiene la información a mostrar en cada lista.

-   **formatedFE** - Devuelve la fecha requerida en formato compatible a formularios.

    Recibe:

    -   Fecha en formato Date.

    Retorna:

    -   Fecha en formato string.

-   **formatedFS** - Devuelve la fecha requerida en formato compatible a formularios.

    Recibe:

    -   Fecha en formato Date.

    Retorna:

    -   Fecha en formato string.

-   **getFinalPrice** - Función que obtiene el precio final de una reserva.

    Recibe:

    -   Precio diario del espacio en formato String
    -   Array de servicios agregados
    -   Fechas de entrada y salida en formato Date

    Retorna:

    -   Precio total de la reserva en formato Number

### reservesHelper <a name="helpers-reservesHelper"></a>

-   **getReservesList** - Devuelve la información de la reserva, en el formato requerido para la generación automática de listas.

    Recibe:

    -   Objeto con la información de la reserva.

    Retorna:

    -   Objeto formateado para lista tipo object.

-   **getIncidenceList** - Devuelve la información de la incidencia, en el formato requerido para la generación automática de listas.

    Recibe:

    -   Objeto con la información de la incidencia.

    Retorna:

    -   Objeto formateado para lista tipo object.

-   **findActiveIncidence** - Revisa si en las incidencias se encuentra al menos 1 incidencia activa.

    Recibe:

    -   Array con información de todas las incidencias.

    Retorna:

    -   Booleano confirmando/negando la condición.

-   **getIncidenceList** - Devuelve la información necesaria paa generar la lista de botones en cada reserva.

    Recibe:

    -   reservation.
    -   refDialog.
    -   handleClickOpen.
    -   finished.
    -   setVisualization.
    -   setRefReservation.

    Retorna:

    -   Array de objetos con pares nombre/valor necesarios para la generación automática de botones `<ButtonList />`.

### servicesHelper <a name="helpers-servicesHelper"></a>

-   **getIncludedServices** - Devuelve array con servicios incluidos de forma gratuita en un espacio.

    Recibe:

    -   Array con la información de todos los servicios.

    Retorna:

    -   Array con la información de todos los servicios incluidos gratuitamente.

-   **getExtraServices** - Devuelve array con servicios incluidos de forma gratuita en un espacio.

    Recibe:

    -   Array con la información de todos los servicios.

    Retorna:

    -   Array con la información de todos los servicios extra y su precio.

### spaceOccupied <a name="helpers-spaceOccupied"></a>

-   **spaceOccupied** - Revisa si el espacio se encuentra ocupado el día indicado.

    Recibe:

    -   Información de espacio, que incluye un array con todas sus reservas.
    -   Dia de interés en formato Date

    Retorna:

    -   Booleano confirmando/negando la condición.

### spaceTypeToPlural <a name="helpers-spaceTypeToPlural"></a>

-   **spaceTypeToPlural** - Modifica un string a su plural.

    Recibe:

    -   Tipo de espacio en formato String.

    Retorna:

    -   String.

### spaceTyping <a name="helpers-spaceTyping"></a>

-   **spaceTyping** - Ordena los datos recibidos de una búsqueda y los separa por _tipo_

    Recibe:

    -   Array de resultados de busqueda.

    Retorna:

    -   Objeto con arrays de resultados, separadors por tipo.

## CUSTOM HOOKS <a name="customHooks"></a>

### useFetch <a name="customHooks-useFetch"></a>

-   Custom Hook que realiza llamadas HTTP GET al endpoint requerido

    Recibe:

    -   String con el endpoint al que se desea hacer la petición.
    -   Parámetro tipo Number con id del elemento deseado.

    Retorna:

    -   **data** - Variable de estado. Proveída por el hook useState de React. Contiene un objeto con pares nombre/valor que contienen la información del elemento deseado.
    -   **setData** - Funcion que permite modificar los datos contenidos en la variable de estado. Proveída por el hook useState de React.
    -   **loading** - Booleano que permite establecer un spinner mientras se espera la respueta del servidor.

### useFullView <a name="customHooks-useFullView"></a>

-   Custom Hook que se usa para cambiar la visualización si tenemos un tamaño de pantalla de movil o un tamaño de portatil.

    Recibe:

    -   Valor de inflexión de las variables de estado.

    Retorna:

    -   **fullView** - Booleano que informa si se trata de una pantalla grande o una pequeña.

### useDialog <a name="customHooks-useDialog"></a>

-   Custom Hook que se usa en conjunto con pop ups tipo Dialog y controla su visión.

    Recibe:

    Retorna:

    -   **open** - Booleano que cambia la visualización del pop up.
    -   **handleClickOpen** - Función que setea open a `true`.
    -   **handleClose** - Función que setea open a `false`.

### useClient <a name="customHooks-useClient"></a>

-   Custom Hook que genera un contexto donde se guarda la información del usuario y al mismo tiempo guarda el token en el localStorage.
    Retorna:

    -   **UseClient** - Hook de estado, devuelve 2 valores. La primera permite acceder a la información básica del cliente. La segunda es una función que permite cambiar los datos del mismo.
    -   **ClientProvider** - Devuelve un contexto, de manera tal que todos sus hijos puedan acceder al hook useClient

### useCenter <a name="customHooks-useCenter"></a>

-   Custom Hook que realiza llamadas HTTP GET al endpoint _api/centers_.

    Recibe:

    -   Parámetro tipo Number con id del usuario requerido.

    Retorna:

    -   **center** - Variable de estado. Proveída por el hook useState de React. Contiene un objeto con pares nombre/valor que contienen la información del centro requerido.
    -   **loading** - Booleano que permite establecer un spinner mientras se espera la respueta del servidor.
    -   **setCenter** - Funcion que permite modificar los datos contenidos en la variable de estado. Proveída por el hook useState de React.

### useCenterSpaces <a name="customHooks-useCenterSpaces"></a>

-   Custom Hook que realiza llamadas HTTP GET al endpoint _api/search/space_.

    Recibe:

    -   Parámetro tipo Number con id del centro requerido.

    Retorna:

    -   **result** - Variable de estado. Proveída por el hook useState de React. Contiene un objeto con pares nombre/valor que contienen la información de la busqueda realizada.
    -   **loading** - Booleano que permite establecer un spinner mientras se espera la respueta del servidor.

### useMyCenter <a name="customHooks-useMyCenter"></a>

-   Custom Hook que realiza llamadas HTTP GET al endpoint _api/mycenter_.

    Recibe:

    -   Parámetro tipo Number con id del administrador requerido.

    Retorna:

    -   **myCenter** - Variable de estado. Proveída por el hook useState de React. Contiene un objeto con pares nombre/valor que contienen un resumen con toda la información de centros, espacios y reservas de un administrador.
    -   **loading** - Booleano que permite establecer un spinner mientras se espera la respueta del servidor.

### useSearchCenter <a name="customHooks-useSearchCenter"></a>

-   Custom Hook que realiza llamadas HTTP GET al endpoint _api/search/center_.

    Recibe:

    -   Objeto con las condiciones a cumplir de la búsqueda.

    Retorna:

    -   **results** - Variable de estado. Proveída por el hook useState de React. Contiene un objeto con pares nombre/valor que contienen un resumen con toda la información que satisface las condiciones de búsqueda.
    -   **loading** - Booleano que permite establecer un spinner mientras se espera la respueta del servidor.
    -   **searchObject** - Variable de estado. Proveída por el hook useState de React. Contiene un objeto con pares nombre/valor que contienen las condiciones de búsqueda actuales.
    -   **setSearchObject** - Funcion que permite modificar los datos contenidos en la variable de estado searchObject. Proveída por el hook useState de React.
    -   **resetSearchObject** - Funcion que elimina todos los datos contenidos en la variable de estado searchObject.

### useSearchSpace <a name="customHooks-useSearchSpace"></a>

-   Custom Hook que realiza llamadas HTTP GET al endpoint _api/search/space_.

    Recibe:

    -   Objeto con las condiciones a cumplir de la búsqueda.

    Retorna:

    -   **results** - Variable de estado. Proveída por el hook useState de React. Contiene un objeto con pares nombre/valor que contienen un resumen con toda la información que satisface las condiciones de búsqueda.
    -   **loading** - Booleano que permite establecer un spinner mientras se espera la respueta del servidor.
    -   **searchObject** - Variable de estado. Proveída por el hook useState de React. Contiene un objeto con pares nombre/valor que contienen las condiciones de búsqueda actuales.
    -   **setSearchObject** - Funcion que permite modificar los datos contenidos en la variable de estado searchObject. Proveída por el hook useState de React.
    -   **resetSearchObject** - Funcion que elimina todos los datos contenidos en la variable de estado searchObject.
