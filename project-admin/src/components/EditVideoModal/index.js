import { useEffect, useState } from "react";
import { Fragment } from "react";
import { Check, CreditCard, X } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select"; // eslint-disable-line
import {
  Button,
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
import ImageBlank from "../../assets/images/avatars/avatar-blank.png";
import { Alert } from "reactstrap";

// ** select form **
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();
import { selectThemeColors } from "@utils";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import Api from "../../views/api";
const BASE_URL = "http://127.0.0.1:8000";

// ** Use Toast Cancel ** //
const MySwal = withReactContent(Swal);
const handleErrorToast = () => {
  return MySwal.fire({
    title: "Error!",
    text: "Thất bại!",
    icon: "error",
    customClass: {
      confirmButton: "btn btn-primary",
    },
    buttonsStyling: false,
  });
};

const handleSuccessToast = () => {
  return MySwal.fire({
    title: "Success!",
    text: "Edit video thành công.",
    icon: "success",
    customClass: {
      confirmButton: "btn btn-primary",
    },
    buttonsStyling: false,
  });
};

const handleDeleteSuccessToast = () => {
  return MySwal.fire({
    title: "Success!",
    text: "Xóa video thành công.",
    icon: "success",
    customClass: {
      confirmButton: "btn btn-primary",
    },
    buttonsStyling: false,
  });
};

const CustomLabel = ({ htmlFor }) => {
  return (
    <Label className="form-check-label" htmlFor={htmlFor}>
      <span className="switch-icon-left">
        <Check size={14} />
      </span>
      <span className="switch-icon-right">
        <X size={14} />
      </span>
    </Label>
  );
};

const EditVideoModal = (props) => {
  const { isShow, toggle, type, id, onUpdating } = props; // type is 1: add, 2: edit
  // ** Navigation
  const navigate = useNavigate();
  // ** States ** //
  const [dataVideo, setDataVideo] = useState();
  const [thumbnail, setThumbnail] = useState(ImageBlank);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [tagOptions, setTagOptions] = useState([]);
  // const [tagSelected, setTagSelected] = useState([]);
  const [saving, setSaving] = useState(false);
  const [isFormError, setIsFormError] = useState(false);
  const [checkedStatus, setCheckedStatus] = useState(true);
  const [isShowSubmitModal, setIsShowSubmitModal] = useState(false);

  //** Handle show alert form error */
  useEffect(() => {
    if (isFormError == true) {
      const timeoutId = setTimeout(() => {
        setIsFormError(false);
      }, 5000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isFormError]);

  // ** UseForm
  const {
    control,
    reset,
    setError,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: [],
  });

  useEffect(() => {
    const getVideo = async () => {
      await Api.getVideoByID(id).then((res) => setDataVideo(res.data));
    };

    getVideo();
  }, [id]);

  // ** Handle select tags ** //
  // ** Get Tags **
  useEffect(() => {
    const getTags = async () => {
      const res = await Api.getTags();
      let arr = res.data.filter((t) => t.type == 2);

      const tempArr = arr.map((item) => ({
        label: item.title,
        value: item.id,
        color: item.color,
        isFixed: false,
      }));

      setTagOptions(tempArr);

      if (dataVideo != undefined) {
        let arrTagSelected = [];
        for (let i = 0; i < dataVideo.tags.length; i++) {
          let tempTags = tempArr.find(
            (options) => options.value == dataVideo.tags[i]
          );
          arrTagSelected.push(tempTags);
        }
        setValue("tags", arrTagSelected);
      }
    };

    if (dataVideo != undefined) {
      setValue("id", dataVideo.id);
      setValue("name", dataVideo.name);
      setValue("views", dataVideo.views);
      setValue("hearts", dataVideo.hearts);
      setValue("src", dataVideo.src);
      setValue("description", dataVideo.description);

      setThumbnail(import.meta.env.VITE_BASE_URL + dataVideo.url_thumbnail);
      setCheckedStatus(dataVideo.status == 0 ? false : true);
    }

    getTags();
  }, [dataVideo]);

  //** Handle submit file */
  const onChangeFile = (e) => {
    const reader = new FileReader(),
      files = e.target.files;

    setThumbnailFile(e.target.files[0]);

    reader.onload = function () {
      setThumbnail(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleImgReset = () => {
    setAvatar(ImageBlank);
  };

  //** Handle submit form */
  const onSubmit = async (dataForm) => {
    setSaving(true);

    try {
      //** Push image to server */
      let url_thumbnail = "";
      if (thumbnailFile == null && type == 1) {
        //** Show alert push image */
      }

      if (thumbnailFile != null) {
        url_thumbnail = await Api.uploadImage(thumbnailFile).then(
          (res) => res.image_path
        );
      }

      //** Set data push */
      dataForm["url_thumbnail"] = url_thumbnail || dataVideo.url_thumbnail;
      dataForm["status"] = checkedStatus ? 1 : 0;
      dataForm.tags = dataForm.tags.map((item) => item.value);
      console.log(dataForm);
      await Api.putVideoCollection(id, dataForm)
        .then((res) => handleSuccessToast())
        .catch((error) => handleErrorToast());

      //** Close modal */
      toggle();
      // ** Refresh UI Collections **
      onUpdating();
    } catch (e) {
      setIsFormError(true);
    }
    if (type == 1) reset();
    setSaving(false);
  };

  //** Delete Collection */
  const onDelete = async () => {
    await Api.deleteVideoByID(id)
      .then((res) => handleDeleteSuccessToast())
      .catch((error) => handleErrorToast());

    setIsShowSubmitModal(false);
    toggle();
    // ** Refresh UI Collections **
    onUpdating();
  };

  return (
    <Fragment>
      <Modal
        isOpen={isShow}
        toggle={() => toggle()}
        className="modal-dialog-centered"
      >
        <ModalHeader className="bg-transparent" toggle={() => toggle()}>
          Video
        </ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col className="mb-1 d-flex" sm="12">
                <img
                  className="rounded me-50"
                  src={thumbnail}
                  alt="img"
                  height="100"
                  width="100"
                />

                <div className="d-flex align-items-end mt-75 ms-1">
                  <div>
                    <Button
                      tag={Label}
                      className="mb-75 me-75"
                      size="sm"
                      color="primary"
                    >
                      Upload
                      <Input
                        type="file"
                        onChange={onChangeFile}
                        hidden
                        accept="image/*"
                      />
                    </Button>
                    <Button
                      className="mb-75"
                      color="secondary"
                      size="sm"
                      outline
                      onClick={handleImgReset}
                    >
                      Reset
                    </Button>
                    <p className="mb-0">Ratio - (4:3)</p>
                  </div>
                </div>
              </Col>

              <Col sm="12" className="mb-1">
                <Label>Name</Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="name"
                      placeholder="Video Name"
                      invalid={errors.name && true}
                      {...field}
                    />
                  )}
                />
              </Col>
              <Col sm="12" className="mb-1">
                <Label>ID Youtube</Label>
                <Controller
                  name="src"
                  control={control}
                  render={({ field }) => (
                    <Input id="src" placeholder="ID" {...field} />
                  )}
                />
              </Col>
              <Col sm="12" className="mb-1">
                <Label>Thông tin</Label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="description"
                      placeholder="Thông tin ekip"
                      invalid={errors.name && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.name && (
                  <FormFeedback>Please enter a valid</FormFeedback>
                )}
              </Col>
              <Col sm="6" className="mb-1">
                <Label>Views</Label>
                <Controller
                  name="views"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <Input
                      id="views"
                      type="number"
                      placeholder="0"
                      {...field}
                    />
                  )}
                />
              </Col>
              <Col sm="6" className="mb-1">
                <Label>Hearts</Label>
                <Controller
                  name="hearts"
                  defaultValue={0}
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="hearts"
                      type="number"
                      placeholder="0"
                      {...field}
                    />
                  )}
                />
              </Col>

              <Col className="mb-1" sm="12">
                <Label>Tags</Label>
                <Controller
                  name="tags"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <Select
                      id="tags"
                      isClearable={false}
                      theme={selectThemeColors}
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      // defaultValue={tagSelected}
                      isMulti
                      options={tagOptions}
                      className="react-select"
                      classNamePrefix="select"
                      {...field}
                    />
                  )}
                />
              </Col>

              <Col>
                <div className="d-flex flex-column">
                  <Label>Status</Label>
                  <div className="form-switch form-check-primary">
                    <Input
                      type="switch"
                      defaultChecked={checkedStatus}
                      id="icon-primary"
                      name="icon-primary"
                      onChange={(e) => setCheckedStatus(e.target.checked)}
                    />
                    <CustomLabel htmlFor="icon-primary" />
                  </div>
                </div>
              </Col>

              <Col sm="12" hidden={!isFormError}>
                <Alert color="danger">
                  <div className="alert-body">
                    <span className="fw-bold">Oh no!</span>
                    <span> Vui lòng điền đủ thông tin.</span>
                  </div>
                </Alert>
              </Col>

              <Col sm="12" className="mt-2">
                <Button.Ripple color="primary" type="submit">
                  {saving ? (
                    <div className="d-flex">
                      <Spinner color="light" size="sm" />
                      <span className="ms-50">Saving...</span>
                    </div>
                  ) : (
                    "Submit"
                  )}
                </Button.Ripple>

                <Button.Ripple className="mx-1" onClick={toggle}>
                  Cancel
                </Button.Ripple>

                <Button.Ripple
                  color="danger"
                  onClick={() => {
                    setIsShowSubmitModal(true);
                  }}
                >
                  Delete
                </Button.Ripple>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>

      <Modal
        isOpen={isShowSubmitModal}
        toggle={() => setIsShowSubmitModal(false)}
        className="modal-dialog-centered"
        modalClassName="modal-danger"
      >
        <ModalHeader toggle={() => setIsShowSubmitModal(false)}>
          !! Danger !!
        </ModalHeader>
        <ModalBody>Bạn có chắc chắn muốn xóa đi video này?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => onDelete()}>
            Accept
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default EditVideoModal;
