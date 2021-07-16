import AvatarImage from '../AvatarImage/AvatarImage';
import TopNavigationButton from '../TopNavigationButton/TopNavigationButton';
import './TopNavigation.css';

export default function TopNavigation(links) {
  const linksTemporal = [
    { path: '/', text: 'Home' },
    { path: '/user', text: 'User' },
    { path: '/admin', text: 'Admin' },
  ];
  return (
    <nav className="topNavigation">
      <ul className="topNavigationList">
        {linksTemporal.map((link) => (
          <li key={link.path}>
            <TopNavigationButton link={link} />
          </li>
        ))}
      </ul>
      <AvatarImage></AvatarImage>;
    </nav>
  );
}
