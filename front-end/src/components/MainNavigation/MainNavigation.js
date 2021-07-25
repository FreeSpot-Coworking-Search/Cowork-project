import './MainNavigation.css';
import MainNavigationButton from '../MainNavigationButton/MainNavigationButton';
export default function MainNavigation({ links, className }) {
  return (
    <ul className={className + ' mainNavigation'}>
      {links.map((link, index) => (
        <MainNavigationButton key={index} link={link} />
      ))}
    </ul>
  );
}
