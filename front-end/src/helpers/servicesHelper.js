function arrangeServices(spaceData) {
    let {
        listado_servicios: allServices,
        servicios: includedServices,
        servicios_extra: extraServices,
    } = spaceData;

    allServices = allServices.map((service) => {
        const isIncluded = includedServices.some((includedService) => {
            return includedService.id === service.id;
        });
        return {
            ...service,
            checked: isIncluded,
            precio: '0.00',
        };
    });

    allServices = allServices.map((service) => {
        const isIncluded = extraServices.find((extraService) => {
            return extraService.id === service.id;
        });
        if (isIncluded !== undefined) {
            const precio = isIncluded.precio;
            return {
                ...service,
                precio,
                checked: true,
            };
        } else {
            return service;
        }
    });

    return allServices;
}

export { arrangeServices };
