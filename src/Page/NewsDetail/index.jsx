/* eslint-disable jsx-a11y/anchor-is-valid */
import style from "./NewsDetail.module.scss";
import classNames from "classnames/bind";
import HomeIcon from "@mui/icons-material/Home";
import MyBreadCrum from "../../components/MyBreadcrumb";
import { Col, Row, Skeleton, message } from "antd";
import QuickSee from "../../components/QuickSee";
import NewsRent from "../../components/NewsRent";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SellIcon from "@mui/icons-material/Sell";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TagIcon from "@mui/icons-material/Tag";
import { useSearchParams } from "react-router-dom";
import NewsAPI from "../../API/newsAPI";
import { useEffect, useState } from "react";
import Format from "../../components/Format";
import SimpleSlider from "../../components/SimpleSlider";
import MyButton from "../../components/MyButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PaidIcon from "@mui/icons-material/Paid";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CallIcon from "@mui/icons-material/Call";
import moment from "moment";
import {
  addToListNewsFavorite,
  removeFromListNewsFavorite,
} from "../../Redux/newsFavoriteSlice";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VerifiedIcon from "@mui/icons-material/Verified";

const cx = classNames.bind(style);

function NewsDetail() {
  const [newsInfo, setNewsInfo] = useState(null);

  const [params] = useSearchParams();
  const id = params.get("newsId");

  const dispatch = useDispatch();

  const { listNewsFavorite } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const getDetailNews = async () => {
      try {
        const respone = await NewsAPI.getDetailNewsById(id);
        if (respone.status === 200) {
          setNewsInfo(respone.data.data);
        } else {
          message.error(respone.message, 2);
        }
      } catch (error) {
        message.error("Không thể kết nối đến server", 2);
      }
    };

    getDetailNews();
  }, [id]);

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
      text: "Chi tiết tin",
    },
  ];

  const settingsSliderNewsBox = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    dots: true,
    prevArrow: (
      <MyButton classes={cx("btn-prev", "btn-slide")} primary>
        <ArrowBackIosIcon></ArrowBackIosIcon>
      </MyButton>
    ),
    nextArrow: (
      <MyButton classes={cx("btn-next", "btn-slide")} primary>
        <ArrowForwardIosIcon></ArrowForwardIosIcon>
      </MyButton>
    ),
  };

  return (
    <div className={cx("house-details")}>
      <MyBreadCrum items={items}></MyBreadCrum>
      <Row gutter={16}>
        <Col span={16}>
          {newsInfo ? (
            <div className={cx("left-content")}>
              <div className={cx("post-image")}>
                <SimpleSlider settings={settingsSliderNewsBox}>
                  {newsInfo.images.map((item) => {
                    return (
                      <div key={newsInfo.ID}>
                        <img src={item.image_URL} alt=""></img>
                      </div>
                    );
                  })}
                </SimpleSlider>
              </div>
              <div className={cx("post-header")}>
                <div className={cx("title")}>
                  {newsInfo.newsTypePrice === 10000 ? (
                    <>
                      <VerifiedIcon />
                      <VerifiedIcon />
                      <VerifiedIcon />{" "}
                      <h1 style={{ color: "#20710a" }}>
                        {newsInfo.title.toUpperCase()}
                      </h1>
                    </>
                  ) : (
                    <h1>{newsInfo.title}</h1>
                  )}

                  <small>
                    <RemoveRedEyeIcon></RemoveRedEyeIcon> {newsInfo.news_Views}{" "}
                    đã xem
                  </small>
                </div>
                <p>
                  Chuyên mục: <a href="#">{newsInfo.roomType}</a>
                </p>
                <div className={cx("post-address")}>
                  <LocationOnIcon></LocationOnIcon>
                  <p>
                    {`Địa chỉ: ${newsInfo.house_Number}, ${newsInfo.ward.name}, ${newsInfo.district.name}, ${newsInfo.province.name}`}
                  </p>
                </div>
                <div className={cx("post-attributes")}>
                  <div className={cx("post-price")}>
                    <SellIcon></SellIcon>
                    <p>{Format.formatPrice(newsInfo.price)}/tháng</p>
                  </div>
                  <div className={cx("post-acreage")}>
                    <SettingsEthernetIcon></SettingsEthernetIcon>
                    <p>{newsInfo.acreage}m2</p>
                  </div>
                  <div className={cx("post-published")}>
                    <AccessTimeIcon></AccessTimeIcon>
                    <p>{moment(new Date(newsInfo.createdAt)).fromNow()}</p>
                  </div>
                  <div className={cx("post-code")}>
                    <TagIcon></TagIcon>
                    <p>{newsInfo.ID}</p>
                  </div>
                </div>
              </div>
              <div className={cx("post-description")}>
                <h2>Thông tin mô tả</h2>
                <p>
                  {newsInfo.description.length > 30
                    ? `${newsInfo.description.replace(/(.{30})/g, "$1\n")}`
                    : `${newsInfo.description}`}
                </p>
              </div>
              <div className={cx("post-overview")}>
                <h2>Đặc điểm bài đăng</h2>
                <table>
                  <tbody>
                    <tr>
                      <td>Mã tin:</td>
                      <td>#{newsInfo.ID}</td>
                    </tr>
                    <tr>
                      <td>Khu vực:</td>
                      <td>
                        {newsInfo.district.name} {newsInfo.province.name}
                      </td>
                    </tr>
                    <tr>
                      <td>Loại tin rao:</td>
                      <td>{newsInfo.roomType}</td>
                    </tr>
                    <tr>
                      <td>Đối tượng thuê:</td>
                      <td>{newsInfo.object}</td>
                    </tr>
                    <tr>
                      <td>Gói tin:</td>
                      <td>{newsInfo.newsType}</td>
                    </tr>
                    <tr>
                      <td>Ngày đăng:</td>
                      <td>
                        {moment(new Date(newsInfo.createdAt)).format(
                          "DD/MM/YYYY, hh:mm:ss A"
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>Ngày hết hạn:</td>
                      <td>
                        {moment(new Date(newsInfo.expire_At)).format(
                          "DD/MM/YYYY, hh:mm:ss A"
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={cx("post-contact")}>
                <h2>Thông tin liên hệ</h2>
                <table>
                  <tbody>
                    <tr>
                      <td>Liên hệ:</td>
                      <td>{newsInfo.poster}</td>
                    </tr>
                    <tr>
                      <td>Điện thoại:</td>
                      <td>{newsInfo.poster_Phone}</td>
                    </tr>
                    <tr>
                      <td>Zalo:</td>
                      <td>{newsInfo.poster_Phone}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={cx("post-map")}>
                <h2>Bản đồ</h2>
                <p>
                  {`Địa chỉ: ${newsInfo.house_Number}, ${newsInfo.ward.name}, ${newsInfo.district.name}, ${newsInfo.province.name}`}
                </p>
              </div>
            </div>
          ) : (
            <Skeleton active></Skeleton>
          )}
        </Col>

        <Col span={8}>
          {newsInfo ? (
            <div className={cx("action-detail")}>
              <div className={cx("avatar")}>
                <img src={newsInfo.poster_Image_URL} alt=""></img>
              </div>
              <h1 className={cx("name")}>
                {newsInfo.poster}{" "}
                {newsInfo.posterVIP && <CheckCircleIcon></CheckCircleIcon>}
              </h1>
              <div className={cx("status")}>
                <FiberManualRecordIcon></FiberManualRecordIcon> Đang hoạt động
              </div>
              <div className={cx("action")}>
                <div className={cx("action-left")}>
                  <MyButton
                    classes={cx("btn")}
                    outline
                    onClick={() => {
                      const isFavorite = listNewsFavorite.listNewsFavorite.find(
                        (item) => item.newsId === newsInfo.ID
                      );
                      if (isFavorite) {
                        const index =
                          listNewsFavorite.listNewsFavorite.findIndex(
                            (item) => {
                              return item.newsId === newsInfo.ID;
                            }
                          );
                        dispatch(removeFromListNewsFavorite(index));
                      } else {
                        dispatch(
                          addToListNewsFavorite({
                            newsId: newsInfo.ID,
                            createAt: new Date().toLocaleString(),
                          })
                        );
                      }
                    }}
                  >
                    {listNewsFavorite.listNewsFavorite.find(
                      (item) => item.newsId === newsInfo.ID
                    ) ? (
                      <FavoriteIcon style={{ color: "red" }}></FavoriteIcon>
                    ) : (
                      <FavoriteBorderIcon></FavoriteBorderIcon>
                    )}{" "}
                    Yêu thích
                  </MyButton>
                </div>
                <div className={cx("action-right")}>
                  <MyButton
                    href={`tel:${newsInfo.poster_Phone}`}
                    classes={cx("btn")}
                    outline
                  >
                    <CallIcon></CallIcon> {newsInfo.poster_Phone}
                  </MyButton>
                </div>
              </div>
              <div className={cx("action-call")}>
                <MyButton
                  href={`https://zalo.me/${newsInfo.poster_Phone}`}
                  target={"_blank"}
                  classes={cx("btn")}
                  primary
                >
                  Nhắn Zalo
                </MyButton>
              </div>
            </div>
          ) : (
            <Skeleton active></Skeleton>
          )}
          <NewsRent></NewsRent>
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
        </Col>
      </Row>
    </div>
  );
}

export default NewsDetail;
