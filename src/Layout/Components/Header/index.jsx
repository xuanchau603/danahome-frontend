import style from "./Header.module.scss";
import classNames from "classnames/bind";
import logo from "../../../Image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { Popover } from "antd";
import { useState } from "react";
import Login from "../../../components/Login";
import Register from "../../../components/Register";
import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(style);

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const navigate = useNavigate();

  const onCancelLogin = () => {
    setShowLogin(false);
  };

  const onOkLogin = () => {
    alert("dsfdsfsd");
  };

  const onCancelRegister = () => {
    setShowRegister(false);
  };

  const onOkRegister = () => {
    alert("dsfdsfsd");
  };

  const openRegister = () => {
    setShowRegister(true);
  };
  const openLogin = () => {
    setShowLogin(true);
  };

  const content = <div className={cx("popover-item")}>English </div>;

  return (
    <div className={cx("wrapper")}>
      <div className={cx("logo")}>
        <img src={logo} alt="logo"></img>
      </div>
      <div className={cx("action")}>
        <Link to={"/favorite"} className={cx("action-item")}>
          Yêu thích <FavoriteBorderIcon></FavoriteBorderIcon>
        </Link>
        <Link className={cx("action-item")}>
          Dịch vụ <SupportAgentIcon></SupportAgentIcon>
        </Link>
        <Popover content={content} trigger={"click"}>
          <div className={cx("action-item")}>
            Tiếng việt{" "}
            <KeyboardArrowDownIcon fontSize="large"></KeyboardArrowDownIcon>
          </div>
        </Popover>
        <button
          onClick={() => {
            setShowLogin(true);
          }}
          className={cx("login")}
        >
          Đăng nhập <PersonAddIcon></PersonAddIcon>
        </button>
        <Login
          isOpen={showLogin}
          openRegister={openRegister}
          onCancel={onCancelLogin}
          onOk={onOkLogin}
        ></Login>
        <Register
          isOpen={showRegister}
          openLogin={openLogin}
          onCancel={onCancelRegister}
          onOk={onOkRegister}
        ></Register>
      </div>
    </div>
  );
}

export default Header;
