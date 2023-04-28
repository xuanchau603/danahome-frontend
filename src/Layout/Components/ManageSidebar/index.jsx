import { Link } from "react-router-dom";
import style from "./ManageSidebar.module.scss";
import classNames from "classnames/bind";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
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
            <h3>{currentUser.full_Name}</h3>
            <p>{currentUser.phone}</p>
          </div>
        </div>
        <div className={cx("user-id")}>
          <p>Mã thành viên: </p>
          <p>#{currentUser.ID.split("-")[1]}</p>
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
        <li className={cx("nav-item", "active")}>
          <DescriptionOutlinedIcon></DescriptionOutlinedIcon>
          <Link to={"#"}>Quản lý tin đăng</Link>
        </li>
        <li className={cx("nav-item")}>
          <EditNoteOutlinedIcon></EditNoteOutlinedIcon>
          <Link to={"#"}>Sửa thông tin cá nhân</Link>
        </li>
        <li className={cx("nav-item")}>
          <ContentPasteOutlinedIcon></ContentPasteOutlinedIcon>
          <Link to={"#"}>Bảng giá dịch vụ</Link>
        </li>
        <li className={cx("nav-item")}>
          <PhoneOutlinedIcon></PhoneOutlinedIcon>
          <Link to={"#"}>Liên hệ</Link>
        </li>
        <li
          onClick={() => {
            dispatch(logoutSuccess());
          }}
          className={cx("nav-item", "logout")}
        >
          <LogoutOutlinedIcon></LogoutOutlinedIcon>
          <Link to={"#"}>Thoát</Link>
        </li>
      </ul>
      <p>Quản lý</p>
      <ul className={cx("nav-sidebar")}>
        <li className={cx("nav-item")}>
          <AssignmentOutlinedIcon></AssignmentOutlinedIcon>
          <Link to={"#"}>Quản lý bài đăng</Link>
        </li>
        <li className={cx("nav-item")}>
          <AssignmentIndOutlinedIcon></AssignmentIndOutlinedIcon>
          <Link to={"#"}>Quản lý tài khoản</Link>
        </li>
        <li className={cx("nav-item")}>
          <StarOutlineOutlinedIcon></StarOutlineOutlinedIcon>
          <Link to={"#"}>Quản lý đánh giá</Link>
        </li>
        <li className={cx("nav-item")}>
          <AssessmentOutlinedIcon></AssessmentOutlinedIcon>
          <Link to={"#"}>Thống kê</Link>
        </li>
      </ul>
    </div>
  );
}

export default ManageSidebar;
