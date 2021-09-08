import './buttonList.css';
import { Link } from 'react-router-dom';

export default function ButtonList({
    btnBehavior,
    cssStyle = 'buttonList-default',
}) {
    return (
        <ol className={cssStyle}>
            {btnBehavior.map(({ text, route, action, type = '' }) =>
                route ? (
                    <span key={`${cssStyle}-${text}`} className="shadow-wrap">
                        <li className={`dualBtn ${type}`}>
                            <Link to={route}>{text}</Link>
                        </li>
                    </span>
                ) : (
                    <span key={`${cssStyle}-${text}`} className="shadow-wrap">
                        <li className={`dualBtn ${type}`}>
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
