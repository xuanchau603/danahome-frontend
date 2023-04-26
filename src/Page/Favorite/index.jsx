import style from "./Favorite.module.scss";
import classNames from "classnames/bind";
import { Col, Row, Skeleton } from "antd";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NewsItem from "./../../components/NewsItem/index";
import QuickSee from "./../../components/QuickSee/index";
import MyBreadCrum from "../../components/MyBreadcrumb";
import { empty } from "../../Image/index";

import HomeIcon from "@mui/icons-material/Home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import NewsAPI from "./../../API/newsAPI";
import { loadingEnd, loadingStart } from "../../Redux/loadingSlice";

const cx = classNames.bind(style);

function Favorite() {
  const [listFavoriteInfo, setListFavoriteInfo] = useState([]);

  const dispatch = useDispatch();

  const listNewsFavorite = useSelector((state) => {
    return state.listNewsFavorite.listNewsFavorite;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (listNewsFavorite.length > 0) {
      setListFavoriteInfo([]);
      const getListNewsFavorite = async () => {
        for (const item of listNewsFavorite) {
          dispatch(loadingStart());
          const response = await NewsAPI.getDetailNewsById(item.newsId);
          setListFavoriteInfo((prev) => [...prev, response.data.data]);
          dispatch(loadingEnd());
        }
      };
      getListNewsFavorite();
    } else {
      setListFavoriteInfo([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listNewsFavorite.length]);

  const itemsQuickSeeNews = [
    <span>
      <ChevronRightIcon></ChevronRightIcon> Nỗi khổ của người thuê phòng trọ gần
      thì đắt mà xa thì rẻ
    </span>,
    <span>
      <ChevronRightIcon></ChevronRightIcon>
      Các công ty chuyển nhà trọ uy tín nhất hiện nay
    </span>,
    <span>
      <ChevronRightIcon></ChevronRightIcon>
      Có nên đầu tư cho thuê căn hộ Azura không?
    </span>,
    <span>
      <ChevronRightIcon></ChevronRightIcon>
      Top 5 trang web thuê nhà nguyên căn giá rẻ tại Việt Nam
    </span>,
    <span>
      <ChevronRightIcon></ChevronRightIcon>
      Điểm nổi bật của căn hộ Legacy Centrel là gì?
    </span>,
    <span>
      <ChevronRightIcon></ChevronRightIcon>
      Lý do khiến căn hộ C River view là nơi đáng sống tại Bình Dương
    </span>,
  ];

  const itemsCare = [
    <span>
      <ChevronRightIcon></ChevronRightIcon> Mẫu hợp đồng cho thuê phòng trọ
    </span>,
    <span>
      <ChevronRightIcon></ChevronRightIcon>
      Cẩn thận các kiểu lửa đảo khi thuê phòng trọ
    </span>,
    <span>
      <ChevronRightIcon></ChevronRightIcon>
      Kinh nghiệm thuê phòng trọ cho Sinh Viên
    </span>,
  ];

  const items = [
    {
      href: "/",
      icon: <HomeIcon></HomeIcon>,
      text: "Trang chủ",
    },
    {
      text: "Trang yêu thích",
    },
  ];

  return (
    <div className={cx("favorite")}>
      <MyBreadCrum items={items}></MyBreadCrum>

      <h1 className={cx("title")}>Tin đã lưu</h1>
      <Row gutter={16}>
        <Col span={16}>
          {listFavoriteInfo.length > 0 ? (
            <ul className={cx("list-favorite")}>
              {listFavoriteInfo.map((item) => {
                return <NewsItem key={item.ID} data={item}></NewsItem>;
              })}
            </ul>
          ) : (
            <div className={cx("empty")}>
              <img src={empty} alt=""></img>
              <h1>Danh sách rỗng</h1>
            </div>
          )}
        </Col>
        <Col span={8}>
          <div className={cx("sidebar")}>
            <div className={cx("category")}>
              <h1>Danh mục cho thuê</h1>
              <ul className={cx("cate-list")}>
                <li className={cx("main")}>
                  <div className={cx("cate-items")}>
                    <ChevronRightIcon></ChevronRightIcon>
                    <h2>
                      <a href="/">Cho thuê phòng trọ</a>
                    </h2>
                  </div>
                  <p>(49.212)</p>
                </li>
                <li className={cx("main")}>
                  <div className={cx("cate-items")}>
                    <ChevronRightIcon></ChevronRightIcon>
                    <h2>
                      <a href="/">Cho thuê nhà nguyên căn</a>
                    </h2>
                  </div>
                  <p>(8.954)</p>
                </li>
                <li className={cx("main")}>
                  <div className={cx("cate-items")}>
                    <ChevronRightIcon></ChevronRightIcon>
                    <h2>
                      <a href="/">Cho thuê căn hộ</a>
                    </h2>
                  </div>
                  <p>(9.520)</p>
                </li>
                <li className={cx("sub")}>
                  <ChevronRightIcon></ChevronRightIcon>
                  <h2>
                    <a href="/">Cho thuê căn hộ mini</a>
                  </h2>
                </li>
                <li className={cx("sub")}>
                  <ChevronRightIcon></ChevronRightIcon>
                  <h2>
                    <a href="/">Cho thuê dịch vụ</a>
                  </h2>
                </li>
                <li className={cx("main")}>
                  <div className={cx("cate-items")}>
                    <ChevronRightIcon></ChevronRightIcon>
                    <h2>
                      <a href="/">Cho thuê mặt bằng</a>
                    </h2>
                  </div>
                  <p>(2.050)</p>
                </li>
                <li className={cx("main")}>
                  <div className={cx("cate-items")}>
                    <ChevronRightIcon></ChevronRightIcon>
                    <h2>
                      <a href="/">Cho thuê ở ghép</a>
                    </h2>
                  </div>
                  <p>(16.608)</p>
                </li>
              </ul>
            </div>
            <QuickSee
              classes={cx("care")}
              title="Bài viết mới"
              items={itemsQuickSeeNews}
            ></QuickSee>
            <QuickSee
              classes={cx("care")}
              title="Có thể bạn quan tâm"
              items={itemsCare}
            ></QuickSee>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Favorite;
