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

const cx = classNames.bind(style);

function Login(props) {
  const [loading] = useState(false);

  return (
    <MyModal status={props.isOpen} onCancel={props.onCancel} onOk={props.onOk}>
      <div className={cx("background")}>
        <img src={background} alt=""></img>
      </div>
      <div className={cx("wrapper")}>
        <h1 className={cx("title")}>Đăng nhập</h1>
        <p className={cx("please")}>Vui lòng đăng nhập để tiếp tục.</p>
        <div className={cx("form-group")}>
          <input id="email" type="email" placeholder=" "></input>
          <label htmlFor="email">EMAIL</label>
          <span className={cx("icon")}>
            <MailOutlineIcon></MailOutlineIcon>
          </span>
        </div>
        <div className={cx("form-group")}>
          <input id="password" type="password" placeholder=" "></input>
          <label htmlFor="email">MẬT KHẨU</label>
          <span className={cx("icon")}>
            <LockIcon></LockIcon>
          </span>
        </div>
        <div className={cx("btn")}>
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
