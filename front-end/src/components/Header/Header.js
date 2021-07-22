import './Header.css';
import { Link } from 'react-router-dom';

import logo from '../../assets/logos/lincolnSquare.png';
import Avatar from '../Avatar/Avatar';
import ButtonList from '../ButtonList/ButtonList';

export default function Header() {
    const buttonAction = () => console.log('Its Alive!');

    const btnBehavior = [
        { text: 'Home', route: '/' },
        { text: 'Usuarios', route: '/users' },
        { text: 'Espacios', action: buttonAction },
    ];

    return (
        <header className="header">
            {/* <svg
                width="600"
                height="129"
                viewBox="0 0 600 129"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 -19H600V75C600 75 600 129 535 129C470 129 0 129 0 129V-19Z"
                    fill="#292F36"
                />
            </svg> */}
            <Link to="/">
                <img src={logo} alt="CWO" className="header-logo" />
            </Link>
            <ButtonList
                btnBehavior={[...btnBehavior]}
                cssStyle="header-links"
            />
            <Avatar />
        </header>
    );
}
