import StarsDisplay from '../StarsDisplay/StarsDisplay';
import './ScoreCard.css';

export default function ScoreCard({ score }) {
    return (
        <li key={score.id} className="scoreCard">
            <header className="scoreCardHeader">
                <span>
                    <p className="scoreCardUsuario">{score.nombre}</p>
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
