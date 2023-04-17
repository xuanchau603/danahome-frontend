/* eslint-disable jsx-a11y/anchor-is-valid */
import MyButton from "../MyButton";
import MyModal from "./../MyModal/index";
import style from "./Login.module.scss";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import EastIcon from "@mui/icons-material/East";
import LockIcon from "@mui/icons-material/Lock";
import { Checkbox, message } from "antd";
import classNames from "classnames/bind";
import { background } from "../../Image";
import { useRef, useState } from "react";
import MyInput from "../MyInput";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Redux/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loadingStart, loadingEnd } from "../../Redux/loadingSlice";
import authAPI from "../../API/authAPI";

const cx = classNames.bind(style);

function Login(props) {
  const [remember, setRemember] = useState(false);

  const passwordRef = useRef();

  const dispath = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ!")
        .required("Vui lòng nhập thông tin này!"),
      password: Yup.string()
        .min(6, "Mật khẩu quá ngắn!")
        .required("Vui lòng nhập thông tin này!"),
    }),
    onSubmit: async (values) => {
      dispath(loadingStart());
      try {
        const response = await authAPI.loginUser(values);
        if (response.status === 200) {
          dispath(
            loginUser({
              ...response.data.user_Info,
              access_Token: response.data.access_Token,
            }),
          );
          if (remember) {
            localStorage.setItem("user_Id", response.data.user_Info.ID);
            localStorage.setItem("token", response.data.access_Token);
          }
          dispath(loadingEnd());
          props.onCancel();
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

  return (
    <MyModal status={props.isOpen} onCancel={props.onCancel} onOk={props.onOk}>
      <div className={cx("background")}>
        <img src={background} alt=""></img>
      </div>
      <div className={cx("wrapper")}>
        <div className={cx("header")}>
          <h1 className={cx("title")}>Đăng nhập</h1>
          <p className={cx("please")}>Vui lòng đăng nhập để tiếp tục.</p>
        </div>
        <MyInput
          type="email"
          label="EMAIL"
          name="email"
          value={formik.values.email}
          icon={<MailOutlineIcon></MailOutlineIcon>}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={
            formik.errors.email && formik.touched.email
              ? formik.errors.email
              : ""
          }
        ></MyInput>
        <MyInput
          ref={passwordRef}
          type="password"
          label="MẬT KHẨU"
          name="password"
          value={formik.values.password}
          icon={<LockIcon></LockIcon>}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorMessage={
            formik.errors.password && formik.touched.password
              ? formik.errors.password
              : ""
          }
        ></MyInput>
        <div className={cx("btn")}>
          <div className={cx("remember")}>
            <Checkbox onChange={() => setRemember(!remember)}>
              Ghi nhớ đăng nhập
            </Checkbox>
          </div>
          <MyButton
            onClick={formik.handleSubmit}
            disible={
              !(Object.keys(formik.errors).length === 0) ||
              !formik.values.password
            }
            outline={
              Object.keys(formik.errors).length === 0 && formik.values.password
            }
            classes={cx("btn-login")}
          >
            Đăng nhập <EastIcon></EastIcon>{" "}
          </MyButton>
        </div>
      </div>

      <div className={cx("register")}>
        <div className={cx("forgot")}>Quên mật khẩu?</div>
        <span>Chưa có tài khoản? </span>
        <a
          style={{ color: "rgb(2, 143, 2)", fontWeight: 600 }}
          onClick={() => {
            props.onCancel();
            props.openRegister();
          }}
        >
          Đăng ký
        </a>
      </div>
    </MyModal>
  );
}

export default Login;
