import { useEffect, useState } from 'react';
import icons from '../../assets/icons';
import IconTag from '../../assets/icons/tag';
import images from '../../assets/images';
import ModalYoutube from '../../components/ModalYoutube';
import useModalYoutube from '../../components/ModalYoutube/useModalYoutube';
import Api from '../../services/api';
import CollectionDetail from '../CollectionDetail';
import useCollectionDetail from '../CollectionDetail/useCollectionDetail';
import './style.scss';
import { useNavigate, useParams } from 'react-router-dom';
import useVideoModal from '../VideoPlayer/useVideoModal';
import VideoPlayer from '../VideoPlayer';

const ContentSpaceLayout = (props) => {
    const navigation = useNavigate();
    const params = useParams();
    // ** Props **
    const { onUpdate } = props;

    // ** State **
    const [collections, setCollections] = useState([]);
    const [collectionActive, setCollectionActive] = useState([]);
    const [collectionID, setCollectionID] = useState(1);
    const [tags, setTags] = useState([]);
    const [videoSrc, setVideoSrc] = useState();
    const [thumbnailSrc, setThumbnailSrc] = useState();

    const [activeTab, setActiveTab] = useState(0);

    // ** Use Collections Detail Modal
    const { isShowingCollectionDetail, toggleCollectionDetail } = useCollectionDetail();
    // ** Use Modal Youtube
    const { isShowingVideoModal, toggleVideoModal } = useVideoModal();

    // ** Open Details **
    const openDetail = async (item) => {
        Api.increaseView(item.id);
        // ** Type Image **
        if (item.type == 1) {
            setCollectionID(item.id);
            toggleCollectionDetail();
        }

        // ** Type Video **
        if (item.type == 2) {
            const res = await Api.getImages(item.id);
            if (res.data.length > 0) {
                console.log(res.data[0].src);
                setVideoSrc(res.data[0].src);
            }
            setCollectionID(item.id);

            setThumbnailSrc(item.url_thumbnail);
            toggleVideoModal();
        }
    };

    // ** Get Collections **
    useEffect(() => {
        const get = async () => {
            const res = await Api.getCollections((res) => res.data);

            setCollections(res.data);
            let arr = res.data
                .filter((collection) => collection.type == activeTab && collection.status == 1)
                .sort((a, b) => a.index - b.index);
            setCollectionActive(arr);
        };

        get();
    }, []);

    // ** Get Tags **
    const getTag = async () => {
        const res = await Api.getTags((res) => {
            return res.data;
        });

        const dataHandleTag = res.data.map((item, index) => {
            item['active'] = false;
            return item;
        });

        setTags(dataHandleTag);
    };

    // ** Update Sort Tags ** //
    const updateSortTags = async (id) => {
        let tempTags = tags.map((item, index) => {
            if (item.id === id) {
                item.active = !item.active;
            }

            return item;
        });

        setTags(tempTags);
    };

    useEffect(() => {
        handleTagChange();
    }, [tags]);

    const handleTagChange = () => {
        if (tags.length > 0) {
            const activeLength = tags.filter((item) => item.active == true).length;

            // ** Select filters ** //
            if (activeLength > 0) {
                let tempCollections = [];

                collections.map((collection) => {
                    // ** check active tags ** //
                    let result = collection.tags.filter((res) => {
                        if (tags.filter((tag) => res == tag.id && tag.active == true).length > 0) return res;
                    }).length;
                    if (result > 0 && collection.type == activeTab && collection.status == 1)
                        tempCollections.push(collection);
                });

                setCollectionActive(tempCollections.sort((a, b) => a.index - b.index));
            } else {
                // ** Không Filter ** //
                let tempArr = collections
                    .filter((collection) => collection.type == activeTab && collection.status == 1)
                    .sort((a, b) => a.index - b.index);
                setCollectionActive(tempArr);
            }
        }
    };

    const resetActiveTags = () => {
        if (tags.length > 0) {
            let arr = tags.map((item) => {
                item.active = false;
                return item;
            });

            setTags(arr);
        }
    };

    useEffect(() => {
        if (activeTab == 1 || (activeTab == 2 && collections.length > 0)) {
            let tempArr = collections.filter((collection) => collection.type == activeTab);

            setCollectionActive(tempArr);
            resetActiveTags();
            // handleTagChange();
        }
    }, [activeTab, collections]);

    const handleActiveTab = (index) => {
        setActiveTab(index);
    };

    //** Save Active stats */
    useEffect(() => {
        if (activeTab == 1 || activeTab == 2) localStorage.setItem('activeTab', activeTab.toString());
    }, [activeTab]);

    useEffect(() => {
        const activeTab = localStorage.getItem('activeTab');

        if (activeTab == 1 || activeTab == 2) {
            setActiveTab(parseInt(activeTab));
        } else {
            setActiveTab(1);
        }

        // handle Tag
        getTag();
    }, []);

    return (
        <main>
            <section className="tabbar-layout">
                <div className="row g-10">
                    <div className={`btn ${activeTab == 1 && 'btn--active'} `} onClick={() => handleActiveTab(1)}>
                        <p>Photo</p>
                    </div>
                    <div className={`btn ${activeTab == 2 && 'btn--active'} `} onClick={() => handleActiveTab(2)}>
                        <p>Video</p>
                    </div>
                </div>
                <div className="row g-10 mt-10">
                    {tags.length > 0 &&
                        tags.map((item, index) => {
                            if (item.type == activeTab) {
                                return (
                                    <div
                                        className={`btn__tag ${item.active && 'btn__tag--active'}`}
                                        key={index}
                                        onClick={() => updateSortTags(item.id)}
                                    >
                                        {/* <img src={icons.tag} className="mr-5" style={{ height: 16, width: 16 }} /> */}
                                        <span className="fz-11 fw-400"># {item.title}</span>
                                    </div>
                                );
                            }
                        })}
                </div>
            </section>

            <section className="content-space-layout">
                <CollectionDetail
                    isShowing={isShowingCollectionDetail}
                    hide={toggleCollectionDetail}
                    collectionID={collectionID}
                />

                <VideoPlayer isShowing={isShowingVideoModal} hide={toggleVideoModal} collectionID={collectionID} />
                {collectionActive.length > 0 &&
                    collectionActive.map((item, index) => {
                        return (
                            <div className="card" onClick={() => openDetail(item)}>
                                <div className="image-container">
                                    <img
                                        className="image-details"
                                        src={process.env.REACT_APP_BASE_URL + item.url_thumbnail}
                                    />
                                </div>
                                {/* <img src={process.env.REACT_APP_BASE_URL + item.url_thumbnail} /> */}
                                <div className="card__overlay">
                                    <div className="card__infor">
                                        <div className="col">
                                            <p className="fw-700">{item.name}</p>
                                            <p className="fz-13">Nhân NT</p>
                                        </div>

                                        <div className="row a-center g-5">
                                            <img src={icons.hearts} style={{ height: 15, width: 15 }} />
                                            <p className="fz-13 ">{item.hearts}</p>
                                            <img
                                                className="ml-10"
                                                src={icons.views}
                                                style={{ height: 15, width: 15 }}
                                            />
                                            <p className="fz-13 ">{item.views}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </section>
        </main>
    );
};

export default ContentSpaceLayout;
