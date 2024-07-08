import { useEffect } from "react";
import { useState } from "react";
import { Edit, MoreVertical, Trash } from "react-feather";
import { Link } from "react-router-dom";
import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Row,
  Table,
  UncontrolledDropdown,
} from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Api from "../api";

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

const TagPage = () => {
  //** States */
  const [tags, setTags] = useState([]);
  const [tagName, setTagName] = useState("");
  const [checkType, setCheckType] = useState(true);

  //** Get Tags */
  useEffect(() => {
    getTags();
  }, []);

  const getTags = async (tags) => {
    const res = await Api.getTags();
    console.log(res.data);
    setTags(res.data);
  };

  //** Add Tag */
  const addTags = async (tags) => {
    await Api.addTags({ title: tagName, type: checkType ? 1 : 2 })
      .then((res) => {
        handleSuccessToast("Thêm tag thành công!");
        getTags();
      })
      .catch((err) => {
        handleErrorToast("Thêm tag không thành công!");
      });
    setTagName("");
  };

  //** Delete Tag */
  const handleDeleteTag = (id) => {
    Api.deleteTagByID(id)
      .then((res) => {
        handleSuccessToast("Xóa tag thành công!");
        getTags();
      })
      .catch((err) => {
        handleErrorToast("Xóa tag không thành công!");
      });
  };

  return (
    <div>
      <Breadcrumb className="breadcrumb-slash mb-2">
        <BreadcrumbItem>
          <Link to="/"> Home </Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <span>Tags </span>
        </BreadcrumbItem>
      </Breadcrumb>

      <Card>
        <CardHeader className="justify-content-between">
          <Row>
            <Col>
              <Label>Tags name</Label>
              <Input
                value={tagName}
                onChange={(e) => {
                  setTagName(e.target.value);
                }}
              ></Input>
            </Col>
            <Col className="d-flex align-items-center justify-content-center">
              <div className="form-check form-check-inline">
                <Input
                  type="checkbox"
                  id="basic-cb-checked"
                  checked={checkType}
                  onChange={(e) => {
                    setCheckType(true);
                  }}
                />
                <Label for="basic-cb-checked" className="form-check-label">
                  Photo
                </Label>
              </div>
              <div className="form-check form-check-inline">
                <Input
                  type="checkbox"
                  id="basic-cb-checked"
                  checked={!checkType}
                  onChange={(e) => {
                    setCheckType(false);
                  }}
                />
                <Label for="basic-cb-checked" className="form-check-label">
                  Video
                </Label>
              </div>
            </Col>
          </Row>
          <Button.Ripple
            color="primary"
            onClick={() => {
              addTags();
            }}
          >
            Add
          </Button.Ripple>
        </CardHeader>
        <CardBody>
          <Table bordered responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tag Name</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {tags.length > 0 &&
                tags.map((item, index) => (
                  <tr>
                    <td>
                      <span className="align-middle fw-bold">{item.id}</span>
                    </td>
                    <td>{item.title}</td>
                    <td>
                      {item.type == 1 ? (
                        <Badge pill color="light-primary" className="me-1">
                          Photo
                        </Badge>
                      ) : (
                        <Badge pill color="success" className="me-1">
                          Video
                        </Badge>
                      )}
                    </td>
                    <td>
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="icon-btn hide-arrow"
                          color="transparent"
                          size="sm"
                          caret
                        >
                          <MoreVertical size={15} />
                        </DropdownToggle>
                        <DropdownMenu>
                          {/* <DropdownItem
                            href="/"
                            onClick={(e) => e.preventDefault()}
                          >
                            <Edit className="me-50" size={15} />{" "}
                            <span className="align-middle">Edit</span>
                          </DropdownItem> */}
                          <DropdownItem
                            href="/"
                            onClick={(e) => {
                              e.preventDefault();
                              handleDeleteTag(item.id);
                            }}
                          >
                            <Trash className="me-50" size={15} />
                            <span className="align-middle">Delete</span>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default TagPage;
