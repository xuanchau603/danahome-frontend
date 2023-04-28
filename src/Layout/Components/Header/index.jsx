import style from "./Header.module.scss";
import classNames from "classnames/bind";
import logo from "../../../Image";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LanguageIcon from "@mui/icons-material/Language";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import InfoIcon from "@mui/icons-material/Info";
import AddTaskIcon from "@mui/icons-material/AddTask";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { Dropdown, Popover, Switch, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import Login from "../../../components/Login";
import Register from "../../../components/Register";
import { Link, NavLink, useNavigate } from "react-router-dom";
import MyButton from "../../../components/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../../Redux/authSlice";

const cx = classNames.bind(style);

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const dispath = useDispatch();
  const navigate = useNavigate();

  const refHeader = useRef();

  const { auth, listNewsFavorite } = useSelector((state) => {
    return state;
  });

  const handleScroll = () => {
    if (window.scrollY > 50) {
      refHeader.current.style.boxShadow = "0 0.4rem 1rem #333";
      refHeader.current.style.background =
        "linear-gradient(to right bottom, #c8fbd9, #c9fdec, #d3fdf9, #e3fdff, #f3fcff, #f4fdff, #f4fdff, #f5feff, #e8fffe, #defff7, #d8ffec, #d8ffdd)";
    } else {
      refHeader.current.style.boxShadow = "0 0 0 #000";
      refHeader.current.style.background = "transparent";
    }
  };
  const onChangeSwitch = (checked) => {
    console.log(`switch to ${checked}`);
  };

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
  const items = [
    {
      key: "1",
      label: <span>Tiếng việt</span>,
    },

    {
      key: "2",
      label: <span>English</span>,
    },
  ];

  const content = (
    <div className={cx("popover-item")}>
      <Dropdown
        menu={{
          items,
        }}
        placement="topRight"
        arrow
      >
        <li>
          <LanguageIcon></LanguageIcon> Ngôn ngữ
        </li>
      </Dropdown>

      <li
        onClick={() => {
          window.scrollTo({
            top: document.body.offsetHeight,
            behavior: "smooth",
          });
        }}
      >
        <HelpOutlineIcon></HelpOutlineIcon> Phản hồi và trợ giúp
      </li>
      <li>
        <DarkModeIcon></DarkModeIcon> Chế độ tối{" "}
        <Switch defaultChecked onChange={onChangeSwitch} />
      </li>
    </div>
  );

  const contentMenu = auth.login.currentUser ? (
    <div className={cx("menu")}>
      <Link to={"/new-post"} className={cx("menu-item")}>
        <AddCircleOutlineIcon></AddCircleOutlineIcon>{" "}
        <span>Đăng tin cho thuê</span>
      </Link>
      <Link to={"/manage-post"} className={cx("menu-item")}>
        <ReceiptLongIcon></ReceiptLongIcon> <span>Quản lý tin đăng</span>
      </Link>

      <Link
        to={`/user-information?userId=${auth.login.currentUser.ID}`}
        className={cx("menu-item")}
      >
        <InfoIcon></InfoIcon>
        <span>Thông tin cá nhân</span>
      </Link>
      <li className={cx("menu-item")}>
        <AddTaskIcon></AddTaskIcon>
        <span>Đăng ký VIP</span>
      </li>
      <Link to={"/favorite"} className={cx("menu-item")}>
        <FavoriteBorderIcon></FavoriteBorderIcon>
        <span>Tin đã lưu</span>
      </Link>
      <li className={cx("menu-item")}>
        <LogoutIcon></LogoutIcon>
        <span
          onClick={() => {
            dispath(logoutSuccess());
            navigate("/");
          }}
        >
          Đăng xuất
        </span>
      </li>
    </div>
  ) : (
    <div></div>
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={refHeader} className={cx("header")}>
      <div className={cx("wrapper")}>
        <Link to={"/"} className={cx("logo")}>
          <img src={logo} alt="logo"></img>
        </Link>
        <div className={cx("action")}>
          <NavLink
            to={"/favorite"}
            className={(classes) => {
              return classes.isActive
                ? cx("action-item", "select")
                : cx("action-item");
            }}
          >
            Yêu thích <FavoriteBorderIcon></FavoriteBorderIcon>
            {listNewsFavorite.listNewsFavorite.length > 0 && (
              <span className={cx("count-newsFavorite")}>
                {listNewsFavorite.listNewsFavorite.length}
              </span>
            )}
          </NavLink>
          <NavLink
            to={"/search-result"}
            className={(classes) => {
              return classes.isActive
                ? cx("action-item", "select")
                : cx("action-item");
            }}
          >
            Dịch vụ <SupportAgentIcon></SupportAgentIcon>
          </NavLink>

          <MyButton
            onClick={() => {
              if (auth.login.currentUser) {
                navigate("/new-post");
              } else {
                setShowLogin(true);
              }
            }}
            classes={cx("btn-news")}
            primary
          >
            {" "}
            Đăng tin ngay
            <LibraryAddIcon></LibraryAddIcon>
          </MyButton>
          <div className={cx("user")}>
            {auth.login.currentUser ? (
              <div className={cx("avatar")}>
                <Popover content={contentMenu} trigger="click">
                  <Tooltip
                    placement="right"
                    title={
                      auth.login.currentUser
                        ? auth.login.currentUser.full_Name
                        : "Tài khoản"
                    }
                  >
                    <span>
                      <div className={cx("image")}>
                        <img
                          alt=""
                          src={auth.login.currentUser.image_URL}
                        ></img>
                      </div>
                    </span>
                  </Tooltip>
                </Popover>
              </div>
            ) : (
              <MyButton
                onClick={() => {
                  setShowLogin(true);
                }}
                classes={cx("login")}
                outline
              >
                Đăng nhập <PersonAddIcon></PersonAddIcon>
              </MyButton>
            )}
          </div>

          <div className={cx("more")}>
            {" "}
            <Popover content={content} trigger={"hover"}>
              <MoreVertIcon></MoreVertIcon>
            </Popover>
          </div>
          {showLogin && (
            <Login
              isOpen={showLogin}
              openRegister={openRegister}
              onCancel={onCancelLogin}
              onOk={onOkLogin}
            ></Login>
          )}

          {showRegister && (
            <Register
              isOpen={showRegister}
              openLogin={openLogin}
              onCancel={onCancelRegister}
              onOk={onOkRegister}
            ></Register>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
