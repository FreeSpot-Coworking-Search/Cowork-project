import '../../css/presentation.css';
import './servicesPresentation.css';

import ServicesList from '../servicesList/ServicesList';

export default function ServicesPresentation({
    className,
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
        <article className={className + ' presentation'}>
            {servicesGroup.map((list) => (
                <ServicesList
                    key={list.name}
                    listData={list}
                    checkInputAction={addService}
                    checkValues={reservation.servicios}
                />
            ))}
        </article>
    );
}
