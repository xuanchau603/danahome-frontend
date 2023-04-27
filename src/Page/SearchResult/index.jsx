import style from "./SearchResult.module.scss";
import classNames from "classnames/bind";
import { Col, Pagination, Row, message } from "antd";
import { useEffect, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NewsItem from "../../components/NewsItem";
import QuickSee from "../../components/QuickSee";
import MyBreadCrum from "../../components/MyBreadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import NewsAPI from "../../API/newsAPI";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadingEnd, loadingStart } from "../../Redux/loadingSlice";
import { notFound } from "../../Image";
import moment from "moment";

const cx = classNames.bind(style);

function SearchResult(props) {
  const [active, setActive] = useState("default");
  const [totalPagination, setTotalPagination] = useState(0);
  const [searchResults, setSreachResult] = useState([]);
  const [orderBy, setOrderBy] = useState("createdAt");
  const [orderType, setOderType] = useState("DESC");
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const onChange = (page) => {
    setPage(page);
  };

  const [searchParam] = useSearchParams();
  const roomsTypeName = searchParam.get("typeName");
  const roomsType = searchParam.get("type");
  const province = searchParam.get("province");
  const district = searchParam.get("district");
  const ward = searchParam.get("ward");
  const priceFrom = searchParam.get("priceFrom");
  const priceTo = searchParam.get("priceTo");
  const acreageFrom = searchParam.get("acreageFrom");
  const acreageTo = searchParam.get("acreageTo");

  const itemsQuickSeePrice = [
    <span>
      <ChevronRightIcon></ChevronRightIcon>
      Dưới 1 triệu
    </span>,
    <span>
      <ChevronRightIcon></ChevronRightIcon>
      Từ 2 đến 3 triệu
    </span>,
    <span>
      <ChevronRightIcon></ChevronRightIcon>
      Từ 1 đến 2 triệu
    </span>,
    <span>
      <ChevronRightIcon></ChevronRightIcon>
      Từ 3 đến 5 triệu
    </span>,
    <span>
      <ChevronRightIcon></ChevronRightIcon>
      Từ 5 đến 7 triệu
    </span>,
    <span>
      <ChevronRightIcon></ChevronRightIcon>
      Từ 7 đến 10 triệu
    </span>,
    <span>
      <ChevronRightIcon></ChevronRightIcon>
      Từ 10 đến 15 triệu
    </span>,
    <span>
      <ChevronRightIcon></ChevronRightIcon>
      Trên 15 triệu
    </span>,
  ];

  const itemsQuickSeeSize = [
    <span>
      <ChevronRightIcon></ChevronRightIcon>
      Dưới 20 m2
    </span>,
    <span>
      <ChevronRightIcon></ChevronRightIcon>
      Từ 20 đến 30 m2
    </span>,
    <span>
      <ChevronRightIcon></ChevronRightIcon>
      Từ 30 đến 50 m2
    </span>,
    <span>
      <ChevronRightIcon></ChevronRightIcon>
      Từ 50 đến 70 m2
    </span>,
    <span>
      <ChevronRightIcon></ChevronRightIcon>
      Từ 70 đến 90 m2
    </span>,
    <span>
      <ChevronRightIcon></ChevronRightIcon>
      Trên 90 m2
    </span>,
  ];
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
  const itemsQuickSeeCare = [
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

  const itemsBread = [
    {
      href: "/",
      icon: <HomeIcon></HomeIcon>,
      text: "Trang chủ",
    },
    {
      text: "Kết quả tìm kiếm",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    const filer = {
      roomsType: roomsType || undefined,
      province: province || undefined,
      district: district || undefined,
      ward: ward || undefined,
      priceFrom: priceFrom || undefined,
      priceTo: priceTo || undefined,
      acreageFrom: acreageFrom || undefined,
      acreageTo: acreageTo || undefined,
      orderBy: orderBy,
      orderType: orderType,
      page: page,
    };

    const getSearchResult = async () => {
      try {
        dispatch(loadingStart());
        const responese = await NewsAPI.searchNews(filer);
        if (responese.status === 200) {
          setSreachResult(responese.data.data);
          setTotalPagination(responese.data.totalNews);
          dispatch(loadingEnd());
        } else {
          message.error(responese.message);
          dispatch(loadingEnd());
        }
      } catch (error) {
        message.error("Không thể kết nối đến server", 2);
        dispatch(loadingEnd());
      }
    };
    getSearchResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    acreageFrom,
    acreageTo,
    district,
    priceFrom,
    priceTo,
    province,
    roomsType,
    searchParam,
    ward,
    orderBy,
    orderType,
    page,
  ]);

  return (
    <div className={cx("wrapper")}>
      <MyBreadCrum items={itemsBread}></MyBreadCrum>
      <h1 className={cx("title")}>
        {`Cho thuê ${roomsTypeName || "bất động sản"} ${province || ""} ${
          district || ""
        } ${ward || ""}${
          priceFrom || priceTo
            ? `, Giá từ ${priceFrom} triệu ${
                priceFrom === priceTo ? `` : `đến ${priceTo} triệu`
              }`
            : ""
        } ${
          acreageFrom || acreageTo
            ? `, Diện tích ${acreageFrom} m2 ${
                acreageFrom === acreageTo ? `` : `đến ${acreageTo} m2`
              }`
            : ""
        }`}
      </h1>
      {/* <p className={cx("sub-title")}>
        Cho thuê Phòng trọ Đà Nẵng Giá từ 2 - 3 triệu đồng , phòng mới xây,
        chính chủ gần chợ, trường học, siêu thị, cửa hàng tiện lợi, khu an ninh.
      </p> */}
      {/* <div className={cx("suggets-address")}>
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
      </div> */}
      <Row gutter={24}>
        <Col span={16}>
          <div className={cx("list-news")}>
            <div className={cx("list-news-top")}>
              <h1>Danh sách tin đăng</h1>
              <span className={cx("update-at")}>
                Cập nhật lúc:{" "}
                {moment(new Date()).format("DD/MM/YYYY, hh:mm:ss A")}
              </span>
            </div>
            {searchResults.length > 0 && (
              <div className={cx("sort")}>
                Sắp xếp:
                <span
                  className={
                    active === "default"
                      ? cx("sort-item", "active")
                      : cx("sort-item")
                  }
                  onClick={() => {
                    setActive("default");
                    setOderType("DESC");
                    setOrderBy("createdAt");
                  }}
                >
                  Mặc định
                </span>
                <span
                  className={
                    active === "new"
                      ? cx("sort-item", "active")
                      : cx("sort-item")
                  }
                  onClick={() => {
                    setActive("new");
                    setOderType("DESC");
                    setOrderBy("createdAt");
                  }}
                >
                  Mới nhất
                </span>
                <span
                  className={
                    active === "desc"
                      ? cx("sort-item", "active")
                      : cx("sort-item")
                  }
                  onClick={() => {
                    setActive("desc");
                    setOrderBy("price");
                    setOderType("DESC");
                  }}
                >
                  Giá cao đến thấp
                </span>
                <span
                  className={
                    active === "acs"
                      ? cx("sort-item", "active")
                      : cx("sort-item")
                  }
                  onClick={() => {
                    setActive("acs");
                    setOrderBy("price");
                    setOderType("ASC");
                  }}
                >
                  Giá thấp đến cao
                </span>
              </div>
            )}
            {searchResults.length > 0 ? (
              searchResults.map((item) => {
                return <NewsItem key={item.ID} data={item}></NewsItem>;
              })
            ) : (
              <div className={cx("not-found")}>
                <img src={notFound} alt=""></img>
                <h1>Không tìm thấy kết quả phù hợp</h1>
              </div>
            )}
          </div>
        </Col>
        <Col span={8}>
          <QuickSee title="Xem theo giá" items={itemsQuickSeePrice}></QuickSee>
          <QuickSee
            title="Xem theo diện tích"
            items={itemsQuickSeeSize}
          ></QuickSee>
          <QuickSee
            classes={cx("related")}
            title="Bài viết mới"
            items={itemsQuickSeeNews}
          ></QuickSee>
          <QuickSee
            classes={cx("related")}
            title="Có thể bạn quan tâm"
            items={itemsQuickSeeCare}
          ></QuickSee>
        </Col>
      </Row>
      <div className={cx("pagination")}>
        <Pagination
          current={page}
          onChange={onChange}
          total={totalPagination}
          pageSize={10}
          showSizeChanger
          showQuickJumper
          // showTotal={(total) => `Total ${total} items`}
        />
      </div>
    </div>
  );
}

export default SearchResult;
