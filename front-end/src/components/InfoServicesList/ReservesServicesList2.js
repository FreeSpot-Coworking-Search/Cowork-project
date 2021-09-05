import { Fragment } from 'react';

import ServicesCard from '../ServicesCard/ServicesCard';

export default function InfoServicesList({ servicesArray, uniqueId }) {
    const servicesGroup = [
        {
            name: 'Servicios incluidos',
            data: servicesArray?.filter((service) => service.precio === null),
            type: 'standar',
        },
        {
            name: 'Servicios extra',
            data: servicesArray?.filter((service) => service.precio !== null),
            type: 'standar',
        },
    ];

    return (
        <Fragment>
            {servicesGroup.map((list) => (
                <ServicesCard
                    key={`${list.name}-${uniqueId}`}
                    listData={list}
                />
            ))}
        </Fragment>
    );
}
