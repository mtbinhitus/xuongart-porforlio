import './style.scss';
import { createPortal } from 'react-dom';
import React, { useEffect, useState } from 'react';
import images from '../../assets/images';
import Api from '../../services/api';
import icons from '../../assets/icons';
import ImageBlank from '../../assets/images/image_demo.webp';

const CollectionDetail = (props) => {
    const { isShowing, hide, collectionID, url_avatar } = props;
    const [showLoading, setShowLoading] = useState(true);

    // ** States **
    const [images, setImages] = useState([]);
    const [collection, setCollection] = useState({});
    const [infor, setInfor] = useState({});

    const [showDetail, setShowDetail] = useState(false);
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        if (!isShowing) setShowLoading(true);
        else {
            const timer = setTimeout(() => {
                setShowLoading(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [isShowing]);

    // ** Get Infor ** //
    useEffect(() => {
        const getInfor = async () => {
            const res = await Api.getInfor().then((res) => res.data);
            setInfor(res);
        };
        getInfor();
    }, []);

    const onHide = () => {
        if (showDetail) setShowDetail(false);
        else hide();
    };

    const formatDateShow = (date) => {
        var d = new Date(date);

        var formattedDate = d.toLocaleString();

        return formattedDate.slice(0, 9);
    };

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setShowLoading(false);
    //     }, 5000);

    //     return () => clearTimeout(timer);
    // }, []);

    // ** Get Image **
    useEffect(() => {
        if (isShowing == false) {
            setImages([]);
        } else {
            const get = async () => {
                const res = await Api.getImages(collectionID);
                let tempArray = res.data.sort((a, b) => a.index - b.index);
                setImages(tempArray);
            };

            const getCollection = async () => {
                const res = await Api.getCollectionByID(collectionID);
                if (res.data.description != undefined) {
                    console.log(res.data.description);
                    let str = res.data.description.split('\\n');
                    console.log(str);
                    res.data['descriptions'] = str;
                }
                setCollection(res.data);
            };

            getCollection();
            get();
        }
    }, [isShowing]);

    return isShowing
        ? createPortal(
              <React.Fragment>
                  <div className="detail-modal">
                      <div
                          className="modal-overlay"
                          onClick={() => {
                              onHide();
                          }}
                      />
                      <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
                          <div className="modal">
                              <div className="modal__header row g-20">
                                  <img
                                      src={process.env.REACT_APP_BASE_URL + infor.url_avatar || ImageBlank}
                                      alt="logo"
                                  />
                                  <div className="col title">
                                      <div className="row a-center">
                                          <p className="fw-700">{collection.name || 'Collection Name'}</p>
                                          {/* <p className="mx-10">||</p> */}
                                          {/* <p className="fw-700 fz-14">{infor.name || 'Nhân NT'}</p> */}
                                      </div>
                                      {collection.descriptions != undefined &&
                                          collection.descriptions.map((item) => (
                                              <p className="fw-700 fz-12  mt-2 description">{item || ''}</p>
                                          ))}
                                  </div>

                                  <div className="btn__close" onClick={onHide}>
                                      <img src={icons.close} style={{ height: 20, width: 20 }} />
                                  </div>
                              </div>
                              {showDetail ? (
                                  <div className="image-show">
                                      <img src={imageSrc} alt="image" />
                                  </div>
                              ) : (
                                  <div className="body-image">
                                      {images.length > 0 &&
                                          images.map((item, index) => (
                                              <div>
                                                  <img
                                                      className="image-s mb-50"
                                                      src={process.env.REACT_APP_BASE_URL + item.src}
                                                      alt="image"
                                                      key={index}
                                                      onClick={() => {
                                                          setImageSrc(process.env.REACT_APP_BASE_URL + item.src);
                                                          setShowDetail(true);
                                                      }}
                                                  />
                                              </div>
                                          ))}

                                      {showLoading && <div className="image--load"></div>}

                                      <div className="image-footer">
                                          <img
                                              className="logo"
                                              src={
                                                  process.env.REACT_APP_BASE_URL + collection.url_thumbnail ||
                                                  ImageBlank
                                              }
                                              alt="logo"
                                          />

                                          <p className="fz-25 fw-700 color-white">{collection.name}</p>

                                          <div className="row a-center g-5">
                                              <img src={icons.hearts} style={{ height: 15, width: 15 }} />
                                              <p className="fz-13 color-white">{collection.hearts}</p>
                                              <img
                                                  className="ml-10"
                                                  src={icons.views}
                                                  style={{ height: 15, width: 15 }}
                                              />
                                              <p className="fz-13 color-white">{collection.views}</p>
                                          </div>

                                          <p className="fz-12 fw-400 color-gray">
                                              Published: {formatDateShow(collection.updated_at)}
                                          </p>
                                      </div>
                                  </div>
                              )}
                          </div>
                      </div>
                  </div>
              </React.Fragment>,
              document.body,
          )
        : null;
};

export default CollectionDetail;
