import './MyCenterSelector.css';
import '../../css/presentation.css';
import { Link } from 'react-router-dom';

export default function MyCenterSelector({
    centers,
    selectedCenter,
    setSelectedCenter,
}) {
    return (
        <div className="myCenterSelector">
            <nav>
                <Link to={`/center/${centers[selectedCenter].id}`}>
                    {centers[selectedCenter].nombre}
                </Link>
                <ul>
                    {centers.map((center, index) =>
                        index !== selectedCenter ? (
                            <li key={center.id}>
                                <a
                                    href="#"
                                    onClick={() => setSelectedCenter(index)}
                                >
                                    {centers[index].nombre}
                                </a>
                            </li>
                        ) : (
                            ''
                        )
                    )}
                </ul>
            </nav>
        </div>
    );
}
