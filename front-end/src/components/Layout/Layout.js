import './Layout.css';
import '../../css/mainSection.css';
import '../../css/tooltip.css';
import { Switch, Route } from 'react-router-dom';

import BackGroundLeft from '../BackGroundLeft/BackGroundLeft';
import BackGroundRight from '../BackGroundRight/BackGroundRight';
import DecorationHeader from '../Decoration/DecorationHeader/DecorationHeader';

import Header from '../Header/Header';
import Routes from '../../routes/Routes';

import Footer from '../../components/Footer/Footer';

import TemplateMainSection from '../Templates/TemplateMainSection/TemplateMainSection';
import Decoration from '../Decoration/Decoration';

export default function Layout() {
  return (
    <section className="mainPage">
      <BackGroundLeft />
      <BackGroundRight />
      <Decoration />
      <Header />
      <Switch>
        <Routes />
      </Switch>
    </section>
  );
}
