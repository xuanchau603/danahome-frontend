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
import { Spin } from "antd";
import classNames from "classnames/bind";
import { background } from "../../Image/index";

import { useState } from "react";

const cx = classNames.bind(style);

function Register(props) {
  const [loading] = useState(false);

  return (
    <MyModal status={props.isOpen} onCancel={props.onCancel} onOk={props.onOk}>
      <div className={cx("background")}>
        <img src={background} alt=""></img>
      </div>
      <div className={cx("wrapper")}>
        <h1 className={cx("title")}>Tạo tài khoản</h1>
        <div className={cx("form-group")}>
          <input id="fullName" type="text" placeholder=" "></input>
          <label htmlFor="email">HỌ VÀ TÊN</label>
          <span className={cx("icon")}>
            <PersonOutlineIcon></PersonOutlineIcon>
          </span>
        </div>

        <div className={cx("form-group")}>
          <input id="email" type="email" placeholder=" "></input>
          <label htmlFor="email">EMAIL</label>
          <span className={cx("icon")}>
            <MailOutlineIcon></MailOutlineIcon>
          </span>
        </div>
        <div className={cx("form-group")}>
          <input id="phone" type="number" placeholder=" "></input>
          <label htmlFor="email">SỐ ĐIỆN THOẠI</label>
          <span className={cx("icon")}>
            <PhoneIphoneIcon></PhoneIphoneIcon>
          </span>
        </div>
        <div className={cx("form-group")}>
          <input id="password" type="password" placeholder=" "></input>
          <label htmlFor="email">MẬT KHẨU</label>
          <span className={cx("icon")}>
            <LockIcon></LockIcon>
          </span>
        </div>
        <div className={cx("form-group")}>
          <input id="password-agian" type="password" placeholder=" "></input>
          <label htmlFor="email">NHẬP LẠI MẬT KHẨU</label>
          <span className={cx("icon")}>
            <LockIcon></LockIcon>
          </span>
        </div>
        <div className={cx("btn")}>
          <MyButton primary classes={cx("btn-register")}>
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
