import { Link } from 'react-router-dom';
import './MainNavigationButton.css';

export default function MainNavigationButton({ link }) {
  const { path, text, action, icon, alert } = link;
  return path ? (
    <li className="mainNavigationButton notificationContainer">
      <Link to={path} className="tooltip">
        <img src={icon} alt="Icon" className="mainNavigationButtonIcon" />
        <p className="tooltiptext">{text}</p>
        {alert > 0 ? <p className="notificationBubble">{alert}</p> : ''}
      </Link>
    </li>
  ) : (
    <li className="mainNavigationButton notificationContainer">
      <button onClick={action} className="tooltip">
        <img src={icon} alt="Icon" className="mainNavigationButtonIcon" />
        <p className="tooltiptext">{text}</p>
        {alert > 0 ? <p className="notificationBubble">{alert}</p> : ''}
      </button>
    </li>
  );
}
