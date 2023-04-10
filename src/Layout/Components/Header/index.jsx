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

const cx = classNames.bind(style);

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentUser] = useState(false);

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
        <span>Đăng xuất</span>
      </li>
    </div>
  );

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
                <div className={cx("image")}>
                  <img
                    alt=""
                    src="https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-1/308991716_1225308318318724_7314307188888730009_n.jpg?stp=dst-jpg_p160x160&_nc_cat=110&ccb=1-7&_nc_sid=7206a8&_nc_ohc=LBvpPuuXD3YAX_dz3GW&_nc_ht=scontent.fdad3-1.fna&oh=00_AfBTb1xrkHPNs0M5zHXlH3YmPNq91UVT6enhNybZZO7ZbQ&oe=6438E426"
                  ></img>
                </div>
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
