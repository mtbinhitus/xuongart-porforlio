import { useEffect, useRef } from "react";
import { useState } from "react";
import { Edit3, Trash2 } from "react-feather";
import { ReactSortable } from "react-sortablejs";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import AddVideoModal from "../../components/AddVideoModal";
import useAddVideoModal from "../../components/AddVideoModal/useAddVideoModal";
import EditVideoModal from "../../components/EditVideoModal";
import useEditVideoModal from "../../components/EditVideoModal/useEditVideoModal";
import VideoModal from "../../components/VideoModal";
import useVideoModal from "../../components/VideoModal/useEditVideoModal";
import Api from "../api";
const BASE_URL = "http://127.0.0.1:8000";

const VideoPage = () => {
  //** States */
  const [videos, setVideos] = useState([]);
  const [videoID, setVideoID] = useState();
  const [onUpdate, setOnUpdate] = useState(false);
  const [isShowSubmitModal, setIsShowSubmitModal] = useState(false);
  const videoSrc = useRef();

  const getVideos = async () => {
    await Api.getVideos().then((res) => {
      setVideos(res.data);
      console.log(res.data);
    });
    return videos;
  };

  useEffect(() => {
    getVideos();
  }, [onUpdate]);

  useEffect(() => {
    console.log(videoSrc.current);
  }, [videoSrc.current]);

  //** Use edit video modal */
  const { isShowAddVideoModal, toggleAddVideoModal } = useAddVideoModal();
  const { isShowEditVideoModal, toggleEditVideoModal } = useEditVideoModal();
  const { isShowVideoModal, toggleVideoModal } = useVideoModal();

  return (
    <div>
      <AddVideoModal
        isShow={isShowAddVideoModal}
        onUpdating={setOnUpdate}
        toggle={toggleAddVideoModal}
      />
      <EditVideoModal
        isShow={isShowEditVideoModal}
        onUpdating={setOnUpdate}
        id={videoID}
        toggle={toggleEditVideoModal}
      />
      <VideoModal
        isShow={isShowVideoModal}
        src={videoSrc.current}
        toggle={toggleVideoModal}
      />
      <Card>
        <CardHeader>
          <CardTitle>Video</CardTitle>

          <Row>
            <Col>
              <Button.Ripple
                color="primary"
                onClick={() => toggleAddVideoModal()}
              >
                Add
              </Button.Ripple>
            </Col>
          </Row>
        </CardHeader>
      </Card>

      <Row>
        <ReactSortable
          className="row sortable-row"
          list={videos}
          setList={setVideos}
        >
          {videos.length > 0 &&
            videos.map((item, index) => (
              <Col key={index} sm="3">
                <Card>
                  <CardBody style={{}}>
                    <div className="position-absolute end-0 top-0">
                      <Button.Ripple
                        className="btn-icon "
                        color="primary"
                        onClick={() => {
                          setVideoID(item.id);
                          toggleEditVideoModal();
                        }}
                      >
                        <Edit3 size={16} />
                      </Button.Ripple>
                    </div>

                    <img
                      onClick={() => {
                        console.log(item.src);
                        videoSrc.current = item.src;
                        toggleVideoModal();
                      }}
                      class="img-fluid w-100"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        maxHeight: "300px",
                      }}
                      src={
                        import.meta.env.VITE_BASE_URL + item.url_thumbnail ||
                        BlankImage
                      }
                      alt="card"
                    />
                  </CardBody>
                  {/* <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                  </CardHeader> */}
                </Card>
              </Col>
            ))}
        </ReactSortable>
      </Row>
    </div>
  );
};

export default VideoPage;
