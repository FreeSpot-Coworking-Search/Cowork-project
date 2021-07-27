import './ServicesCheck.css';

export default function ServicesCheck({ services }) {
  console.log(services);
  return (
    <fieldset className="searchFormFieldset serviceCheck">
      <legend>Servicios</legend>
      {services.map((service, index) => {
        return (
          <label key={service.id} className="searchFormLabel">
            <input key={service.id} value={service.nombre} type="checkbox" />
            {service.nombre}
          </label>
        );
      })}
    </fieldset>
  );
}
