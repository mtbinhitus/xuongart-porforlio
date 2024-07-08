import YouTube from 'react-youtube';
import './style.scss';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Api from '../../services/api';
import icons from '../../assets/icons';
import ReactPlayer from 'react-player';
import { createPortal } from 'react-dom';

const VideoPlayer = (props) => {
    // const params = useParams();
    // const navigate = useNavigate();

    const { isShowing, hide, collectionID, url_avatar } = props;

    //** State */
    const [collection, setCollection] = useState({});
    const [src, setSrc] = useState();

    useEffect(() => {
        console.log('🚀 ~ file: index.js:22 ~ useEffect ~ collectionID:', collectionID);
        const getData = async () => {
            const res = await Api.getCollectionByID(collectionID);
            console.log('🚀 ~ file: index.js:24 ~ getData ~ res:', res);

            if (res.data.description != undefined) {
                let str = res.data.description.split('\\n');
                res.data['descriptions'] = str;
            }
            setCollection(res.data);

            const videos = await Api.getImages(collectionID);

            if (videos.data.length > 0) {
                setSrc(videos.data[0].src);
            }
        };
        if (isShowing) getData();
    }, [isShowing]);

    const _onReady = (event) => {
        event.target.pauseVideo();
    };

    const opts = {
        playerVars: {
            autoplay: 0,
            rel: 0,
        },
    };

    return isShowing
        ? createPortal(
              <React.Fragment>
                  <div className="detail-video-modal">
                      <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
                          <div className="video-player-page">
                              <div className="header">
                                  <div
                                      className="btn_close"
                                      onClick={() => {
                                          hide();
                                      }}
                                  >
                                      <img src={icons.close} />
                                  </div>
                              </div>
                              <div className="video-wrapper">
                                  <div className="video-div">
                                      <ReactPlayer
                                          url={`https://www.youtube.com/embed/${src}`}
                                          config={opts}
                                          height={'100%'}
                                          width={'100%'}
                                          controls
                                      />
                                  </div>
                                  {/* <YoutubeEmbed embedId={src} /> */}

                                  <div className="infor-wrapper">
                                      <p className="fz-40 fw-700 color-white">{collection.name || 'XUONGART'}</p>
                                      {collection.descriptions != undefined &&
                                          collection.descriptions.map((item) => (
                                              <p className="fz-16 color-white mt-30">{item || ''}</p>
                                          ))}
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </React.Fragment>,
              document.body,
          )
        : null;
};

export default VideoPlayer;
