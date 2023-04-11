import style from "./Favorite.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

function Favorite() {
  return (
    <div className={cx("favorite")}>
      <h1 className={cx("title")}>Trang yêu thích</h1>
      <ul className={cx("list-favorite")}>
        <li>yêu thích 1</li>
        <li>yêu thích 2</li>
        <li>yêu thích 3</li>
      </ul>
    </div>
  );
}

export default Favorite;
