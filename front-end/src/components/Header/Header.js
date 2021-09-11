import './Header.css';
import { Link } from 'react-router-dom';

import logo from '../../assets/logos/COWORKproject.png';
import miniLogo from '../../assets/logos/COWORKprojectMini.png';
import Avatar from '../Avatar/Avatar';
import ButtonList from '../ButtonList/ButtonList';
import { useClient } from '../../hooks/useClient';
import useFullView from '../../hooks/useFullView';

export default function Header() {
  const [clientData] = useClient();
  const [fullView] = useFullView();

  let middleBtn;

  if (clientData.tipo === 'usuario')
    middleBtn = { text: 'Mi Coworking', route: '/mycoworking' };
  else if (clientData.tipo === 'administrador')
    middleBtn = { text: 'Mis Centros', route: '/mycenter' };
  else middleBtn = { text: 'Registro', route: '/users/register' };

  let rightBtn;

  if (clientData.tipo === 'usuario')
    rightBtn = { text: 'Mis Datos', route: '/users' };
  else if (clientData.tipo === 'administrador')
    rightBtn = { text: 'Mis Datos', route: '/admins' };

  const btnBehavior = clientData.state
    ? [{ text: 'Home', route: '/' }, { ...middleBtn }, { ...rightBtn }]
    : [{ text: 'Home', route: '/' }, { ...middleBtn }];

  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <img src={fullView ? logo : miniLogo} alt="CWO" />
      </Link>
      <nav>
        <ButtonList btnBehavior={btnBehavior} cssStyle="header-links" />
        <Avatar />
      </nav>
    </header>
  );
}
