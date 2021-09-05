import { toFormDate } from '../helpers/dateHelper';

function findActiveIncidence(incidences) {
    return incidences?.some((incidence) => incidence.estado === 1);
}

function getReservesList(reservation) {
    return {
        name: `${reservation?.nombre}: ${toFormDate(
            reservation?.fecha_inicio
        )} / ${toFormDate(reservation?.fecha_fin)}`,
        data: {
            Dirección: reservation?.direccion,
            Teléfono: reservation?.telefono,
            'precio total': reservation?.precio,
        },
        type: 'object',
    };
}

function getIncidenceList(incidence) {
    return {
        name: toFormDate(incidence?.fecha_incidencia),
        data: {
            Categoria: incidence?.categoria,
            Descripción: incidence?.descripcion,
            Estado: incidence?.estado ? 'Resuelto' : 'Pendiente',
            Respuesta: incidence?.respuesta,
        },
        type: 'object',
    };
}

export { getReservesList, getIncidenceList, findActiveIncidence };
