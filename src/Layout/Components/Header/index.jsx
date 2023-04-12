import style from "./Header.module.scss";
import classNames from "classnames/bind";
import logo from "../../../Image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InfoIcon from "@mui/icons-material/Info";
import AddTaskIcon from "@mui/icons-material/AddTask";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { Popover, Tooltip } from "antd";
import { useState } from "react";
import Login from "../../../components/Login";
import Register from "../../../components/Register";
import { Link } from "react-router-dom";
import MyButton from "../../../components/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../../Redux/authSlice";

const cx = classNames.bind(style);

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const dispath = useDispatch();

  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });

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

  const contentMenu = (
    <div className={cx("menu")}>
      <li className={cx("menu-item")}>
        <AddCircleOutlineIcon></AddCircleOutlineIcon>{" "}
        <span>Đăng tin cho thuê</span>
      </li>
      <li className={cx("menu-item")}>
        <ReceiptLongIcon></ReceiptLongIcon> <span>Quản lý tin đăng</span>
      </li>
      <li className={cx("menu-item")}>
        <AddTaskIcon></AddTaskIcon>
        <span>Đăng ký VIP</span>
      </li>
      <li className={cx("menu-item")}>
        <InfoIcon></InfoIcon>
        <span>Thông tin cá nhân</span>
      </li>
      <li className={cx("menu-item")}>
        <FavoriteBorderIcon></FavoriteBorderIcon>
        <span>Tin đã lưu</span>
      </li>
      <li className={cx("menu-item")}>
        <LogoutIcon></LogoutIcon>
        <span
          onClick={() => {
            dispath(logoutSuccess());
          }}
        >
          Đăng xuất
        </span>
      </li>
    </div>
  );

  return (
    <div className={cx("wrapper")}>
      <Link to={"/"} className={cx("logo")}>
        <img src={logo} alt="logo"></img>
      </Link>
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
        <div className={cx("user")}>
          {currentUser ? (
            <div className={cx("avatar")}>
              <Tooltip title="Đăng tin mới">
                <span>
                  {" "}
                  <MyButton classes={cx("btn-news")} primary>
                    {" "}
                    <AddCircleOutlineIcon></AddCircleOutlineIcon>
                  </MyButton>
                </span>
              </Tooltip>

              <Popover content={contentMenu} trigger="click">
                <Tooltip
                  title={currentUser ? currentUser.full_name : "Tài khoản"}
                >
                  <span>
                    <div className={cx("image")}>
                      <img alt="" src={currentUser.image}></img>
                    </div>
                  </span>
                </Tooltip>
              </Popover>
            </div>
          ) : (
            <button
              onClick={() => {
                setShowLogin(true);
              }}
              className={cx("login")}
            >
              Đăng nhập <PersonAddIcon></PersonAddIcon>
            </button>
          )}
        </div>

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
