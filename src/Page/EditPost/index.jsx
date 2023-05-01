import { Col, Popconfirm, Row, Upload, message } from "antd";
import style from "./EditPost.module.scss";
import classNames from "classnames/bind";
import { Select, Space } from "antd";
import HomeIcon from "@mui/icons-material/Home";
import MyBreadCrumb from "../../components/MyBreadcrumb";
import { useEffect, useState } from "react";
import addressAPI from "../../API/addressAPI";
import MyButton from "../../components/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSearchParams } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import NewsAPI from "../../API/newsAPI";
import { PlusOutlined } from "@ant-design/icons";
import { loadingEnd, loadingStart } from "../../Redux/loadingSlice";

const cx = classNames.bind(style);

function EditPost() {
  const [listProvince, setListProvince] = useState([]);
  const [listDictrict, setListDictrict] = useState([]);
  const [listWard, setListWard] = useState([]);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [roomTypeId, setRoomTypeId] = useState("");
  const [object, setObject] = useState("Tất cả");

  const categoryRooms = useSelector((state) => {
    return state.category.categoryRooms;
  });

  const optionsCateRooms = categoryRooms.map((item) => {
    return {
      label: item.name,
      value: item.ID,
    };
  });

  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });

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
      text: "Chỉnh sửa tin",
    },
  ];
  const getProvince = async () => {
    const response = await addressAPI.getProvince();
    setListProvince(response.data);
  };

  const handleChangeProvince = async (value, item) => {
    const response = await addressAPI.getDistrictByCode(item.value);
    setListDictrict(response.data.districts);
    setProvince({
      code: item.value,
      name: item.children,
    });
  };

  const handleChangeDistricts = async (value, item) => {
    const response = await addressAPI.getWardsByCode(item.value);
    setListWard(response.data.wards);
    setDistrict({
      code: item.value,
      name: item.children,
    });
  };

  const handleChangeWard = (value, item) => {
    setWard({
      code: item.value,
      name: item.children,
    });
  };
  const getNews = async () => {
    dispatch(loadingStart());
    const response = await NewsAPI.getDetailNewsById(newsId);
    formik.values.house_Number = response.data.data.house_Number;
    formik.values.title = response.data.data.title;
    formik.values.description = response.data.data.description;
    formik.values.price = response.data.data.price;
    formik.values.acreage = response.data.data.acreage;
    setObject(response.data.data.object);
    setRoomTypeId(response.data.data.category_Rooms_Id);
    setProvince(response.data.data.province);
    setDistrict(response.data.data.district);
    setWard(response.data.data.ward);
    setOldImages(response.data.data.images);
    const response0 = await addressAPI.getDistrictByCode(
      response.data.data.province.code,
    );
    const response1 = await addressAPI.getWardsByCode(
      response.data.data.district.code,
    );
    setListDictrict(response0.data.districts);
    setListWard(response1.data.wards);
    dispatch(loadingEnd());
  };

  const [searrchParams] = useSearchParams();
  const newsId = searrchParams.get("newsId");

  useEffect(() => {
    window.scrollTo(0, 0);
    getProvince();
    getNews();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      const formData = new FormData();
      formData.append("province", `${province.code},${province.name}`);
      formData.append("district", `${district.code},${district.name}`);
      formData.append("ward", `${ward.code},${ward.name}`);
      formData.append("house_Number", values.house_Number);
      for (let item of images) {
        formData.append("images", item.originFileObj);
      }
      formData.append("roomType", roomTypeId);
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("acreage", values.acreage);
      formData.append("object", object);
      formData.append("newsId", newsId);

      try {
        const updateNews = async () => {
          dispatch(loadingStart());
          const response = await NewsAPI.editNews(
            formData,
            currentUser.access_Token,
          );
          const jsonData = await response.json();
          if (response.status === 200) {
            getNews();
            setImages([]);
            dispatch(loadingEnd());
            message.success(jsonData.message);
          } else {
            dispatch(loadingEnd());
            message.error(jsonData.message);
          }
        };
        updateNews();
      } catch (error) {
        dispatch(loadingEnd());
        message.error("Không thể kết nối đến Server!", 2);
      }
    },
  });

  const uploadButton = (
    <div>
      {<PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Thêm ảnh
      </div>
    </div>
  );
  const dispatch = useDispatch();

  return (
    <div className={cx("new-post")}>
      <MyBreadCrumb items={itemsBread}></MyBreadCrumb>
      <Row>
        <Col span={18}>
          <h1 className={cx("title")}>
            Chỉnh sửa bài đăng (Mã tin: {newsId.split("-")[0]})
          </h1>
          <div className={cx("post-input")}>
            <div className={cx("form-group")}>
              <h2>Tỉnh/thành phố</h2>
              <Space wrap>
                <Select
                  style={{
                    width: 240,
                  }}
                  onChange={handleChangeProvince}
                  value={province?.name}
                >
                  {listProvince.map((item) => {
                    return (
                      <Select.Option key={item.code} value={item.code}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Space>
            </div>
            <div className={cx("form-group")}>
              <h2>Quận/Huyện </h2>
              <Space wrap>
                <Select
                  style={{
                    width: 240,
                  }}
                  onChange={handleChangeDistricts}
                  value={district?.name}
                >
                  {listDictrict.map((item) => {
                    return (
                      <Select.Option key={item.code} value={item.code}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Space>
            </div>
            <div className={cx("form-group")}>
              <h2>Phường/Xã</h2>
              <Space wrap>
                <Select
                  style={{
                    width: 240,
                  }}
                  onChange={handleChangeWard}
                  value={ward?.name}
                >
                  {listWard.map((item) => {
                    return (
                      <Select.Option key={item.code} value={item.code}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
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
              value={`${province?.name || ""} ${district?.name || ""} ${
                ward?.name || ""
              } ${formik.values.house_Number}`}
              type="text"
              disabled
            ></input>
          </div>
          <div className={cx("detail")}>
            <h1>Thông tin mô tả</h1>
            <h2>Loại chuyên mục</h2>
            <Select
              value={roomTypeId}
              style={{
                width: 250,
              }}
              disabled
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
                  value={object}
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
            <p>Chọn hình ảnh mới</p>
            <div className={cx("list-image")}>
              <div className={cx("list-preview")}>
                {oldImages.length > 0
                  ? oldImages.map((item, index) => {
                      return (
                        <div key={index} className={cx("preview-image")}>
                          <img src={item.image_URL} alt=""></img>
                          <Popconfirm
                            title="Bạn có chắc muốn xóa ảnh này?"
                            onConfirm={() => {
                              const deleteImage = async () => {
                                try {
                                  dispatch(loadingStart());
                                  const response = await NewsAPI.deleteImage(
                                    {
                                      imageId: item.ID,
                                      image_URL: item.image_URL,
                                    },
                                    currentUser.access_Token,
                                  );
                                  if (response.status === 200) {
                                    oldImages.splice(index, 1);
                                    const newsOldImages = [...oldImages];
                                    setOldImages(newsOldImages);
                                    dispatch(loadingEnd());
                                    message.success(response.data.message, 2);
                                  } else {
                                    dispatch(loadingEnd());
                                    message.error(response.message, 2);
                                  }
                                } catch (error) {
                                  dispatch(loadingEnd());
                                  message.error(
                                    "Không thể kết nối đến server!",
                                  );
                                }
                              };
                              deleteImage();
                            }}
                            okText="Có"
                            cancelText="Không"
                          >
                            <div>
                              <DeleteForeverIcon></DeleteForeverIcon> Xóa
                            </div>
                          </Popconfirm>
                        </div>
                      );
                    })
                  : null}
                {images.length > 0
                  ? images.map((item, index) => {
                      return (
                        <div key={index} className={cx("preview-image")}>
                          <img
                            src={URL.createObjectURL(item.originFileObj)}
                            alt=""
                          ></img>
                          <Popconfirm
                            title="Bạn có chắc muốn xóa ảnh này?"
                            onConfirm={() => {
                              images.splice(index, 1);
                              const newsImages = [...images];
                              setImages(newsImages);
                              message.success("Xóa ảnh thành công", 2);
                            }}
                            okText="Có"
                            cancelText="Không"
                          >
                            <div>
                              <DeleteForeverIcon></DeleteForeverIcon> Xóa
                            </div>
                          </Popconfirm>
                        </div>
                      );
                    })
                  : null}
              </div>

              <Upload
                multiple
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                fileList={images}
                beforeUpload={(file) => {
                  const isPNG =
                    file.type === "image/png" ||
                    file.type === "image/jpeg" ||
                    file.type === "image/jpg";
                  if (!isPNG) {
                    message.error(
                      `Chỉ được phép chọn file có đuôi .png/.jpeg/.jpg`,
                    );
                  }
                  return isPNG || Upload.LIST_IGNORE;
                }}
                onChange={(files) => {
                  if (files.fileList.length + oldImages.length > 10) {
                    return message.error("Chỉ được chọn tối đa 10 ảnh!");
                  }
                  setImages(files.fileList);
                }}
                customRequest={(e) => e.onSuccess()}
              >
                {images.length + oldImages.length >= 10 ? null : uploadButton}
              </Upload>
            </div>
          </div>
          <MyButton
            onClick={formik.handleSubmit}
            classes={cx("btn-submit")}
            disible={
              Object.keys(formik.errors).length !== 0 ||
              !province ||
              !district ||
              !ward ||
              !roomTypeId
            }
            primary={
              Object.keys(formik.errors).length === 0 &&
              province &&
              district &&
              ward &&
              roomTypeId
            }
          >
            Lưu & Cập nhật <SaveAltIcon></SaveAltIcon>
          </MyButton>
        </Col>
      </Row>
    </div>
  );
}

export default EditPost;
