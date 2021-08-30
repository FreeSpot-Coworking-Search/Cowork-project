import './Home.css';
import { useParams } from 'react-router-dom';

export default function Home() {
  const Params = useParams();
  console.log(Params);
  console.log('hola');

  return (
    <div className="mainSection">
      <h1>Home</h1>
    </div>
  );
}
