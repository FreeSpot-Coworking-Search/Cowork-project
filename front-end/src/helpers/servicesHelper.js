function getIncludedServices(allServices) {
    return allServices.filter(
        (service) => service.included === true && service.precio === null
    );
}

function getExtraServices(allServices) {
    return allServices.filter(
        (service) => service.included === true && service.precio !== null
    );
}

export { getIncludedServices, getExtraServices };
