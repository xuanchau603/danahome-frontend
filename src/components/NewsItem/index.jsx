import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import style from "./NewsItem.module.scss";
import classNames from "classnames/bind";
import Format from "../Format";
import moment from "moment";
import MyButton from "../MyButton";
import { Link } from "react-router-dom";

const cx = classNames.bind(style);

function NewsItem(props) {
  return (
    <div className={cx("news")}>
      <Link
        to={`/news-detail?newsId=${props.data.ID}`}
        className={cx("main-image")}
      >
        <img src={props.data.featured_Image} alt=""></img>
        <span className={cx("image-count")}>{props.data.total_Image} ảnh</span>
        <span title="Lưu tin này" className={cx("love-icon")}>
          <FavoriteBorderIcon></FavoriteBorderIcon>
        </span>
      </Link>
      <div className={cx("news-info")}>
        <Link
          to={`/news-detail?newsId=${props.data.ID}`}
          className={cx("title-news")}
        >
          {props.data.title.toUpperCase()}
        </Link>
        <div className={cx("info")}>
          <span className={cx("price", "info-item")}>
            {Format.formatPrice(props.data.price)}/tháng
          </span>
          <span className={cx("size", "info-item")}>
            {props.data.acreage}m²
          </span>
          <span className={cx("address", "info-item")}>
            {`${props.data.district}, ${props.data.province}`}
          </span>
          <span className={cx("updated", "info-item")}>
            {moment(new Date(props.data.createdAt).toLocaleString()).fromNow()}
          </span>
        </div>
        <p className={cx("info-description")}>{props.data.description}</p>
        <div className={cx("footer")}>
          <div className={cx("actor")}>
            <div className={cx("actor-image")}>
              <img src={props.data.poster_Image_URL} alt=""></img>
            </div>
            <span className={cx("actor-name")}>{props.data.poster}</span>
          </div>
          <div className={cx("btn")}>
            <MyButton primary>Đặt cọc ngay</MyButton>
            <MyButton outline>{props.data.poster_Phone}</MyButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
