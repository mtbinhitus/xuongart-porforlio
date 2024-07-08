import { BannerLayout, ContentSpaceLayout, InforLayout, InforMobile, TabBarLayout } from '../../layouts';
import './style.scss';

const HomePage = () => {
    return (
        <div className="home-page col">
            <div className="banner-wrapper">
                <BannerLayout />
            </div>

            <div className="body-wrapper">
                <InforLayout />

                <div className="work-space">
                    <ContentSpaceLayout />
                </div>
            </div>

            <div className="body-mobile">
                <InforMobile />

                <ContentSpaceLayout />
            </div>
        </div>
    );
};

export default HomePage;
