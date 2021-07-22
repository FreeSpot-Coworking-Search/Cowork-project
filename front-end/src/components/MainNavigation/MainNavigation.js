import './MainNavigation.css';
import locationIcon from '../../assets/icons/bxs-location-plus 1.png';
import MainNavigationButton from '../MainNavigationButton/MainNavigationButton';
export default function MainNavigation(links) {
  const temporalLinks = [
    {
      path: '/',
      icon: '../../assets/icons/bxs-location-plus 1.png',
      text: 'Uno',
    },
    { path: '/', icon: locationIcon, text: 'Uno' },
    { path: '/', icon: locationIcon, text: 'Uno' },
  ];
  return (
    <div className="mainNavigation">
      {temporalLinks.map((link, index) => (
        <MainNavigationButton key={index} link={link} />
      ))}
    </div>
  );
}
