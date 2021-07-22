import './Header.css';
import logo from '../../assets/logos/lincolnSquare.png';

import TopNavigation from '../TopNavigation/TopNavigation';
import Avatar from '../Avatar/Avatar';

export default function Header() {
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
            <a className="header-logo" href="#">
                CWO HAB
            </a>
            <TopNavigation />
            <Avatar />
        </header>
    );
}
