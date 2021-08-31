import { Fragment } from 'react';

import ServicesCard from '../ServicesCard/ServicesCard';

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
        <ServicesCard key={list.name} listData={list} />
      ))}
    </Fragment>
  );
}
