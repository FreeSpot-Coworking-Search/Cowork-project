import { toFormDate } from '../helpers/dateHelper';

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

function getBtnBehavior(
    reservation,
    refDialog,
    handleClickOpen,
    finished,
    setVisualization,
    setRefReservation
) {
    return [
        {
            text: finished ? '★' : '$',
            action: finished
                ? () => {
                      setVisualization('newScore');
                      setRefReservation({ ...reservation });
                  }
                : () => {
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
            type: finished
                ? reservation?.puntuacion_usuario !== null
                    ? 'main'
                    : 'alert'
                : reservation?.pagado === 1
                ? 'main'
                : 'alert',
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

async function sendPaymentMail(reservation) {
    try {
        const route = `${host}:${port}/api/reserves/payment/?id=${reservation.id}`;
        const response = await axios.get(route);
        return response;
    } catch (error) {
        return error;
    }
}

export {
    getReservesList,
    getIncidenceList,
    findActiveIncidence,
    getBtnBehavior,
};
