import style from "./ManageCatePost.module.scss";
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
    href: "./manage-cate-post",
    text: "Quản lý loại tin",
  },
];

function ManageCatePost() {
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
      </div>
      <MyButton primary classes={cx("btn-add")}>
        Thêm loại tin mới
      </MyButton>
    </div>
  );
}

export default ManageCatePost;
