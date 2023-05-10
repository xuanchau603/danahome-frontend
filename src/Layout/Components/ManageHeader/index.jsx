import { Link } from "react-router-dom";
import style from "./ManageHeader.module.scss";
import classNames from "classnames/bind";
import logo from "../../../Image";
import { useSelector } from "react-redux";

const cx = classNames.bind(style);

function ManageHeader() {
  const listCategoryRooms = useSelector((state) => {
    return state.category.categoryRooms;
  });
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });

  return (
    <div className={cx("header")}>
      <Link to={"/"} className={cx("logo")}>
        <img src={logo} alt=""></img>
      </Link>
      <div className={cx("wrapper")}>
        <div className={cx("action")}>
          <ul className={cx("navbar")}>
            <li className={cx("nav-item")}>
              <Link to={"/"}>Trang chủ</Link>
            </li>
            {listCategoryRooms &&
              listCategoryRooms.map((item) => {
                return (
                  <li key={item.ID} className={cx("nav-item")}>
                    <Link
                      to={`/search-result?type=${item.ID}&typeName=${item.name}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            <li className={cx("nav-item")}>
              <Link
                to={"/payment-online"}
                state={{
                  title: `Nạp tiền vào tài khoản: ${currentUser.full_Name}`,
                  type: 2,
                }}
              >
                Nạp tiền
              </Link>
            </li>
            <li className={cx("nav-item")}>
              <Link to={"/"}>Bảng giá dịch vụ</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ManageHeader;
