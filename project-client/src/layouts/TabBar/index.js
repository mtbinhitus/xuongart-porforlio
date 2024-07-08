import { useEffect, useState } from 'react';
import icons from '../../assets/icons';
import Api from '../../services/api';
import './style.scss';

const TabBarLayout = () => {
    // ** State **
    const [tags, setTags] = useState([]);

    return (
        <section className="tabbar-layout">
            <div className="row g-10">
                <div className="btn btn--active">
                    <p>Work</p>
                </div>
                <div className="btn">
                    <p>Video</p>
                </div>
            </div>
            <div className="row g-10 mt-10">
                {tags.length > 0 &&
                    tags.map((item, index) => (
                        <div className="btn__tag" key={index}>
                            <span className="fz-11 fw-400"># {item.title}</span>
                        </div>
                    ))}
            </div>
        </section>
    );
};

export default TabBarLayout;
