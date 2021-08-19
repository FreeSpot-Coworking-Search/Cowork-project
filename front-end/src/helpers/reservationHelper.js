import { toFormDate } from './dateHelper';
import { differenceInDays } from 'date-fns';

export function reservationHelper(spaceData, reservation) {
    const { nombre, localidad, direccion, codigo_postal } = spaceData.centro;
    const { precio, tipo, servicios, servicios_extra } = spaceData;
    let {
        fecha_entrada,
        fecha_salida,
        servicios: servicios_checkeados,
    } = reservation;

    console.log(reservation);

    fecha_entrada = fecha_entrada || new Date();
    fecha_salida = fecha_salida || new Date();

    const formatedFE = toFormDate(fecha_entrada);
    const formatedFS = toFormDate(fecha_salida);

    const serviciosAgregados = servicios_extra.filter((servicio) => {
        return servicios_checkeados?.[servicio.id] === true;
    });

    const listsGroup = [
        {
            name: 'informacion espacio',
            data: {
                nombre,
                tipo,
                precio,
                direccion,
                localidad,
                codigo_postal,
            },
            type: 'object',
        },
        {
            name: 'fechas de reserva',
            data: {
                'fecha entrada': formatedFE,
                'fecha salida': formatedFS,
            },
            type: 'object',
        },
        {
            name: 'servicios agregados',
            data: serviciosAgregados,
            type: 'standar',
        },

        {
            name: 'servicios gratuitos',
            data: servicios,
            type: 'standar',
        },
    ];

    function getFinalPrice() {
        const spacePrice = Number(spaceData.precio);
        const servicesPrice = serviciosAgregados.reduce(
            (accumulator, currentValue) =>
                accumulator + Number(currentValue.precio),
            0
        );
        const days = differenceInDays(fecha_salida, fecha_entrada) + 1;
        return (spacePrice + servicesPrice) * days;
    }

    return [
        serviciosAgregados,
        listsGroup,
        formatedFE,
        formatedFS,
        getFinalPrice,
    ];
}
