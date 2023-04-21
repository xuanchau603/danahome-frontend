/* eslint-disable jsx-a11y/anchor-is-valid */
import MyModal from "./../MyModal/index";
import MyButton from "../MyButton";
import style from "./Register.module.scss";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import EastIcon from "@mui/icons-material/East";
import LockIcon from "@mui/icons-material/Lock";
import { message } from "antd";
import classNames from "classnames/bind";
import { background } from "../../Image/index";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useEffect, useRef, useState } from "react";
import MyInput from "./../MyInput/index";
import { useDispatch } from "react-redux";
import authAPI from "../../API/authAPI";
import { loadingEnd, loadingStart } from "../../Redux/loadingSlice";
import verifyAPI from "../../API/verifyAPI";

const cx = classNames.bind(style);

function Register(props) {
  const [countDown, setCountDown] = useState(0);
  const [disibleCode, setDisibleCode] = useState(true);

  const dispath = useDispatch();
  const btncode = useRef();
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
      code: "",
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
      code: Yup.string()
        .required("Vui lòng nhập thông tin này!")
        .min(6, "Mã xác nhận không hợp lệ")
        .max(6, "Mã xác nhận không hợp lệ")
        .matches(phoneRegExp, "Số điện thoại không hợp lệ!"),
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
    if (countDown === 0) {
      setDisibleCode(true);
      formik.setFieldValue("code", "");
      return;
    }
    const timer = setInterval(() => {
      setCountDown((prev) => {
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countDown]);

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

        <MyInput
          classes={cx("code")}
          disible={disibleCode}
          name="code"
          type="text"
          label="MÃ XÁC NHẬN"
          value={formik.values.code}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          icon={<VpnKeyIcon></VpnKeyIcon>}
          errorMessage={
            formik.errors.code && formik.touched.code ? formik.errors.code : ""
          }
        >
          {countDown ? (
            <MyButton classes={cx("btn-code")} primarydisible>
              {`Gửi lại: ${countDown}s`}
            </MyButton>
          ) : (
            <MyButton
              ref={btncode}
              classes={cx("btn-code")}
              primarydisible={
                !(Object.keys(formik.errors).length === 1) ||
                formik.values.confirmPassword === ""
              }
              primary={
                Object.keys(formik.errors).length === 1 &&
                formik.values.confirmPassword
              }
              onClick={async () => {
                if (
                  Object.keys(formik.errors).length === 1 &&
                  formik.values.confirmPassword
                ) {
                  try {
                    dispath(loadingStart());
                    const response = await verifyAPI.getCode({
                      email: formik.values.email,
                    });
                    if (response.status === 200) {
                      message.success(response.data.message, 2);
                      dispath(loadingEnd());
                      setCountDown(response.data.Expires_later / 1000);
                      setDisibleCode(false);
                    } else {
                      message.error(response.message, 2);
                      dispath(loadingEnd());
                    }
                  } catch (error) {
                    message.error("Không thể kết nối đến server", 2);
                    dispath(loadingEnd());
                  }
                }
              }}
            >
              Lấy mã
            </MyButton>
          )}
        </MyInput>

        <div className={cx("btn")}>
          <MyButton
            disible={
              !(Object.keys(formik.errors).length === 0) ||
              formik.values.code === ""
            }
            onClick={formik.handleSubmit}
            primary={
              Object.keys(formik.errors).length === 0 &&
              formik.values.code !== ""
            }
            classes={cx("btn-register")}
          >
            Đăng ký <EastIcon></EastIcon>{" "}
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
