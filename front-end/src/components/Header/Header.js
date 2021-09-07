import './Header.css';
import { Link } from 'react-router-dom';

import logo from '../../assets/logos/COWORKproject.png';
import Avatar from '../Avatar/Avatar';
import ButtonList from '../ButtonList/ButtonList';
import { useClient } from '../../hooks/useClient';
import { useEffect, useState } from 'react';

export default function Header() {
    const [clientData] = useClient();

    const [middleBtn, setMiddleBtn] = useState({});

    useEffect(() => {
        if (clientData.tipo === 'usuario') {
            setMiddleBtn({ text: 'Mi Coworking', route: '/mycoworking' });
        } else if (clientData.tipo === 'administrador') {
            setMiddleBtn({ text: 'Mis Centros', route: '/mycenter' });
        } else {
            setMiddleBtn({ text: 'Registrate', route: '/users/register' });
        }
    }, [clientData]);

    const btnBehavior = [
        { text: 'Home', route: '/' },
        { ...middleBtn },
        { text: 'Blog', route: '/' },
    ];

    return (
        <header className="header">
            <Link to="/" className="header-logo">
                <img src={logo} alt="CWO" />
            </Link>
            <nav>
                <ButtonList
                    btnBehavior={[...btnBehavior]}
                    cssStyle="header-links"
                />
                <Avatar />
            </nav>
        </header>
    );
}
