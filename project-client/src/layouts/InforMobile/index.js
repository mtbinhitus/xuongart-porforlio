import { useEffect, useState } from 'react';
import icons from '../../assets/icons';
import images from '../../assets/images';
import Api from '../../services/api';
import './style.scss';

const InforMobile = () => {
    // ** State ** //
    const [infor, setInfor] = useState({});

    // ** Get Infor ** //
    useEffect(() => {
        const getInfor = async () => {
            const res = await Api.getInfor().then((res) => res.data);

            setInfor(res);
        };
        getInfor();
    }, []);

    // ** Open URL ** //
    const openInNewTab = (url) => {
        var win = window.open(url, '_blank');
        win.focus();
    };

    return (
        <section className="infor-mobile-layout">
            <div className="logo">
                <img src={process.env.REACT_APP_BASE_URL + infor.url_avatar} alt={'logo'} />
            </div>
            <p className="fz-24 fw-700 mb-10">{infor.name || 'Nhan NT'} </p>
            <p className="fz-15 c-gray">{infor.title || 'Photographer'} </p>
            <p className="c-gray fz-15">
                {infor.phone_title || 'Xuonng ART Studio'} <span>-</span> {infor.phone_number || '033.499.4647'}
            </p>
            <a className="link c-gray fz-15">{infor.url_fb || 'https://www.facebook.com/nhan1mui'}</a>
            <div className="row a-center my-20">
                <img src={icons.location} style={{ height: '15px', width: '15px' }} />
                <p className="c-gray fz-15">{infor.address || 'Ho Chi Minh City, Vietnam'} </p>
            </div>

            <div className="btn-wrapper">
                <div
                    className="btn btn__primary"
                    onClick={() => {
                        openInNewTab(infor.url_fanpage);
                    }}
                >
                    <img src={icons.facebook} alt="follow" />
                    <p className="c-gray">Fanpage</p>
                </div>

                <div
                    className="btn btn__secondary mt-10"
                    onClick={() => {
                        openInNewTab('http://m.me/xuongartstudio');
                    }}
                >
                    <img src={icons.message} alt="message" />
                    <p>Message</p>
                </div>
            </div>
        </section>
    );
};

export default InforMobile;
