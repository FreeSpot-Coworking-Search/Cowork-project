import './buttonList.css';
import { Link } from 'react-router-dom';

export default function ButtonList({ btnBehavior, cssStyle }) {
    return (
        <ol className={cssStyle}>
            {btnBehavior.map(({ text, route, action, secondary }) =>
                route ? (
                    <span key={`${cssStyle}-${text}`} className="shadow-wrap">
                        <li
                            className={`dualBtn ${
                                secondary ? 'secondary' : ''
                            }`}
                        >
                            <Link to={route}>{text}</Link>
                        </li>
                    </span>
                ) : (
                    <span key={`${cssStyle}-${text}`} className="shadow-wrap">
                        <li
                            className={`dualBtn ${
                                secondary ? 'secondary' : ''
                            }`}
                        >
                            <button onClick={action} className="dualBtn-button">
                                {text}
                            </button>
                        </li>
                    </span>
                )
            )}
        </ol>
    );
}
