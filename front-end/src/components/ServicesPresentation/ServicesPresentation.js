import '../../css/presentation.css';
import './servicesPresentation.css';

import ServicesList from '../servicesList/ServicesList';

export default function ServicesPresentation({
    className,
    listsGroup,
    reservation,
    setReservation,
}) {
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
            {listsGroup.map((list) => (
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
