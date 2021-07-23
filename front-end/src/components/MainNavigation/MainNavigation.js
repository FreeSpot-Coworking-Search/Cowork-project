import './MainNavigation.css';
import MainNavigationButton from '../MainNavigationButton/MainNavigationButton';
export default function MainNavigation({ links }) {
  return (
    <ul className="mainNavigation">
      {links.map((link, index) => (
        <MainNavigationButton key={index} link={link} />
      ))}
    </ul>
  );
}
