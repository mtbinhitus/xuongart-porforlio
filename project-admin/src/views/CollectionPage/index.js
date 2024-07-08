import { useEffect, useState } from "react";
import { ArrowLeft } from "react-feather";
import { useNavigate } from "react-router-dom";
import { ReactSortable } from "react-sortablejs";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import BlankImage from "../../assets/images/avatars/avatar-blank.png";
import EditCollectionModal from "../../components/EditCollectionModal";
import useEditCollectionModal from "../../components/EditCollectionModal/useEditCollectionModal";
import Api from "../api";

const BASE_URL = "http://127.0.0.1:8000";

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

const CollectionPage = () => {
  // ** Navigation
  const navigate = useNavigate();

  //** Use Add Modal */
  const { isShow, toggle } = useEditCollectionModal();

  // ** States
  const [collections, setCollections] = useState([]);
  const [collectionSort, setCollectionSort] = useState([]);
  const [onUpdate, setOnUpdate] = useState(false);

  // ** Get data collections from api
  useEffect(() => {
    getDataCollection();
  }, [onUpdate]);

  const getDataCollection = async () => {
    const res = await Api.getCollections();
    if (res.data.length > 0) {
      const arr = res.data
        .filter((item) => item.type == 1)
        .sort((a, b) => {
          if (a.index < b.index) {
            return -1;
          }

          return 1;
        });
      setCollections(arr);
    }
  };

  const handleRefreshUI = () => {
    setOnUpdate(!onUpdate);
  };

  const navigateDetail = (id) => {
    navigate("/collection-detail/" + id);
  };

  // ** Xử lý kéo thả sắp xếp ảnh ** //
  const handleSort = (e) => {};

  const submitSort = async () => {
    let tempArr = [...collectionSort];
    collectionSort.forEach((item, index) => {
      tempArr[index].index = index;
    });

    await Api.sortCollection(tempArr)
      .then((res) => {
        handleSuccessToast("Sort collection thành công!");
      })
      .catch((err) => {
        handleErrorToast("Sort collection không thành công!");
      });
  };

  useEffect(() => {
    setCollectionSort(collections);
  }, [collections]);

  return (
    <div>
      <Card>
        <EditCollectionModal
          isShow={isShow}
          toggle={toggle}
          onUpdating={setOnUpdate}
          type={1}
        />
        <CardHeader>
          <CardTitle>Collection</CardTitle>

          <Row>
            <Col>
              <Button.Ripple color="primary" onClick={() => toggle()}>
                Add
              </Button.Ripple>
            </Col>
            <Col>
              <Button.Ripple color="primary" onClick={() => submitSort()}>
                Sort
              </Button.Ripple>
            </Col>
          </Row>
        </CardHeader>
      </Card>
      <Row>
        <ReactSortable
          className="row sortable-row"
          list={collections}
          setList={setCollections}
          onEnd={(e) => handleSort(e)}
        >
          {collections.length > 0 &&
            collections.map((item, index) => (
              <Col key={index} sm="3" onClick={() => navigateDetail(item.id)}>
                <Card>
                  <CardBody style={{}}>
                    <img
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

export default CollectionPage;
