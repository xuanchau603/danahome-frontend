/* eslint-disable jsx-a11y/anchor-is-valid */
import MyModal from "./../MyModal/index";
import MyButton from "../MyButton";
import style from "./Register.module.scss";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import EastIcon from "@mui/icons-material/East";
import LockIcon from "@mui/icons-material/Lock";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, message } from "antd";
import classNames from "classnames/bind";
import { background } from "../../Image/index";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useEffect, useRef, useState } from "react";
import MyInput from "./../MyInput/index";
import { useDispatch } from "react-redux";
import authAPI from "../../API/authAPI";
import { loadingEnd, loadingStart } from "../../Redux/loadingSlice";

const cx = classNames.bind(style);

function Register(props) {
  const [loading] = useState(false);
  const dispath = useDispatch();
  const refRegister = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(3, "Tên không hợp lệ!")
        .required("Vui lòng nhập thông tin này!"),
      email: Yup.string()
        .email("Email không hợp lệ!")
        .required("Vui lòng nhập thông tin này!"),
      phone: Yup.string()
        .min(10, "Số điện thoại không hợp lệ!")
        .max(11, "Số điện thoại không hợp lệ!")
        .matches(phoneRegExp, "Số điện thoại không hợp lệ!")
        .required("Vui lòng nhập thông tin này!"),
      password: Yup.string()
        .min(6, "Mật khẩu quá ngắn!")
        .required("Vui lòng nhập thông tin này!"),
      confirmPassword: Yup.string()
        .required("Vui lòng nhập thông tin này!")
        .oneOf([Yup.ref("password")], "Mật khẩu không trùng nhau!"),
    }),
    onSubmit: async (values) => {
      dispath(loadingStart());
      try {
        const response = await authAPI.registerUser(values);
        if (response.status === 200) {
          dispath(loadingEnd());
          message.success(response.data.message, 2);
          props.onCancel();
          props.openLogin();
        } else {
          dispath(loadingEnd());
          message.error(response.message, 3);
        }
      } catch (error) {
        dispath(loadingEnd());
        message.error("Không thể kết nối đến server", 3);
      }
    },
  });

  useEffect(() => {
    if (
      Object.keys(formik.errors).length === 0 &&
      formik.values.confirmPassword
    ) {
      refRegister.current.style.opacity = 1;
      refRegister.current.style.cursor = "pointer";
    } else {
      refRegister.current.style.opacity = 0.4;
      refRegister.current.style.cursor = "not-allowed";
    }
  }, [formik.errors, formik.values.confirmPassword]);

  return (
    <MyModal status={props.isOpen} onCancel={props.onCancel} onOk={props.onOk}>
      <div className={cx("background")}>
        <img src={background} alt=""></img>
      </div>
      <div className={cx("wrapper")}>
        <h1 className={cx("title")}>Tạo tài khoản</h1>
        <MyInput
          name="fullName"
          type="text"
          label="HỌ VÀ TÊN"
          icon={<PersonOutlineIcon></PersonOutlineIcon>}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={
            formik.errors.fullName && formik.touched.fullName
              ? formik.errors.fullName
              : ""
          }
        ></MyInput>
        <MyInput
          name="email"
          type="email"
          label="EMAIL"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          icon={<MailOutlineIcon></MailOutlineIcon>}
          errorMessage={
            formik.errors.email && formik.touched.email
              ? formik.errors.email
              : ""
          }
        ></MyInput>
        <MyInput
          name="phone"
          type="text"
          label="ĐIỆN THOẠI"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          icon={<PhoneIphoneIcon></PhoneIphoneIcon>}
          errorMessage={
            formik.errors.phone && formik.touched.phone
              ? formik.errors.phone
              : ""
          }
        ></MyInput>
        <MyInput
          ref={passwordRef}
          name="password"
          type="password"
          label="MẬT KHẨU"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          icon={<LockIcon></LockIcon>}
          errorMessage={
            formik.errors.password && formik.touched.password
              ? formik.errors.password
              : ""
          }
        ></MyInput>
        <MyInput
          ref={confirmPasswordRef}
          name="confirmPassword"
          type="password"
          label="NHẬP LẠI MẬT KHẨU"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          icon={<LockIcon></LockIcon>}
          errorMessage={
            formik.errors.confirmPassword && formik.touched.confirmPassword
              ? formik.errors.confirmPassword
              : ""
          }
        ></MyInput>

        <div className={cx("btn")}>
          <MyButton
            onClick={formik.handleSubmit}
            ref={refRegister}
            primary
            classes={cx("btn-register")}
          >
            Đăng ký <EastIcon></EastIcon>{" "}
            {loading && (
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{ fontSize: 22, color: "#313131" }}
                  ></LoadingOutlined>
                }
              ></Spin>
            )}
          </MyButton>
        </div>
      </div>

      <div className={cx("register")}>
        Đã có tài khoản?{" "}
        <a
          style={{ color: "rgb(2, 143, 2)", fontWeight: 600 }}
          onClick={() => {
            props.onCancel();
            props.openLogin();
          }}
        >
          Đăng nhập
        </a>
      </div>
    </MyModal>
  );
}

export default Register;
