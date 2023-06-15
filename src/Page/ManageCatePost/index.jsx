import style from "./ManageCatePost.module.scss";
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
    href: "./manage-cate-post",
    text: "Quản lý loại tin",
  },
];

function ManageCatePost() {
  const [MenuCatePost, setMenuCatePost] = useState();
  const [MenuEditPost, setMenuEditPost] = useState();

  return (
    <div className={cx("wrapper")}>
      <MyBreadCrumb items={items}></MyBreadCrumb>
      <h1>Quản lý loại tin</h1>
      <div className={cx("manage-cate-post")}>
        <table>
          <tr>
            <th>Mã loại tin</th>
            <th>Loại tin</th>
            <th>Giá loại tin</th>
          </tr>
          <tr>
            <th>#cfas501</th>
            <th>Tin thường</th>
            <th>20.000đ</th>
          </tr>
          <tr>
            <th>#afcaq502</th>
            <th>Tin VIP</th>
            <th>50.000đ</th>
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
        </ul>
        <ul className={cx("btn-edit")}>
          <li className={cx("list-items")}>
            <EditIcon></EditIcon>
            <NavLink
              onClick={() => {
                setMenuEditPost(true);
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
                setMenuEditPost(true);
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
          setMenuCatePost(true);
        }}
        primary
        classes={cx("btn-add")}
      >
        Thêm loại tin mới
      </MyButton>
      {MenuCatePost && (
        <Menu
          classes={cx("menu-status")}
          onCancel={() => {
            setMenuCatePost(false);
          }}
          open={MenuCatePost}
          title={`Thêm loại tin`}
        >
          <div className={cx("container")}>
            <div className={cx("form-group")}>
              <b>Mã loại tin:</b>
              <input type="text" disabled placeholder="#0001" />
            </div>
            <div className={cx("form-group")}>
              <b>Loại tin:</b>
              <input type="text" />
            </div>
            <div className={cx("form-group")}>
              <b>Giá tiền:</b>
              <input type="text" />
            </div>
            <MyButton primary classes={cx("btn-confirm")}>
              Thêm mới
            </MyButton>
          </div>
        </Menu>
      )}
      {MenuEditPost && (
        <Menu
          classes={cx("menu-status")}
          onCancel={() => {
            setMenuEditPost(false);
          }}
          open={MenuEditPost}
          title={`Sửa loại tin`}
        >
          <div className={cx("container")}>
            <div className={cx("form-group")}>
              <b>Mã loại tin:</b>
              <input type="text" disabled placeholder="#0001" />
            </div>
            <div className={cx("form-group")}>
              <b>Loại tin:</b>
              <input type="text" />
            </div>
            <div className={cx("form-group")}>
              <b>Giá tiền:</b>
              <input type="text" />
            </div>
            <MyButton primary classes={cx("btn-confirm")}>
              Cập nhật
            </MyButton>
          </div>
        </Menu>
      )}
    </div>
  );
}

export default ManageCatePost;
