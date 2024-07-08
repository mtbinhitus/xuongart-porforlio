import { useEffect, useState } from 'react';
import images from '../../assets/images';
import Api from '../../services/api';
import './style.scss';

const BannerLayout = () => {
    const [banner, setBanner] = useState();

    useEffect(() => {
        const getBanner = async () => {
            await Api.getInfor().then((res) => {
                setBanner(process.env.REACT_APP_BASE_URL + res.data.url_banner);
            });
        };

        getBanner();
    }, []);

    return (
        <section className="banner-layout">
            <img src={banner} />
        </section>
    );
};

export default BannerLayout;
