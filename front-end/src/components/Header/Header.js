import './Header.css';
import { Link } from 'react-router-dom';

import logo from '../../assets/logos/COWORKproject.png';
import Avatar from '../Avatar/Avatar';
import ButtonList from '../ButtonList/ButtonList';

export default function Header() {
  const buttonAction = () => console.log('Its Alive!');

  const btnBehavior = [
    { text: 'Home', route: '/' },
    { text: 'Admin', action: buttonAction },
    { text: 'My center', route: '/mycenter/1' },
  ];

  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <img src={logo} alt="CWO" />
      </Link>
      <nav>
        <ButtonList btnBehavior={[...btnBehavior]} cssStyle="header-links" />
        <Avatar />
      </nav>
    </header>
  );
}
