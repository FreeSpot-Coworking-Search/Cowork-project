import './ServicesCheck.css';

export default function ServicesCheck({ services }) {
  return (
    <fieldset className="searchFormFieldset serviceCheck">
      <legend>Servicios</legend>
      {services.map((service, index) => {
        return (
          <label key={index} className="searchFormLabel">
            <input key={index} value={service} type="checkbox" />
            {service}
          </label>
        );
      })}
    </fieldset>
  );
}
