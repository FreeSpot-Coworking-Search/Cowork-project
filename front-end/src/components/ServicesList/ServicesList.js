import { Fragment } from 'react';

import ItemList from '../ItemList/ItemList';

export default function ServicesList({
    spaceData,
    reservation,
    setReservation,
}) {
    const servicesGroup = [
        {
            name: 'servicios extra',
            data: spaceData?.servicios_extra,
            type: 'checkbox',
        },
        {
            name: 'servicios incluidos',
            data: spaceData?.servicios,
            type: 'standar',
        },
    ];

    function addService(checkId) {
        const services = reservation.servicios || {};

        if (services.hasOwnProperty(checkId)) {
            services[checkId] = !services[checkId];
        } else {
            services[checkId] = true;
        }

        setReservation({
            ...reservation,
            servicios: services,
        });
    }

    return (
        <Fragment>
            {servicesGroup.map((list) => (
                <ItemList
                    key={list.name}
                    listData={list}
                    checkInputAction={addService}
                    checkValues={reservation.servicios}
                />
            ))}
        </Fragment>
    );
}
