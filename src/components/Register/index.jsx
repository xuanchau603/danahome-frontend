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
import MyInput from "./../MyInput/index";

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
        <MyInput
          type="text"
          label="HỌ VÀ TÊN"
          icon={<PersonOutlineIcon></PersonOutlineIcon>}
        ></MyInput>
        <MyInput
          type="email"
          label="EMAIL"
          icon={<MailOutlineIcon></MailOutlineIcon>}
        ></MyInput>
        <MyInput
          type="number"
          label="ĐIỆN THOẠI"
          icon={<PhoneIphoneIcon></PhoneIphoneIcon>}
        ></MyInput>
        <MyInput
          type="password"
          label="MẬT KHẨU"
          icon={<LockIcon></LockIcon>}
        ></MyInput>
        <MyInput
          type="password"
          label="NHẬP LẠI MẬT KHẨU"
          icon={<LockIcon></LockIcon>}
        ></MyInput>

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
