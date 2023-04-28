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
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

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
  const [roomTypeId, setRoomTypeId] = useState("");
  const [object, setObject] = useState("Tất cả");

  const navigate = useNavigate();

  const location = useLocation();
  const data = location.state;
  const categoryRooms = useSelector((state) => {
    return state.category.categoryRooms;
  });

  const optionsCateRooms = categoryRooms.map((item) => {
    return {
      label: item.name,
      value: item.ID,
    };
  });

  const formik = useFormik({
    initialValues: {
      house_Number: "",
      title: "",
      description: "",
      price: "",
      acreage: "",
    },
    validationSchema: Yup.object({
      house_Number: Yup.string()
        .min(5, "Địa chỉ không hợp lệ")
        .required("Vui lòng nhập thông tin này!"),
      title: Yup.string()
        .min(10, "Tiêu đề tối thiểu 10 ký tự")
        .required("Vui lòng nhập thông tin này!"),
      description: Yup.string()
        .min(30, "Mô tả tối thiểu 30 ký tự")
        .required("Vui lòng nhập thông tin này!"),
      price: Yup.string()
        .required("Vui lòng nhập thông tin này!")
        .max(12, "Số tiền quá lớn hoặc không hợp lệ"),
      acreage: Yup.string()
        .required("Vui lòng nhập thông tin này!")
        .max(4, "Diện tích quá lớn hoặc không hợp lệ"),
    }),
    onSubmit: async (values) => {
      if (!province) {
        return message.error("Vui lòng chọn Tỉnh/Thành phố");
      } else if (!district) {
        return message.error("Vui lòng chọn Quận/Huyện");
      } else if (!ward) {
        return message.error("Vui lòng chọn Phường/Xã");
      } else if (!roomTypeId) {
        return message.error("Vui lòng chọn loại bất động sản");
      } else if (images.length === 0) {
        return message.error("Vui lòng chọn ít nhất 1 ảnh");
      }
      navigate("/payment", {
        state: {
          province,
          district,
          ward,
          house_Number: values.house_Number,
          title: values.title,
          description: values.description,
          price: values.price,
          acreage: values.acreage,
          roomType: roomTypeId,
          images,
          object,
        },
      });
    },
  });

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
      href: "/manage-post",
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
    setProvince(item);
  };

  const handleChangeDistricts = async (value, item) => {
    const response = await addressAPI.getWardsByCode(value);
    setListWard(response.data.wards);
    setDistrict(item);
  };

  const handleChangeWard = (value, item) => {
    setWard(item);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getProvince();
    if (data) {
      formik.values.house_Number = data.house_Number;
      formik.values.title = data.title;
      formik.values.description = data.description;
      formik.values.price = data.price;
      formik.values.acreage = data.acreage;
      setRoomTypeId(data.roomType);
      const Init = async () => {
        const response = await addressAPI.getDistrictByCode(
          data.province.value,
        );
        const response1 = await addressAPI.getWardsByCode(data.district.value);
        setListDictrict(response.data.districts);
        setListWard(response1.data.wards);
        setProvince(data.province);
        setDistrict(data.district);
        setWard(data.ward);
        setObject(data.object);
      };
      Init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  defaultValue={data ? data.province.value : "--Chọn Tỉnh/Tp--"}
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
                  defaultValue={data ? data.district.value : "--Quận/Huyện--"}
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
                  defaultValue={data ? data.ward.value : "--Phường/Xã--"}
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
              value={formik.values.house_Number}
              name="house_Number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              className={cx("house-number")}
            ></input>

            {formik.errors.house_Number && formik.touched.house_Number && (
              <p className={cx("error-message")}>
                {formik.errors.house_Number}
              </p>
            )}
          </div>
          <div className={cx("full-address")}>
            <h2>Địa chỉ chính xác</h2>
            <input
              value={`${province.label || ""} ${district.label || ""} ${
                ward.label || ""
              } ${formik.values.house_Number}`}
              type="text"
              disabled
            ></input>
          </div>
          <div className={cx("detail")}>
            <h1>Thông tin mô tả</h1>
            <h2>Loại chuyên mục</h2>
            <Select
              defaultValue={data ? data.roomType : "--Chọn loại chuyên mục--"}
              style={{
                width: 250,
              }}
              onChange={handleChangeRoomType}
              options={optionsCateRooms}
            />
            <div className={cx("post-title")}>
              <h2>Tiêu đề</h2>
              <input
                value={formik.values.title}
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
              ></input>
              {formik.errors.title && formik.touched.title && (
                <p className={cx("error-message")}>{formik.errors.title}</p>
              )}
            </div>
            <div className={cx("post-description")}>
              <h2>Mô tả chi tiết</h2>
              <textarea
                value={formik.values.description}
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={cx("content")}
              ></textarea>
              {formik.errors.description && formik.touched.description && (
                <p className={cx("error-message")}>
                  {formik.errors.description}
                </p>
              )}
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
                  value={formik.values.price}
                  name="price"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="number"
                  step={100000}
                  min={0}
                ></input>
                <input type="text" disabled value="đồng"></input>
              </div>
              <p>Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000</p>
              {formik.errors.price && formik.touched.price && (
                <p className={cx("error-message")}>{formik.errors.price}</p>
              )}
            </div>

            <div className={cx("post-acreage")}>
              <h2>Diện tích</h2>
              <div className={cx("acreage-input")}>
                <input
                  value={formik.values.acreage}
                  name="acreage"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="number"
                  min={0}
                ></input>
                <input type="text" disabled value="m2"></input>
              </div>
              {formik.errors.acreage && formik.touched.acreage && (
                <p className={cx("error-message")}>{formik.errors.acreage}</p>
              )}
            </div>
            <div className={cx("post-gender")}>
              <h2>Đối tượng cho thuê</h2>
              <Space wrap>
                <Select
                  onChange={(value) => setObject(value)}
                  defaultValue={data ? data.object : "Tất cả"}
                  style={{
                    width: 415,
                  }}
                  options={[
                    {
                      value: "Tất cả",
                      label: "Tất cả",
                    },
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
                    Tải lên hình ảnh
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
            onClick={formik.handleSubmit}
            classes={cx("btn-submit")}
            // disible={
            //   Object.keys(formik.errors).length !== 0 ||
            //   images.length === 0 ||
            //   !province ||
            //   !district ||
            //   !ward ||
            //   !roomTypeId
            // }
            primarydisible={
              Object.keys(formik.errors).length !== 0 ||
              images.length === 0 ||
              !province ||
              !district ||
              !ward ||
              !roomTypeId
            }
            primary={
              Object.keys(formik.errors).length === 0 &&
              images.length > 0 &&
              province &&
              district &&
              ward &&
              roomTypeId
            }
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
