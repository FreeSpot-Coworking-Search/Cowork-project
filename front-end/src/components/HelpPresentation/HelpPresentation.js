import './HelpPresentation.css';

export default function HelpPresentation({ className, image, text }) {
  return (
    <div className={className + ' presentation helpPresentation'}>
      <img src={image} alt="Ilustracion formulario" />
      <p>{text}</p>
    </div>
  );
}
