import style from "./NewsRent.module.scss";
import classNames from "classnames/bind";
import { banner } from "../../Image";

const cx = classNames.bind(style);

function NewsRent() {
  return (
    <div className={cx("NewsRent")}>
      <h1 className={cx("title")}>Tin mới đăng</h1>
      <div className={cx("news")}>
        <img src={banner} alt=""></img>
        <div className={cx("news-post")}>
          <a href="/"> Cho thuê phòng studio (căn hộ dịch vụ)</a>
          <div className={cx("news-info")}>
            <span className={cx("news-price")}>3.9 triệu/tháng</span>
            <span className={cx("news-time")}>19 phút trước</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsRent;
