import style from "./Statistic.module.scss";
import classNames from "classnames/bind";
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
    href: "./statistic",
    text: "Thống kê",
  },
];

function Statistic() {
  return (
    <div className={cx("wrapper")}>
      <MyBreadCrumb items={items}></MyBreadCrumb>
      <h1>Thống kê</h1>
      <div className={cx("stat-user")}>
        <h2>Người dùng</h2>
        <table>
          <tr>
            <th>Tài khoản đã đăng ký</th>
            <th>Tài khoản thường</th>
            <th>Tài khoản VIP</th>
            <th>Tài khoản Admin</th>
          </tr>
          <tr>
            <th>10</th>
            <th>3</th>
            <th>7</th>
            <th>2</th>
          </tr>
        </table>
      </div>
      <div className={cx("stat-cate-post")}>
        <h2>Loại tin</h2>
        <table>
          <tr>
            <th>Loại tin</th>
            <th>Tin đã đăng</th>
            <th>Tin đang hiển thị</th>
            <th>Tin đã hết hạn</th>
          </tr>
          <tr>
            <th>Tin thường</th>
            <th>40</th>
            <th>20</th>
            <th>20</th>
          </tr>
          <tr>
            <th>Tin VIP</th>
            <th>20</th>
            <th>13</th>
            <th>7</th>
          </tr>
        </table>
      </div>
      <div className={cx("stat-room")}>
        <h2>Loại phòng</h2>
        <table>
          <tr>
            <th>Loại phòng</th>
            <th>Tổng số phòng</th>
            <th>Phòng còn trống</th>
            <th>Phòng đã đặt</th>
          </tr>
          <tr>
            <th>Căn hộ</th>
            <th>20</th>
            <th>15</th>
            <th>5</th>
          </tr>
          <tr>
            <th>Chung cư</th>
            <th>15</th>
            <th>13</th>
            <th>2</th>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Statistic;
