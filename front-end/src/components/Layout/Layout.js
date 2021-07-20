import BackGroundLeft from '../BackGroundLeft/BackGroundLeft';
import BackGroundRight from '../BackGroundRight/BackGroundRight';
import Header from '../Header/Header';
import LeftArticle from '../LeftArticle/LeftArticle';
import MainNavigation from '../MainNavigation/MainNavigation';
import RightArticle from '../RightArticle/RightArticle';
import './Layout.css';

export default function Layout() {
    return (
        <section className="mainPage">
            <BackGroundLeft />
            <BackGroundRight />
            <Header />

            {/* <LeftArticle /> */}

            {/* <MainNavigation /> */}

            <RightArticle />
        </section>
    );
}
