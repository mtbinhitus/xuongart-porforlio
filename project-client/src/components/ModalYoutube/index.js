import './style.scss';
import { createPortal } from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import Api from '../../services/api';
import YouTube from 'react-youtube';
import ReactPlayer from 'react-player';
import icons from '../../assets/icons';
const ModalYoutube = (props) => {
    const { isShowing, hide, src, thumbnail } = props;
    const [playing, setPlaying] = useState(false);
    const [videoSrc, setVideoSrc] = useState();

    useEffect(() => {
        setVideoSrc(src);
    }, [src]);

    const _onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    };

    const player = useRef();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const opts = {
        height: viewportWidth > 500 ? viewportWidth * 0.4 : viewportHeight * 0.4,
        width: viewportWidth > 500 ? viewportWidth * 0.7 : viewportWidth * 0.9,
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            rel: 0,
        },
    };

    useEffect(() => {
        if (!isShowing) {
            setPlaying(false);
        }
    }, [isShowing]);

    return isShowing
        ? createPortal(
              <React.Fragment>
                  <div className="youtube-modal" aria-modal aria-hidden tabIndex={-1} role="dialog">
                      <div className="modal" style={{ height: opts.height, width: opts.width }}>
                          <YouTube
                              ref={player}
                              videoId={src}
                              opts={opts}
                              height
                              onReady={_onReady}
                              onEnd={(e) => {
                                  setPlaying(false);
                                  player.current.resetPlayer();
                              }}
                          />
                      </div>
                  </div>
              </React.Fragment>,
              document.body,
          )
        : null;
};

export default ModalYoutube;
