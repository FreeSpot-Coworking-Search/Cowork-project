import { Link } from 'react-router-dom';
import './MainNavigationButton.css';

export default function MainNavigationButton({ link }) {
  const { path, text, action, icon } = link;
  return path ? (
    <li>
      <Link className="mainNavigationButton" to={link.path}>
        <img src={link.icon} alt="Icon" className="mainNavigationButtonIcon" />
      </Link>
    </li>
  ) : (
    <li>
      <button className="mainNavigationButton" onClick={action}>
        <img src={link.icon} alt="Icon" className="mainNavigationButtonIcon" />
      </button>
    </li>
  );
}
