import { Col, Modal, Row, Upload, message } from "antd";
import style from "./NewPost.module.scss";
import classNames from "classnames/bind";
import { Select, Space } from "antd";
import HomeIcon from "@mui/icons-material/Home";
import MyBreadCrumb from "../../components/MyBreadcrumb";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import addressAPI from "../../API/addressAPI";
import MyButton from "../../components/MyButton";
import { useSelector } from "react-redux";

const cx = classNames.bind(style);
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function NewPost() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [listProvince, setListProvince] = useState([]);
  const [listDictrict, setListDictrict] = useState([]);
  const [listWard, setListWard] = useState([]);

  const [fileList, setFileList] = useState([]);
  const [images, setImages] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [house_Number, setHouseNumber] = useState("");
  const [title, setTile] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [acreage, setAcreage] = useState(0);
  const [roomTypeId, setRoomTypeId] = useState("");

  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });

  const handlePreviewImages = async (file) => {
    setPreviewImage((file.preview = await getBase64(file.originFileObj)));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    );
  };

  const handleChangeImages = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    const data = newFileList.map((item) => {
      return item.originFileObj;
    });
    setImages(data);
  };

  const handleCancel = () => setPreviewOpen(false);

  const itemsBread = [
    {
      href: "/",
      icon: <HomeIcon></HomeIcon>,
      text: "Trang chủ",
    },
    {
      text: "Quản lý",
    },
    {
      text: "Thêm tin mới",
    },
  ];
  const getProvince = async () => {
    const response = await addressAPI.getProvince();
    setListProvince(response.data);
  };

  const handleChangeProvince = async (value, item) => {
    const response = await addressAPI.getDistrictByCode(value);
    setListDictrict(response.data.districts);
    setProvince(item.label);
  };

  const handleChangeDistricts = async (value, item) => {
    const response = await addressAPI.getWardsByCode(value);
    setListWard(response.data.wards);
    setDistrict(item.label);
  };

  const handleChangeWard = (value, item) => {
    setWard(item.label);
  };

  useEffect(() => {
    getProvince();
  }, []);

  const handleChangeRoomType = (value) => {
    setRoomTypeId(value);
  };

  return (
    <div className={cx("new-post")}>
      <MyBreadCrumb items={itemsBread}></MyBreadCrumb>
      <Row gutter={16}>
        <Col span={16}>
          <span className={cx("title")}>Đăng tin cho thuê</span>
          <div className={cx("post-input")}>
            <div className={cx("form-group")}>
              <h2>Tỉnh/thành phố</h2>
              <Space wrap>
                <Select
                  defaultValue="--Chọn Tỉnh/Tp--"
                  style={{
                    width: 200,
                  }}
                  onChange={handleChangeProvince}
                  options={listProvince.map((item) => {
                    return {
                      value: item.code,
                      label: item.name,
                    };
                  })}
                />
              </Space>
            </div>
            <div className={cx("form-group")}>
              <h2>Quận/Huyện </h2>
              <Space wrap>
                <Select
                  defaultValue="--Quận/Huyện--"
                  style={{
                    width: 200,
                  }}
                  onChange={handleChangeDistricts}
                  options={listDictrict.map((item) => {
                    return {
                      value: item.code,
                      label: item.name,
                    };
                  })}
                />
              </Space>
            </div>
            <div className={cx("form-group")}>
              <h2>Phường/Xã</h2>
              <Space wrap>
                <Select
                  defaultValue="--Phường/Xã--"
                  style={{
                    width: 280,
                  }}
                  onChange={handleChangeWard}
                  options={listWard.map((item) => {
                    return {
                      value: item.code,
                      label: item.name,
                    };
                  })}
                />
              </Space>
            </div>
          </div>
          <div className={cx("address")}>
            <h2>Số nhà</h2>
            <input
              value={house_Number}
              onChange={(e) => setHouseNumber(e.target.value)}
              type="text"
              className={cx("house-number")}
            ></input>
          </div>
          <div className={cx("full-address")}>
            <h2>Địa chỉ chính xác</h2>
            <input
              value={`${province} ${district} ${ward} ${house_Number}`}
              type="text"
              disabled
            ></input>
          </div>
          <div className={cx("detail")}>
            <h1>Thông tin mô tả</h1>
            <h2>Loại chuyên mục</h2>
            <Select
              defaultValue="--Chọn loại chuyên mục--"
              style={{
                width: 250,
              }}
              onChange={handleChangeRoomType}
              options={[
                {
                  label: "Nhà trọ, Phòng trọ",
                  value: "a9a7fcc3-dc42-11ed-8c1c-2cf05ddd2632",
                },
                {
                  label: "Nhà thuê nguyên căn",
                  value: "be8b1ba8-dc42-11ed-8c1c-2cf05ddd2632",
                },
                {
                  label: "Căn hộ",
                  options: [
                    {
                      label: "Cho thuê căn hộ",
                      value: "cf22ddec-dc42-11ed-8c1c-2cf05ddd2632",
                    },
                  ],
                },
              ]}
            />
            <div className={cx("post-title")}>
              <h2>Tiêu đề</h2>
              <input
                onChange={(e) => setTile(e.target.value)}
                type="text"
              ></input>
            </div>
            <div className={cx("post-description")}>
              <h2>Mô tả chi tiết</h2>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                className={cx("content")}
              ></textarea>
            </div>
            <div className={cx("post-contact")}>
              <h2>Thông tin liên hệ</h2>
              <input
                type="text"
                disabled
                value={currentUser?.full_Name}
              ></input>
            </div>
            <div className={cx("post-phone")}>
              <h2>Số điện thoại</h2>
              <input type="text" disabled value={currentUser?.phone}></input>
            </div>
            <div className={cx("post-price")}>
              <h2>Giá cho thuê</h2>
              <div className={cx("price-input")}>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  step={1000}
                  min={0}
                ></input>
                <input type="text" disabled value="đồng"></input>
              </div>
              <p>Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000</p>
            </div>
            <div className={cx("post-acreage")}>
              <h2>Diện tích</h2>
              <div className={cx("acreage-input")}>
                <input
                  onChange={(e) => setAcreage(e.target.value)}
                  type="number"
                  min={0}
                ></input>
                <input type="text" disabled value="m2"></input>
              </div>
            </div>
            <div className={cx("post-gender")}>
              <h2>Đối tượng cho thuê</h2>
              <Space wrap>
                <Select
                  defaultValue="--Tất cả--"
                  style={{
                    width: 415,
                  }}
                  //   onChange={handleChange}
                  options={[
                    {
                      value: "Nam",
                      label: "Nam",
                    },
                    {
                      value: "Nữ",
                      label: "Nữ",
                    },
                  ]}
                />
              </Space>
            </div>
          </div>
          <div className={cx("upload-img")}>
            <h1>Hình ảnh</h1>
            <p>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</p>
            <Upload
              multiple
              customRequest={(e) => {
                return e.onSuccess();
              }}
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreviewImages}
              onChange={handleChangeImages}
              beforeUpload={(file) => {
                const isPNG =
                  file.type === "image/png" ||
                  file.type === "image/jpeg" ||
                  file.type === "image/jpg";
                if (!isPNG) {
                  message.error(`Chỉ được phép chọn file có đuôi png/jpeg/jpg`);
                }
                return isPNG || Upload.LIST_IGNORE;
              }}
            >
              {fileList.length >= 10 ? null : (
                <div>
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </div>
              )}
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
          </div>
          <MyButton
            to={"/payment"}
            state={{
              province,
              district,
              ward,
              house_Number,
              title,
              description,
              price,
              acreage,
              status: 1,
              roomType: roomTypeId,
              images,
            }}
            classes={cx("btn-submit")}
            primary
          >
            Tiếp theo
          </MyButton>
        </Col>
        <Col span={8}>
          <div className={cx("post-note")}>
            <h3>Lưu ý đăng tin</h3>
            <ul>
              <li>Nội dung phải viết bằng tiếng Việt có dấu</li>
              <li>Tiêu đề tin không dài quá 100 kí tự</li>
              <li>
                Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng có
                hiệu quả hơn.
              </li>
              <li>
                Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn, hãy
                sửa vị trí tin rao của bạn trên bản đồ bằng cách kéo icon tới
                đúng vị trí của tin rao.
              </li>
              <li>
                Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều lần so
                với tin rao không có ảnh. Hãy đăng ảnh để được giao dịch nhanh
                chóng!
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default NewPost;
