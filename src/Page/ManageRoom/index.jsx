import style from "./ManageRoom.module.scss";
import classNames from "classnames/bind";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import MyButton from "../../components/MyButton";
import MyBreadCrumb from "../../components/MyBreadcrumb";
import HomeIcon from "@mui/icons-material/Home";

const cx = classNames.bind(style);

const items = [
  {
    href: "/",
    icon: <HomeIcon></HomeIcon>,
    text: "Trang chủ",
  },
  {
    href: "./manage-room",
    text: "Quản lý loại phòng",
  },
];
function ManageRoom() {
  return (
    <div className={cx("wrapper")}>
      <MyBreadCrumb items={items}></MyBreadCrumb>
      <h1>Quản lý loại phòng</h1>
      <div className={cx("manage-room")}>
        <table>
          <tr>
            <th>Mã loại phòng</th>
            <th>Loại phòng</th>
          </tr>
          <tr>
            <th>#cfas501</th>
            <th>Chung cư mini</th>
          </tr>
          <tr>
            <th>#afcaq502</th>
            <th>Phòng trọ</th>
          </tr>
          <tr>
            <th>#fvawq210</th>
            <th>Căn hộ</th>
          </tr>
        </table>
        <ul className={cx("btn-delete")}>
          <li className={cx("list-items")}>
            <RemoveCircleIcon></RemoveCircleIcon>
            <a href="/">Xoá</a>
          </li>
          <li className={cx("list-items")}>
            <RemoveCircleIcon></RemoveCircleIcon>
            <a href="/">Xoá</a>
          </li>
          <li className={cx("list-items")}>
            <RemoveCircleIcon></RemoveCircleIcon>
            <a href="/">Xoá</a>
          </li>
        </ul>
      </div>
      <MyButton primary classes={cx("btn-add")}>
        Thêm loại phòng mới
      </MyButton>
    </div>
  );
}

export default ManageRoom;
