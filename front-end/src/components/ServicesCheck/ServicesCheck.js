import './ServicesCheck.css';

export default function ServicesCheck({ services }) {
  return (
    <fieldset>
      {services.map((service, index) => {
        return (
          <label>
            <input key={index} value={service} type="checkbox" />
            {service}
          </label>
        );
      })}
    </fieldset>
  );
}
