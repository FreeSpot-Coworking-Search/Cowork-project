import { Fragment } from 'react';

import ItemList from '../ItemList/ItemList';

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
                <ItemList key={`${list.name}-${uniqueId}`} listData={list} />
            ))}
        </Fragment>
    );
}
