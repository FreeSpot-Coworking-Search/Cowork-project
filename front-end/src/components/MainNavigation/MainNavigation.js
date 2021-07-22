import './MainNavigation.css';
import locationIcon from '../../assets/icons/bxs-location-plus 1.png';
import MainNavigationButton from '../MainNavigationButton/MainNavigationButton';
export default function MainNavigation(links) {
  const temporalLinks = [
    {
      action: () => {
        console.log('hola');
      },
      icon: locationIcon,
      text: 'Uno',
    },
    { path: '/', icon: locationIcon, text: 'Uno' },
    { path: '/', icon: locationIcon, text: 'Uno' },
  ];
  return (
    <ul className="mainNavigation">
      {temporalLinks.map((link, index) => (
        <MainNavigationButton key={index} link={link} />
      ))}
    </ul>
  );
}
