import { Fragment } from 'react';

import ServicesCard from '../ServicesCard/ServicesCard';

export default function ReservationServicesList({
  spaceData,
  reservation,
  setReservation,
}) {
  const servicesGroup = [
    {
      name: 'Selecciona tus servicios extra',
      data: spaceData?.servicios_extra,
      type: 'checkbox',
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
        <ServicesCard
          key={list.name}
          listData={list}
          checkInputAction={addService}
          checkValues={reservation.servicios}
        />
      ))}
    </Fragment>
  );
}
