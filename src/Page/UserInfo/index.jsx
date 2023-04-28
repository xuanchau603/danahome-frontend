import MyBreadCrumb from "../../components/MyBreadcrumb";
import style from "./UserInfo.module.scss";
import classNames from "classnames/bind";
import HomeIcon from "@mui/icons-material/Home";
import { Button, Input, Upload, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import MyButton from "../../components/MyButton";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import authAPI from "../../API/authAPI";
import { useSearchParams } from "react-router-dom";
import { loadingStart, loadingEnd } from "../../Redux/loadingSlice";
import { editUser } from "../../Redux/authSlice";

const cx = classNames.bind(style);
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

function UserInfo() {
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  const [imagePreview, setImagePreview] = useState([]);
  const [image, setImage] = useState();
  const [phone, setPhone] = useState();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [zaloPhone, setZaloPhone] = useState();
  const [facebookUrl] = useState();

  const items = [
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
      text: "Cập nhật thông tin cá nhân",
    },
  ];
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const getUser = async () => {
    const response = await authAPI.getUserById(
      userId,
      currentUser.access_Token,
    );
    const url = response.data.user_Info.image_URL;
    const fileName = "myFile.jpg";
    fetch(url).then(async (response) => {
      const contentType = response.headers.get("content-type");
      const blob = await response.blob();
      const file = new File([blob], fileName, { contentType });
      getBase64(file, (url) => {
        setImagePreview([url]);
      });
      setImage(file);
    });
    setPhone(response.data.user_Info.phone);
    setFullName(response.data.user_Info.full_Name);
    setEmail(response.data.user_Info.email);
    setZaloPhone(response.data.user_Info.phone);
    dispatch(editUser(response.data.user_Info));
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.access_Token, userId]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("userId", currentUser.ID);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("fullName", fullName);
    formData.append("image", image);
    formData.append("zaloPhone", zaloPhone);
    formData.append("facebookUrl", facebookUrl);
    try {
      dispatch(loadingStart());
      const response = await authAPI.editUser(
        formData,
        currentUser.access_Token,
      );
      const jsonData = await response.json();
      if (response.status === 200) {
        message.success(jsonData.message);
        getUser();
        dispatch(loadingEnd());
      } else {
        message.error("Cập nhật không thành công");
        dispatch(loadingEnd());
      }
    } catch (error) {
      message.error("Không thể kết nối đến Server");
      dispatch(loadingEnd());
    }
  };

  return (
    <div className={cx("wrapper")}>
      <MyBreadCrumb items={items}></MyBreadCrumb>
      <h1 className={cx("title")}>Cập nhật thông tin cá nhân</h1>
      <div className={cx("container")}>
        <div className={cx("form-group")}>
          <span>Mã thành viên:</span>
          <Input className={cx("input")} value={currentUser.ID} disabled />
        </div>
        <div className={cx("form-group")}>
          <span>Số điện thoại:</span>
          <Input
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            value={phone}
            className={cx("input")}
          />
        </div>
        <div className={cx("form-group")}>
          <span>Tên hiển thị:</span>
          <Input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            className={cx("input")}
          />
        </div>
        <div className={cx("form-group")}>
          <span>Email:</span>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className={cx("input")}
          />
        </div>
        <div className={cx("form-group")}>
          <span>Số Zalo:</span>
          <Input value={currentUser.phone} className={cx("input")} />
        </div>
        <div className={cx("form-group")}>
          <span>Facebook:</span>
          <Input
            className={cx("input")}
            placeholder="Liên kết trang cá nhân của bạn"
          />
        </div>
        <div style={{ margin: "4rem 0" }} className={cx("form-group")}>
          <span>Mật khẩu:</span>
          <MyButton classes={cx("btn-changePass")} outline>
            Đổi mật khẩu
          </MyButton>
        </div>
        <div className={cx("form-group-avatar")}>
          <span>Ảnh đại diện:</span>
          <div className={cx("avatar")}>
            <img src={imagePreview[0]} alt=""></img> <br></br>
            <Upload
              showUploadList={false}
              onChange={(file) => {
                setImage(file.file.originFileObj);
                getBase64(file.file.originFileObj, (url) => {
                  setImagePreview([url]);
                });
              }}
              customRequest={(e) => {
                return e.onSuccess();
              }}
              fileList={imagePreview}
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
              className={cx("btn-upload")}
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
          </div>
        </div>

        <MyButton
          onClick={handleSubmit}
          disible={!phone || !fullName || !email}
          classes={cx("btn-submit")}
          primary
        >
          Lưu & Cập nhật
        </MyButton>
      </div>
    </div>
  );
}

export default UserInfo;
