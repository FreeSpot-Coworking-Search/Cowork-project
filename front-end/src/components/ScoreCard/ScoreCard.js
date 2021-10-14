import StarsDisplay from '../StarsDisplay/StarsDisplay';
import './ScoreCard.css';
import { getHost } from '../../helpers/environmentHelpers';

export default function ScoreCard({ score }) {
    return (
        <li key={score.id} className="scoreCard">
            <header className="scoreCardHeader">
                <span>
                    <img
                        src={`${getHost()}/api/images/usersPhotos/${
                            score.foto
                        }`}
                        alt=""
                    />
                    <p className="scoreCardUsuario">{`${score.nombre} ${score.apellidos}`}</p>
                </span>
                <StarsDisplay
                    puntuation={score.puntuacion_usuario}
                    className="scoreCardScore"
                />
            </header>
            <span className="scoreCardComent">
                <p>{score.comentario_usuario}</p>
                <p>{new Date(score.fecha_inicio).toLocaleDateString()}</p>
            </span>
        </li>
    );
}
