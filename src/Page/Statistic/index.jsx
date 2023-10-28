import style from "./Statistic.module.scss";
import classNames from "classnames/bind";
import MyBreadCrumb from "../../components/MyBreadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useState } from "react";
import statisticsAPI from "../../API/statisticsAPI";
import { useSelector } from "react-redux";
import Format from "../../components/Format";

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
  const [statistics, setStatistics] = useState();
  const { auth } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    const getStatistics = async () => {
      const response = await statisticsAPI.getStatistics(
        auth.login.currentUser.access_Token,
      );

      if (response.status === 200) {
        setStatistics(response.data);
        console.log(statistics);
      }
    };

    getStatistics();
  }, []);

  return (
    <>{statistics != null && <div className={cx("wrapper")}>
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
          <th>{statistics.total_User}</th>
          <th>{statistics.total_Normal_User}</th>
          <th>{statistics.total_Vip_User}</th>
          <th>{statistics.total_Admin_Account}</th>
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
          <th>{statistics.total_Normal_News}</th>
          <th>{statistics.total_Normal_Active_News}</th>
          <th>{statistics.total_Normal_Expired_News}</th>
        </tr>
        <tr>
          <th>Tin VIP</th>
          <th>{statistics.total_Vip_News}</th>
          <th>{statistics.total_Vip_Active_News}</th>
          <th>{statistics.total_Vip_Expired_News}</th>
        </tr>
      </table>
    </div>
    <div className={cx("stat-room")}>
      <h2>Loại phòng</h2>
      <table>
        <tr>
          <th>Loại phòng</th>
          <th>Tổng số phòng</th>
        </tr>
        <tr>
          <th>Căn hộ</th>
          <th>{statistics.total_News_Apartment}</th>
        </tr>
        <tr>
          <th>Nhà nguyên căn</th>
          <th>{statistics.total_News_House}</th>
        </tr>
        <tr>
          <th>Phòng trọ</th>
          <th>{statistics.total_News_Motel}</th>
        </tr>
      </table>
    </div>

    <div className={cx("stat-room")}>
      <h2>Doanh thu</h2>
      <table>
        <tr>
          <th>Tổng doanh thu</th>
          <th>{Format.formatPrice(statistics.sales_Amount)}</th>
        </tr>
      </table>
    </div>
  </div>}
    </>
  );
}

export default Statistic;
