import './Spinner.css';

export default function Spinner({ className }) {
  return (
    <div className={className + ' container'}>
      <div className="circle">
        <div className="square"></div>
      </div>
    </div>
  );
}
