import { useEffect, useState } from 'react';
import icons from '../../assets/icons';
import images from '../../assets/images';
import Api from '../../services/api';
import './style.scss';

const InforLayout = () => {
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
        <section className="infor-layout">
            <img className="logo" src={process.env.REACT_APP_BASE_URL + infor.url_avatar} alt={'logo'} />
            <p className="fz-24 fw-700 mb-10">{infor.name || 'Nhan NT'} </p>
            <p className="fz-15 c-gray">{infor.title || 'Photographer'} </p>
            <p className="c-gray fz-15">
                {infor.phone_title || 'Xuonng ART Studio'} <span>-</span> {infor.phone_number || '033.499.4647'}
            </p>
            <a className="link c-gray fz-15" onClick={() => openInNewTab(infor.url_fb)}>
                {infor.url_fb || 'https://www.facebook.com/nhan1mui'}
            </a>
            <div className="row a-center my-20">
                <img src={icons.location} style={{ height: '15px', width: '15px' }} />
                <p className="c-gray fz-15">{infor.address || 'Ho Chi Minh City, Vietnam'} </p>
            </div>

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
                    openInNewTab(infor.url_message);
                }}
            >
                <img src={icons.message} alt="message" />
                <p>Message</p>
            </div>

            <div className="max-x mt-20 col g-10">
                <div className="row j-between">
                    <p className="c-gray fz-15">Project Views</p>
                    <p className="c-gray">{infor.project_views || '2039'}</p>
                </div>
                <div className="row j-between">
                    <p className="c-gray fz-15">Appreciations</p>
                    <p className="c-gray">{infor.appreciations || '83'}</p>
                </div>
                <div className="row j-between">
                    <p className="c-gray fz-15">Followers</p>
                    <p className="c-gray">{infor.followers || '31'}</p>
                </div>
                <div className="row j-between">
                    <p className="c-gray fz-15">Following</p>
                    <p className="c-gray">{infor.follwings || '1'}</p>
                </div>
            </div>

            <div className="max-x mt-30 col g-5">
                <p className="fz-11 fw-700 c-gray">ON THE MAP</p>

                <div
                    className="btn btn__secondary btn__facebook"
                    onClick={() => {
                        openInNewTab(infor.location);
                    }}
                >
                    <img src={icons.location} alt="message" />
                    <p>Map</p>
                </div>
            </div>

            <p className="mt-30 fz-11 fw-400 c-gray">CTY: {infor.cty_name}</p>
            <p className="mt-5 fz-11 fw-400 c-gray">Tax Code: {infor.mst}</p>
        </section>
    );
};

export default InforLayout;
