import TopNavigation from '../TopNavigation/TopNavigation';
import './Header.css';
import logo from '../../assets/logos/lincolnSquare.png';

export default function Header() {
  return (
    <header className="header">
      <div className="headerDecoration"></div>
      {/* <a className="header-logo" href="#">
        CWO HAB
      </a> */}
      <img src={logo} alt="LOGO" className="logo"></img>
      <TopNavigation />
    </header>
  );
}
