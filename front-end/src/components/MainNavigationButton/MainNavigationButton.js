import { Link } from 'react-router-dom';
import './MainNavigationButton.css';

export default function MainNavigationButton({ link }) {
  const { path, text, action, icon } = link;
  return path ? (
    <li className="mainNavigationButton ">
      <Link to={path} className="tooltip">
        <img src={icon} alt="Icon" className="mainNavigationButtonIcon" />
        <p className="tooltiptext">{link.text}</p>
      </Link>
    </li>
  ) : (
    <li className="mainNavigationButton">
      <button onClick={action} className="tooltip">
        <img src={icon} alt="Icon" className="mainNavigationButtonIcon" />
        <p className="tooltiptext">{link.text}</p>
      </button>
    </li>
  );
}
