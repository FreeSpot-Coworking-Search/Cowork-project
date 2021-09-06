import { toFormDate, isBetween } from '../helpers/dateHelper';

import axios from 'axios';
const {
    REACT_APP_API_LOCAL_SERVER_HOST: host,
    REACT_APP_API_LOCAL_SERVER_PORT: port,
} = process.env;

function getReservesList(reservation) {
    return {
        name: `${reservation?.nombre}: ${toFormDate(
            reservation?.fecha_inicio
        )} / ${toFormDate(reservation?.fecha_fin)}`,
        data: {
            Dirección: reservation?.direccion,
            Teléfono: reservation?.telefono,
            'Precio total': reservation?.precio,
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

function getBtnBehavior(reservation, refDialog, handleClickOpen) {
    return [
        {
            text: '$',
            action: () => {
                reservation.pagado === 1
                    ? (refDialog.current = {
                          reservation: reservation,
                          dialog: 'paymentDialogPagado',
                      })
                    : (refDialog.current = {
                          reservation: reservation,
                          dialog: 'paymentDialogPendiente',
                      });
                handleClickOpen();
            },
            type: reservation?.pagado === 0 ? 'alert' : 'main',
        },
        {
            text: '!',
            action: () => {
                refDialog.current = {
                    reservation: reservation,
                    dialog: 'incidencesDialog',
                };
                handleClickOpen();
            },
            type: findActiveIncidence(reservation.incidencias)
                ? 'alert'
                : 'main',
        },
        {
            text: '+',
            action: () => {
                refDialog.current = {
                    reservation: reservation,
                    dialog: 'servicesDialog',
                };
                handleClickOpen();
            },
        },
    ];
}

function findActiveIncidence(incidences) {
    return incidences?.some((incidence) => incidence.estado === 0);
}

export {
    getReservesList,
    getIncidenceList,
    findActiveIncidence,
    getBtnBehavior,
};
