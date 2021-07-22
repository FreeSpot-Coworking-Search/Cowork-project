import { Link } from 'react-router-dom';
import './MainNavigationButton.css';

export default function MainNavigationButton({ link }) {
  return (
    <Link className="mainNavigationButton" to={link.path}>
      <img src={link.icon} alt="Icon" className="mainNavigationButtonIcon" />
    </Link>
  );
}
