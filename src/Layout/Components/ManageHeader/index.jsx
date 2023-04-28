import { Link } from "react-router-dom";
import style from "./ManageHeader.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

function ManageHeader() {
  return (
    <div className={cx("header")}>
      <div className={cx("wrapper")}>
        <div className={cx("action")}>
          <ul className={cx("navbar")}>
            <li className={cx("nav-item")}>
              <Link to={"/"}>Trang chủ</Link>
            </li>
            <li className={cx("nav-item")}>
              <Link to={"#"}>Phòng trọ</Link>
            </li>
            <li className={cx("nav-item")}>
              <Link to={"#"}>Căn hộ</Link>
            </li>
            <li className={cx("nav-item")}>
              <Link to={"#"}>Dịch vụ</Link>
            </li>
            <li className={cx("nav-item")}>
              <Link to={"#"}>Bảng giá dịch vụ</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ManageHeader;
