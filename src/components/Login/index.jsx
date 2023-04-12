/* eslint-disable jsx-a11y/anchor-is-valid */
import MyButton from "../MyButton";
import MyModal from "./../MyModal/index";
import style from "./Login.module.scss";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import EastIcon from "@mui/icons-material/East";
import LockIcon from "@mui/icons-material/Lock";
import { LoadingOutlined } from "@ant-design/icons";
import { Checkbox, Spin } from "antd";
import classNames from "classnames/bind";
import { background } from "../../Image";
import { useState } from "react";
import MyInput from "../MyInput";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../Redux/authSlice";

const cx = classNames.bind(style);

function Login(props) {
  const [loading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispath = useDispatch();

  const login = async () => {
    const response = await axios.post("http://localhost:8000/api/login", {
      email: email,
      password: password,
    });
    dispath(loginSuccess(response.data));
    props.onCancel();
  };

  return (
    <MyModal status={props.isOpen} onCancel={props.onCancel} onOk={props.onOk}>
      <div className={cx("background")}>
        <img src={background} alt=""></img>
      </div>
      <div className={cx("wrapper")}>
        <h1 className={cx("title")}>Đăng nhập</h1>
        <p className={cx("please")}>Vui lòng đăng nhập để tiếp tục.</p>
        <MyInput
          type="email"
          label="EMAIL"
          icon={<MailOutlineIcon></MailOutlineIcon>}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></MyInput>
        <MyInput
          type="password"
          label="MẬT KHẨU"
          icon={<LockIcon></LockIcon>}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></MyInput>
        <div onClick={login} className={cx("btn")}>
          <div className={cx("remember")}>
            <Checkbox onChange={() => console.log("checked")}>
              Ghi nhớ đăng nhập
            </Checkbox>
          </div>
          <MyButton primary classes={cx("btn-login")}>
            Đăng nhập <EastIcon></EastIcon>{" "}
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
