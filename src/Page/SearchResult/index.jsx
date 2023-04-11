import style from "./SearchResult.module.scss";
import classNames from "classnames/bind";
import { Breadcrumb, Col, Row } from "antd";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

const cx = classNames.bind(style);

function SearchResult(props) {
  return (
    <div className={cx("wrapper")}>
      <div>
        <Breadcrumb
          separator=">"
          items={[
            {
              title: (
                <Link to={"/"} className={cx("bread-item")}>
                  <HomeIcon fontSize="large" />
                  <span>Trang chủ</span>
                </Link>
              ),
            },
            {
              title: (
                <div className={cx("bread-item")}>
                  <span>Kết quả tìm kiếm</span>
                </div>
              ),
            },
          ]}
        />
      </div>
      <h1 className={cx("title")}>
        Cho thuê Phòng trọ Đà Nẵng Giá từ 2 - 3 triệu đồng
      </h1>
      <p className={cx("sub-title")}>
        Cho thuê Phòng trọ Đà Nẵng Giá từ 2 - 3 triệu đồng , phòng mới xây,
        chính chủ gần chợ, trường học, siêu thị, cửa hàng tiện lợi, khu an ninh.
      </p>
      <div className={cx("suggets-address")}>
        <span className={cx("suggest-item")}>
          Liên Chiểu<small> (123)</small>
        </span>
        <span className={cx("suggest-item")}>
          Thanh Khê<small> (123)</small>
        </span>
        <span className={cx("suggest-item")}>
          Hải Châu<small> (123)</small>
        </span>
        <span className={cx("suggest-item")}>
          Sơn Trà<small> (123)</small>
        </span>
        <span className={cx("suggest-item")}>
          Ngũ Hành Sơn<small> (123)</small>
        </span>
        <span className={cx("suggest-item")}>
          Cẩm Lệ<small> (123)</small>
        </span>
        <span className={cx("suggest-item")}>
          Hòa Vang<small> (123)</small>
        </span>
        <span className={cx("suggest-item")}>
          Hòa Minh<small> (123)</small>
        </span>
      </div>
      <Row gutter={24}>
        <Col span={16}>
          <div className={cx("list-news")}>
            <h1 className={cx("list-news-title")}>Danh sách tin đăng</h1>
          </div>
        </Col>
        <Col span={8}>
          <div className={cx("quick-see")}></div>
        </Col>
      </Row>
    </div>
  );
}

export default SearchResult;
