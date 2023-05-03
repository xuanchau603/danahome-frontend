import { Link, NavLink } from "react-router-dom";
import style from "./ManageSidebar.module.scss";
import classNames from "classnames/bind";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import { logoutSuccess } from "../../../Redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

const cx = classNames.bind(style);

function ManageSidebar() {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });

  return (
    <div className={cx("sidebar")}>
      <div className={cx("user")}>
        <div className={cx("user-info")}>
          <img src={currentUser.image_URL} alt="" />
          <div className={cx("user-details")}>
            <h3>
              {currentUser.full_Name}{" "}
              {currentUser.type === 1 && <CheckCircleIcon></CheckCircleIcon>}
            </h3>
            <p>{currentUser.phone}</p>
          </div>
        </div>
        <div className={cx("user-id")}>
          <p>Mã thành viên: </p>
          <p>{currentUser.ID.split("-")[0]}</p>
        </div>
        <div className={cx("user-balance")}>
          <p>TK chính: </p>
          <p>0</p>
        </div>
      </div>
      <div className={cx("btn")}>
        <Link to={"#"}>Nạp tiền</Link>
        <Link to={"#"}>Nhắn tin</Link>
      </div>
      <p>Chung</p>
      <ul className={cx("nav-sidebar")}>
        <NavLink
          to={`/manage-post`}
          state={{ userId: currentUser.ID }}
          className={(active) => {
            return active.isActive ? cx("nav-item", "active") : cx("nav-item");
          }}
        >
          <DescriptionOutlinedIcon></DescriptionOutlinedIcon>
          <span>Quản lý tin đăng</span>
        </NavLink>
        <NavLink
          to={`/user-information?userId=${currentUser.ID}`}
          className={(active) => {
            return active.isActive ? cx("nav-item", "active") : cx("nav-item");
          }}
        >
          <EditNoteOutlinedIcon></EditNoteOutlinedIcon>
          <span to={"/user-information"}>Sửa thông tin cá nhân</span>
        </NavLink>
        <span className={cx("nav-item")}>
          <ContentPasteOutlinedIcon></ContentPasteOutlinedIcon>
          <span>Bảng giá dịch vụ</span>
        </span>
        <span className={cx("nav-item")}>
          <PhoneOutlinedIcon></PhoneOutlinedIcon>
          <span>Liên hệ</span>
        </span>
        <NavLink
          onClick={() => {
            dispatch(logoutSuccess());
          }}
          className={cx("nav-item", "logout")}
        >
          <LogoutOutlinedIcon></LogoutOutlinedIcon>
          Thoát
        </NavLink>
      </ul>
      {currentUser.isAdmin && (
        <>
          <p>Quản lý</p>
          <ul className={cx("nav-sidebar")}>
            <NavLink
              to={`/manage-user`}
              className={(active) => {
                return active.isActive
                  ? cx("nav-item", "active")
                  : cx("nav-item");
              }}
            >
              <AssignmentIndOutlinedIcon></AssignmentIndOutlinedIcon>
              <span>Quản lý tài khoản</span>
            </NavLink>
            <span className={cx("nav-item")}>
              <StarOutlineOutlinedIcon></StarOutlineOutlinedIcon>
              <span>Quản lý đánh giá</span>
            </span>
            <span className={cx("nav-item")}>
              <AssessmentOutlinedIcon></AssessmentOutlinedIcon>
              <span>Thống kê</span>
            </span>
          </ul>
        </>
      )}
    </div>
  );
}

export default ManageSidebar;
