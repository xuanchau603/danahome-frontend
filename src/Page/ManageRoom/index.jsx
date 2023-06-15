import style from "./ManageRoom.module.scss";
import classNames from "classnames/bind";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import MyButton from "../../components/MyButton";
import MyBreadCrumb from "../../components/MyBreadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import { useState } from "react";
import Menu from "../../components/Menu";
import { NavLink } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';


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
  const [MenuRoom, setMenuRoom] = useState();
  const [MenuEditRoom, setMenuEditRoom] = useState();

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
        <ul className={cx("btn-edit")}>
          <li className={cx("list-items")}>
            <EditIcon></EditIcon>
            <NavLink
              onClick={() => {
                setMenuEditRoom(true);
              }}
              href="#"
            >
              Sửa
            </NavLink>
          </li>
          <li className={cx("list-items")}>
            <EditIcon></EditIcon>
            <NavLink
              onClick={() => {
                setMenuEditRoom(true);
              }}
              href="#"
            >
              Sửa
            </NavLink>
          </li>
          <li className={cx("list-items")}>
            <EditIcon></EditIcon>
            <NavLink
              onClick={() => {
                setMenuEditRoom(true);
              }}
              href="#"
            >
              Sửa
            </NavLink>
          </li>
        </ul>
      </div>
      <MyButton
        onClick={() => {
          setMenuRoom(true);
        }}
        primary
        classes={cx("btn-add")}
      >
        Thêm loại phòng mới
      </MyButton>
      {MenuRoom && (
        <Menu
          classes={cx("menu-status")}
          onCancel={() => {
            setMenuRoom(false);
          }}
          open={MenuRoom}
          title={`Thêm loại phòng`}
        >
          <div className={cx("container")}>
            <div className={cx("form-group")}>
              <b>Mã loại phòng:</b>
              <input type="text" disabled placeholder="#0001" />
            </div>
            <div className={cx("form-group")}>
              <b>Loại phòng:</b>
              <input type="text" />
            </div>
            <MyButton primary classes={cx("btn-confirm")}>Thêm mới</MyButton>
          </div>
        </Menu>
      )}
      {MenuEditRoom && (
        <Menu
          classes={cx("menu-status")}
          onCancel={() => {
            setMenuEditRoom(false);
          }}
          open={MenuEditRoom}
          title={`Thêm loại phòng`}
        >
          <div className={cx("container")}>
            <div className={cx("form-group")}>
              <b>Mã loại phòng:</b>
              <input type="text" disabled placeholder="#0001" />
            </div>
            <div className={cx("form-group")}>
              <b>Loại phòng:</b>
              <input type="text" />
            </div>
            <MyButton primary classes={cx("btn-confirm")}>Cập nhật</MyButton>
          </div>
        </Menu>
      )}
    </div>
  );
}

export default ManageRoom;
