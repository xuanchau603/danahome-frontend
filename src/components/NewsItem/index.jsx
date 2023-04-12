import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import style from "./NewsItem.module.scss";
import classNames from "classnames/bind";
import { banner } from "../../Image";

const cx = classNames.bind(style);

function NewsItem(props) {
  return (
    <div className={cx("news")}>
      <div className={cx("main-image")}>
        <img src={banner} alt=""></img>
        <span className={cx("image-count")}>19 ảnh</span>
        <span title="Lưu tin này" className={cx("love-icon")}>
          <FavoriteBorderIcon></FavoriteBorderIcon>
        </span>
      </div>
      <div className={cx("news-info")}>
        <h1 className={cx("title-news")}>
          NHÀ TRỌ CAO CẤP MỚI XÂY RẤT ĐẸP, THOÁNG MÁT, GẦN NGUYỄN HỮU THỌ VÀ LÊ
          ĐÌNH LÝ
        </h1>
        <div className={cx("info")}>
          <span className={cx("price", "info-item")}>2.2 triệu/tháng</span>
          <span className={cx("size", "info-item")}>27m²</span>
          <span className={cx("address", "info-item")}>
            Quận Cẩm Lệ, Đà Nẵng
          </span>
          <span className={cx("updated", "info-item")}>Hôm nay</span>
        </div>
        <p className={cx("info-description")}>
          Phòng trọ cao cấp mới xây, Có bếp, giường ngủ sẵn, gần trung tâm thành
          phố (Lê Đại Hành - Hà Tông Quyền- Nguyễn Hữu Thọ): cách chợ 100m, cách
          Trường:…
        </p>
        <div className={cx("footer")}>
          <div className={cx("actor")}>
            <div className={cx("actor-image")}>
              <img src={banner} alt=""></img>
            </div>
            <span className={cx("actor-name")}>Lê xuân châu</span>
          </div>
          <div className={cx("btn")}>
            <button>Đặt cọc ngay</button>
            <button>Gọi 0796504819</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
