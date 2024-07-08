import { Fragment, useEffect } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import YouTube from "react-youtube";

const VideoModal = (props) => {
  const { isShow, toggle, type, src, onUpdating } = props; // type is 1: add, 2: edit
  const viewportWidth = window.innerWidth;
  const viewportheight = window.innerHeight;
  const _onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts = {
    height: viewportWidth * 0.4,
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  useEffect(() => {
    console.log(src);
  }, [src]);

  return (
    <Fragment>
      <Modal
        isOpen={isShow}
        toggle={() => toggle()}
        className="modal-dialog-centered modal-xl"
      >
        <ModalHeader className="bg-transparent" toggle={() => toggle()}>
          Video
        </ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          {src != undefined && (
            <YouTube videoId={src} opts={opts} height onReady={_onReady} />
          )}
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default VideoModal;
