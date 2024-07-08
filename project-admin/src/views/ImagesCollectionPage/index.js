import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";
import Api from "../api";
import BlankImage from "../../assets/images/avatars/avatar-blank.png";
const BASE_URL = "http://127.0.0.1:8000";
import Breadcrumbs from "@components/breadcrumbs";
import { Inbox, Trash2 } from "react-feather";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import useEditCollectionModal from "../../components/EditCollectionModal/useEditCollectionModal";
import EditCollectionModal from "../../components/EditCollectionModal";
import { ReactSortable } from "react-sortablejs";

// ** Use Toast Cancel ** //
const MySwal = withReactContent(Swal);
const handleErrorToast = (text) => {
  return MySwal.fire({
    title: "Error!",
    text: text,
    icon: "error",
    customClass: {
      confirmButton: "btn btn-primary",
    },
    buttonsStyling: false,
  });
};

const handleSuccessToast = (text) => {
  return MySwal.fire({
    title: "Success!",
    text: text,
    icon: "success",
    customClass: {
      confirmButton: "btn btn-primary",
    },
    buttonsStyling: false,
  });
};

const CollectionDetail = (props) => {
  const params = useParams();

  // ** States **
  const [images, setImages] = useState([]);
  const [srcFile, setSrcFile] = useState(null);
  const [collectionID, setCollectionID] = useState(params.id);
  const [collection, setCollection] = useState({});
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isShowSubmitModal, setIsShowSubmitModal] = useState(false);
  const [imageID, setImageID] = useState();

  const { isShow, toggle } = useEditCollectionModal();

  // ** Loading **
  useEffect(() => {
    const getImage = async () => {
      const images = await Api.getImage(collectionID).then((res) => res.data);
      let tempArr = images.sort((a, b) => a.index - b.index);
      setImages(tempArr);
    };

    getImage();
  }, [saving]);

  // ** Handle change file **
  const handleFile = (e) => {
    setSrcFile(e.target.files);
  };

  // ** Handle Submit **
  const handleSubmit = async () => {
    setSaving(true);
    for (let i = 0; i < srcFile.length; i++) {
      let src = "null";
      if (srcFile[i] != null) {
        src = await Api.uploadImage(srcFile[i]).then((res) => res.image_path);
      }
      const data = {
        id_collection: params.id,
        src: src,
      };
      await Api.postImage(data);
    }

    setAdding(false);
    setSaving(false);
  };

  //** Get Collection Data */
  useEffect(() => {
    const getData = async () => {
      await Api.getCollectionByID(params.id).then((res) => {
        setCollection(res.data);
      });
    };

    getData();
  }, []);

  const onDeleteImage = async () => {
    setSaving(true);
    await Api.deleteImageByID(imageID)
      .then((res) => {
        handleSuccessToast("Xóa ảnh thành công");
      })
      .catch((err) => handleErrorToast("Xóa ảnh không thành công"));

    setIsShowSubmitModal(false);
    setSaving(false);
  };

  const submitSort = async () => {
    let tempArr = [...images];
    images.forEach((item, index) => {
      tempArr[index].index = index;
    });

    await Api.sortImage(tempArr)
      .then((res) => {
        handleSuccessToast("Sort thành công!");
      })
      .catch((err) => {
        handleErrorToast("Sort không thành công!");
      });
  };

  return (
    <div>
      <Breadcrumb className="breadcrumb-slash mb-2">
        <BreadcrumbItem>
          <Link to="/collection-page"> Collection </Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <span> Collection Detail </span>
        </BreadcrumbItem>
      </Breadcrumb>

      <Card>
        <CardHeader className="justify-content-end">
          <div>
            {adding ? (
              <>
                <Button.Ripple
                  color="primary"
                  className="me-1"
                  onClick={handleSubmit}
                >
                  {saving ? (
                    <div>
                      <Spinner color="white" size="sm" />
                      <span className="ms-50">Saving...</span>
                    </div>
                  ) : (
                    "Submit"
                  )}
                </Button.Ripple>
                <Button.Ripple onClick={() => setAdding(false)}>
                  Cancel
                </Button.Ripple>
              </>
            ) : (
              <>
                <Button.Ripple color="primary" onClick={() => setAdding(true)}>
                  Add Image
                </Button.Ripple>
                <Button.Ripple
                  className="mx-1"
                  color="primary"
                  onClick={() => toggle()}
                >
                  Edit
                </Button.Ripple>

                <Button.Ripple
                  color="primary"
                  onClick={() => {
                    submitSort();
                  }}
                >
                  Sort
                </Button.Ripple>
              </>
            )}
          </div>

          <EditCollectionModal
            isShow={isShow}
            toggle={toggle}
            data={collection}
            type={2}
          />
        </CardHeader>
        {adding && (
          <CardBody>
            <Row>
              <Col className="mb-1">
                <Label className="form-label">Image</Label>
                <Input
                  type="file"
                  id="inputFile"
                  name="fileInput"
                  multiple
                  onChange={handleFile}
                />
              </Col>
            </Row>
          </CardBody>
        )}
      </Card>

      <Row>
        <ReactSortable
          className="row sortable-row"
          list={images}
          setList={setImages}
          onEnd={(e) => {}}
        >
          {images.length > 0 &&
            images.map((item, index) => (
              <Col sm="3" onClick={() => navigateDetail(item.id)}>
                <Card>
                  <CardBody>
                    <Button.Ripple
                      className="btn-icon position-absolute end-0 top-0"
                      color="danger"
                      onClick={() => {
                        setImageID(item.id);
                        setIsShowSubmitModal(true);
                      }}
                    >
                      <Trash2 size={16} />
                    </Button.Ripple>
                    <img
                      class="img-fluid w-100"
                      style={{ objectFit: "cover" }}
                      src={
                        import.meta.env.VITE_BASE_URL + item.src || BlankImage
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

      <Modal
        isOpen={isShowSubmitModal}
        toggle={() => setIsShowSubmitModal(false)}
        className="modal-dialog-centered"
        modalClassName="modal-danger"
      >
        <ModalHeader toggle={() => setIsShowSubmitModal(false)}>
          !! Danger !!
        </ModalHeader>
        <ModalBody>Bạn có chắc chắn muốn xóa đi ảnh này?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => onDeleteImage()}>
            Accept
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CollectionDetail;
