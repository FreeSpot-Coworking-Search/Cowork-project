import { Fragment } from 'react';

import ItemList from '../ItemList/ItemList';

export default function InfoServicesList({ spaceData }) {
    const servicesGroup = [
        {
            name: 'Servicios incluidos',
            data: spaceData?.servicios,
            type: 'standar',
        },
        {
            name: 'Servicios extra',
            data: spaceData?.servicios_extra,
            type: 'standar',
        },
    ];

    return (
        <Fragment>
            {servicesGroup.map((list) => (
                <ItemList key={list.name} listData={list} />
            ))}
        </Fragment>
    );
}
