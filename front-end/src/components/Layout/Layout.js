import BackGroundLeft from '../BackGroundLeft/BackGroundLeft';
import BackGroundRight from '../BackGroundRight/BackGroundRight';
import Header from '../Header/Header';
import LeftArticle from '../LeftArticle/LeftArticle';
import MainNavigation from '../MainNavigation/MainNavigation';
import RightArticle from '../RightArticle/RightArticle';
import './Layout.css';

export default function Layout() {
  return (
    <section class="mainPage">
      <BackGroundLeft />
      <BackGroundRight />
      <Header></Header>

      {/* <LeftArticle /> */}

      <MainNavigation />

      <RightArticle />
    </section>
  );
}
