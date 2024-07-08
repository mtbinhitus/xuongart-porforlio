import { Fragment, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";

import ImageBlank from "../../assets/images/avatars/1.png";
import Api from "../api";
import axios from "axios";

const AccountPage = () => {
  // ** States
  const [avatar, setAvatar] = useState(ImageBlank);
  const [avatarFile, setAvatarFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  const [isProcessing, setIsProcessing] = useState(false);

  // ** Hooks
  const defaultValues = {
    name: "",
    title: "",
    phone_title: "",
    phone_number: "",
    address: "",
    project_views: "",
    appreciations: "",
    followers: "",
    follwings: "",
    url_fb: "",
    url_fanpage: "",
    cty_name: "",
    mst: "",
    url_message: "",
    location: "",
  };

  const {
    control,
    setError,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: async () =>
      Api.getInfor()
        .then((res) => {
          setAvatar(import.meta.env.VITE_BASE_URL + res.data.url_avatar);

          return res.data;
        })
        .catch((err) => setAvatar(ImageBlank)),
  });

  const onChange = (e) => {
    const reader = new FileReader(),
      files = e.target.files;
    setAvatarFile(e.target.files[0]);
    reader.onload = function () {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleChangeBanner = (e) => {
    setBannerFile(e.target.files[0]);
  };

  const handleImgReset = () => {
    setAvatar(ImageBlank);
  };

  const onSubmit = async (data) => {
    setIsProcessing(true);
    if (avatarFile != null) {
      const url_avatar = await Api.uploadImage(avatarFile).then(
        (res) => res.image_path
      );
      data.url_avatar = url_avatar;
    }

    if (bannerFile != null) {
      const url_banner = await Api.uploadImage(bannerFile).then(
        (res) => res.image_path
      );
      data.url_banner = url_banner;
    }
    console.log(data);
    await Api.postInfor(data);

    setIsProcessing(false);
  };

  return (
    <div>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Account Setting</CardTitle>
        </CardHeader>

        <CardBody className="py-2 my-25">
          <div className="d-flex">
            <div className="me-25">
              <img
                className="rounded me-50"
                src={avatar}
                alt="Generic placeholder image"
                height="100"
                width="100"
              />
            </div>
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
                    onChange={onChange}
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
                <p className="mb-0">Ratio - (1:1)</p>
              </div>
            </div>
          </div>

          <Form className="mt-2 pt-50" onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col className="mb-1" md="12" sm="12">
                <Label className="form-label" for="inputFile">
                  Banner
                </Label>
                <Input
                  type="file"
                  id="inputFile"
                  name="fileInput"
                  onChange={handleChangeBanner}
                />
              </Col>
              <Col sm="6">
                <Label>Name</Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input id="name" invalid={errors.name && true} {...field} />
                  )}
                />
                {errors && errors.name && (
                  <FormFeedback>Please enter a valid</FormFeedback>
                )}
              </Col>

              <Col sm="6" className="mb-1">
                <Label>Title</Label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="title"
                      invalid={errors.title && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.title && (
                  <FormFeedback>Please enter a valid</FormFeedback>
                )}
              </Col>
              <Col sm="6" className="mb-1">
                <Label>Phone Title</Label>
                <Controller
                  name="phone_title"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="phone_title"
                      invalid={errors.phone_title && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.phone_title && (
                  <FormFeedback>Please enter a valid</FormFeedback>
                )}
              </Col>

              <Col sm="6" className="mb-1">
                <Label>Phone Number</Label>
                <Controller
                  name="phone_number"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="phone_title"
                      invalid={errors.phone_number && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.phone_number && (
                  <FormFeedback>Please enter a valid</FormFeedback>
                )}
              </Col>
              <Col sm="6" className="mb-1">
                <Label>URL Facebook</Label>
                <Controller
                  name="url_fb"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="phone_title"
                      invalid={errors.url_fb && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.url_fb && (
                  <FormFeedback>Please enter a valid</FormFeedback>
                )}
              </Col>

              <Col sm="6" className="mb-1">
                <Label>Address</Label>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="address"
                      invalid={errors.address && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.address && (
                  <FormFeedback>Please enter a valid</FormFeedback>
                )}
              </Col>
              <Col sm="3" className="mb-1">
                <Label>Project Views</Label>
                <Controller
                  name="project_views"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="project_views"
                      placeholder="0"
                      invalid={errors.project_views && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.project_views && (
                  <FormFeedback>Please enter a valid</FormFeedback>
                )}
              </Col>

              <Col sm="3" className="mb-1">
                <Label>Appreciations</Label>
                <Controller
                  name="appreciations"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      id="appreciations"
                      placeholder="0"
                      invalid={errors.appreciations && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.appreciations && (
                  <FormFeedback>Please enter a valid</FormFeedback>
                )}
              </Col>
              <Col sm="3" className="mb-1">
                <Label>Followers</Label>
                <Controller
                  name="followers"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="followers"
                      placeholder="0"
                      invalid={errors.followers && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.followers && (
                  <FormFeedback>Please enter a valid</FormFeedback>
                )}
              </Col>
              <Col sm="3" className="mb-1">
                <Label>Following</Label>
                <Controller
                  name="follwings"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="follwings"
                      type="number"
                      placeholder="0"
                      invalid={errors.follwings && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.follwings && (
                  <FormFeedback>Please enter a valid</FormFeedback>
                )}
              </Col>

              <Col sm="6" className="mb-1">
                <Label>URL Fanpage</Label>
                <Controller
                  name="url_fanpage"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="url_fanpage"
                      invalid={errors.url_fanpage && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.url_fanpage && (
                  <FormFeedback>Please enter a valid</FormFeedback>
                )}
              </Col>
              <Col sm="6" className="mb-1">
                <Label>URL Message</Label>
                <Controller
                  name="url_message"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="url_message"
                      invalid={errors.url_message && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.url_message && (
                  <FormFeedback>Please enter a valid</FormFeedback>
                )}
              </Col>

              <Col sm="6" className="mb-1">
                <Label>Tên CTY</Label>
                <Controller
                  name="cty_name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="cty_name"
                      invalid={errors.cty_name && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.cty_name && (
                  <FormFeedback>Please enter a valid</FormFeedback>
                )}
              </Col>

              <Col sm="6" className="mb-1">
                <Label>Mã số thuế</Label>
                <Controller
                  name="mst"
                  control={control}
                  render={({ field }) => (
                    <Input id="mst" invalid={errors.mst && true} {...field} />
                  )}
                />
                {errors && errors.mst && (
                  <FormFeedback>Please enter a valid</FormFeedback>
                )}
              </Col>

              <Col sm="6" className="mb-1">
                <Label>Link Google Map</Label>
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="location"
                      invalid={errors.location && true}
                      {...field}
                    />
                  )}
                />
                {errors && errors.location && (
                  <FormFeedback>Please enter a valid</FormFeedback>
                )}
              </Col>

              <Col className="mt-2" sm="12">
                {isProcessing ? (
                  <Button color="primary">
                    <Spinner color="white" size="sm" />
                    <span className="ms-50">Saving...</span>
                  </Button>
                ) : (
                  <Button type="submit" className="me-1" color="primary">
                    Save Changes
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AccountPage;
