import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import style from "./NewsItem.module.scss";
import classNames from "classnames/bind";
import Format from "../Format";
import moment from "moment";
import "moment/locale/vi";
import MyButton from "../MyButton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  addToListNewsFavorite,
  removeFromListNewsFavorite,
} from "../../Redux/newsFavoriteSlice";

const cx = classNames.bind(style);

function NewsItem(props) {
  const dispatch = useDispatch();

  const listNewsFavorite = useSelector((state) => {
    return state.listNewsFavorite.listNewsFavorite;
  });

  return (
    <div className={cx("news")}>
      <Link
        to={`/news-detail?newsId=${props.data.ID}`}
        className={cx("main-image")}
      >
        <img
          src={props.data.featured_Image || props.data.images[0].image_URL}
          alt=""
        ></img>
        <span className={cx("image-count")}>
          {props.data.total_Image || props.data.images.length} ảnh
        </span>
        {listNewsFavorite.find((item) => {
          return item.newsId === props.data.ID;
        }) ? (
          <span
            onClick={(e) => {
              e.preventDefault();
              const index = listNewsFavorite.findIndex((item) => {
                return item.newsId === props.data.ID;
              });
              dispatch(removeFromListNewsFavorite(index));
            }}
            title="Xóa khỏi danh sách yêu thích"
            className={cx("unlove-icon", "icon")}
          >
            <FavoriteIcon></FavoriteIcon>
          </span>
        ) : (
          <span
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                addToListNewsFavorite({
                  newsId: props.data.ID,
                  createAt: new Date().toLocaleString(),
                }),
              );
            }}
            title="Lưu tin này"
            className={cx("love-icon", "icon")}
          >
            <FavoriteBorderIcon></FavoriteBorderIcon>
          </span>
        )}
      </Link>
      <div className={cx("news-info")}>
        <Link
          to={`/news-detail?newsId=${props.data.ID}`}
          className={cx("title-news")}
        >
          <b>{props.data.title.toUpperCase()}</b>
          <small>
            <RemoveRedEyeIcon></RemoveRedEyeIcon> {props.data.news_Views} đã xem
          </small>
        </Link>
        <div className={cx("info")}>
          <span className={cx("price", "info-item")}>
            {Format.formatPrice(props.data.price)}/tháng
          </span>
          <span className={cx("size", "info-item")}>
            {props.data.acreage}m²
          </span>
          <span className={cx("address", "info-item")}>
            {`${props.data.district.name}, ${props.data.province.name}`}
          </span>
          <span className={cx("updated", "info-item")}>
            {moment(new Date(props.data.createdAt)).fromNow()}
          </span>
        </div>
        <p className={cx("info-description")}>{props.data.description}</p>
        <div className={cx("footer")}>
          <div className={cx("actor")}>
            <div className={cx("actor-image")}>
              <img src={props.data.poster_Image_URL} alt=""></img>
            </div>
            <span className={cx("actor-name")}>
              {props.data.poster}{" "}
              {props.data.posterVIP && <CheckCircleIcon></CheckCircleIcon>}
            </span>
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
