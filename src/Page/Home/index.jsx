import { Col, Row, Skeleton, message } from "antd";
import style from "./Home.module.scss";
import classNames from "classnames/bind";
import { banner } from "../../Image";
import MyButton from "./../../components/MyButton/index";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import StarIcon from "@mui/icons-material/Star";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StairsIcon from "@mui/icons-material/Stairs";
import CallIcon from "@mui/icons-material/Call";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import BathtubIcon from "@mui/icons-material/Bathtub";
import KingBedIcon from "@mui/icons-material/KingBed";
import CabinIcon from "@mui/icons-material/Cabin";
import HouseIcon from "@mui/icons-material/House";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Format from "../../components/Format";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SimpleSlider from "../../components/SimpleSlider";
import SearchBox from "../../components/SearchBox";
import { useEffect, useState } from "react";
import NewsAPI from "../../API/newsAPI";
import { NavLink, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadingEnd, loadingStart } from "../../Redux/loadingSlice";

const cx = classNames.bind(style);

function Home() {
  const [listHotNews, setListHotNews] = useState([]);
  const [roomTypeId, setRoomTypeId] = useState(
    "9789b48f-e417-11ed-99e0-ecf4bbc11824",
  );
  const dispath = useDispatch();

  const [searchParams] = useSearchParams();
  const url = searchParams.get("roomType");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getHotNews = async (params) => {
      try {
        dispath(loadingStart());
        const listHotNews = await NewsAPI.getHotNews(params);
        if (listHotNews.status === 200) {
          dispath(loadingEnd());
          return setListHotNews(listHotNews.data.data);
        } else {
          dispath(loadingEnd());
          message.error(listHotNews.message);
        }
      } catch (error) {
        dispath(loadingEnd());
        message.error("Không thể kết nối tới server", 2);
      }
    };
    getHotNews({ roomType: roomTypeId });
  }, [dispath, roomTypeId]);

  const settingsSliderNewsBox = {
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: (
      <MyButton classes={cx("btn-prev", "btn")} primary>
        <ArrowBackIosIcon></ArrowBackIosIcon>
      </MyButton>
    ),
    nextArrow: (
      <MyButton classes={cx("btn-next", "btn")} primary>
        <ArrowForwardIosIcon></ArrowForwardIosIcon>
      </MyButton>
    ),
  };

  const settingNewsReview = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <></>,
    nextArrow: <></>,
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("nav")}>
        <Row gutter={0}>
          <Col span={12}>
            <div className={cx("nav-left")}>
              <div className={cx("slogan")}>
                <p>Tìm kiếm nơi nuôi dưỡng</p>
                <p>
                  <b>ƯỚC MƠ</b> của bạn{" "}
                </p>
                <p>một cách dễ dàng nhất ở đây</p>
              </div>
              <div className={cx("sub-slogan")}>
                <p>Tất cả điều bạn cần để tìm một nơi sinh sống đều ở đây,</p>{" "}
                <p>Nơi bạn có thể tìm nó dễ nhất!</p>
              </div>
              <div className={cx("partner")}>
                <p>Đối tác của chúng tôi</p>
                <ul className={cx("list-partner")}>
                  <li>
                    <img
                      src="https://ik.imagekit.io/tvlk/blog/2020/01/Traveloka_Primary_Logo.png?tr=dpr-2,w-675"
                      alt=""
                    ></img>
                  </li>
                  <li>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Logo-tiket-com.png"
                      alt=""
                    ></img>
                  </li>
                  <li>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png"
                      alt=""
                    ></img>
                  </li>
                  <li>
                    <img
                      src="https://seeklogo.com/images/T/tripadvisor-logo-BCBFF13E11-seeklogo.com.png"
                      alt=""
                    ></img>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div className={cx("nav-right")}>
              <div className={cx("banner")}>
                <img src={banner} alt="" />
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <SearchBox></SearchBox>

      <div className={cx("news-box")}>
        <div className={cx("sub-title")}>
          <p></p>
          <span>Đề xuất của chúng tôi</span>
        </div>
        <div className={cx("news-action")}>
          <span className={cx("title")}>DANH SÁCH NỔI BẬT</span>
          <div className={cx("news-button")}>
            <NavLink
              onClick={() => {
                setRoomTypeId("9789b48f-e417-11ed-99e0-ecf4bbc11824");
              }}
              to={"/"}
              className={!url ? cx("button-item", "active") : cx("button-item")}
            >
              <HouseIcon fontSize="large"></HouseIcon> Nhà
            </NavLink>
            <NavLink
              onClick={() => {
                setRoomTypeId("8870c827-e417-11ed-99e0-ecf4bbc11824");
              }}
              to={"?roomType=motel"}
              className={
                url === "motel"
                  ? cx("button-item", "active")
                  : cx("button-item")
              }
            >
              <CabinIcon fontSize="large"></CabinIcon> Phòng trọ
            </NavLink>
            <NavLink
              onClick={() => {
                setRoomTypeId("97899ed0-e417-11ed-99e0-ecf4bbc11824");
              }}
              to={"?roomType=apartment"}
              className={
                url === "apartment"
                  ? cx("button-item", "active")
                  : cx("button-item")
              }
            >
              <ApartmentIcon fontSize="large"></ApartmentIcon> Chung cư
            </NavLink>
          </div>
          <div className={cx("new-slide")}>
            <MyButton primary classes={cx("btn")}>
              <ArrowBackIosIcon></ArrowBackIosIcon>
            </MyButton>
            <MyButton primary classes={cx("btn")}>
              <ArrowForwardIosIcon></ArrowForwardIosIcon>
            </MyButton>
          </div>
        </div>

        {listHotNews.length > 0 ? (
          <SimpleSlider settings={settingsSliderNewsBox}>
            {listHotNews.map((item) => {
              return (
                <div key={item.ID}>
                  <div className={cx("new-items")}>
                    <div className={cx("news-image")}>
                      <img src={item.featured_Image} alt=""></img>
                      <span className={cx("news-tag")}>
                        <WhatshotIcon fontSize="large"></WhatshotIcon> Tin VIP
                        nổi bật
                      </span>
                      <MyButton
                        to={`/news-detail?newsId=${item.ID}`}
                        classes={cx("btn-detail")}
                        primary
                      >
                        Xem ngay
                      </MyButton>
                    </div>
                    <div className={cx("news-name")}>
                      <span title={item.title}>{item.title}</span>
                    </div>
                    <div className={cx("news-price")}>
                      <span>{Format.formatPrice(item.price)}</span>
                    </div>
                    <div className={cx("news-actor")}>
                      <div className={cx("actor-avatar")}>
                        <img src={item.poster_Image_URL} alt=""></img>
                      </div>
                      <div className={cx("actor-info")}>
                        <p className={cx("actor-name")}>{item.poster}</p>
                        <p className={cx("actor-address")}>
                          {`${item.province} - ${item.district} - ${item.ward} - ${item.house_Number}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </SimpleSlider>
        ) : (
          <Skeleton active></Skeleton>
        )}
      </div>

      {listHotNews.length > 0 ? (
        <div className={cx("sale-ready")}>
          <Row gutter={30}>
            <Col span={12}>
              <div className={cx("sale-info")}>
                <div className={cx("sub-title")}>
                  <p></p>
                  <span>Sẵn sàng để lên sàng</span>
                </div>
                <h1 className={cx("title")}>
                  CÙNG THAM QUAN NHÀ CỦA<br></br> CHÚNG TÔI NÀO!
                </h1>
                <p className={cx("description")}>
                  Căn nhà được đề xuất bởi đồng nghiệp của chúng tôi đã sẵn sàng
                  trở thành căn nhà mơ ước cho giấc mơ của bạn
                </p>
                <div className={cx("house-detail")}>
                  <h2>Mô tả chi tiết</h2>
                  <div className={cx("info")}>
                    <span>
                      <KingBedIcon fontSize="large"></KingBedIcon> 4 phòng ngủ
                    </span>
                    <span>
                      <BathtubIcon fontSize="large"></BathtubIcon> 2 phòng tắm
                    </span>
                  </div>
                  <div className={cx("info")}>
                    <span>
                      <CarRepairIcon fontSize="large"></CarRepairIcon> 1 bãi đỗ
                      xe
                    </span>
                    <span>
                      <StairsIcon fontSize="large"></StairsIcon> 2 tầng lầu
                    </span>
                  </div>
                </div>
                <div className={cx("contact")}>
                  <div className={cx("actor-info")}>
                    <div className={cx("actor-image")}>
                      <img src={listHotNews[0].poster_Image_URL} alt=""></img>
                    </div>
                    <div className={cx("detail")}>
                      <p className={cx("actor-name")}>
                        {listHotNews[0].poster}
                      </p>
                      <p className={cx("actor-address")}>
                        {`${listHotNews[0].house_Number}, ${listHotNews[0].province}`}
                      </p>
                    </div>
                  </div>
                  <MyButton classes={cx("btn-contact")} primary>
                    <CallIcon></CallIcon> Liên hệ ngay
                  </MyButton>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className={cx("sale-image")}>
                <div className={cx("main-image")}>
                  <img src={listHotNews[0].featured_Image} alt=""></img>
                </div>
                <div className={cx("sub-image1")}>
                  <img src={listHotNews[0].featured_Image} alt=""></img>
                </div>
                <div className={cx("sub-image2")}>
                  <img src={banner} alt=""></img>
                  <img src={banner} alt=""></img>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <Skeleton active></Skeleton>
      )}

      <div className={cx("review")}>
        <div className={cx("sub-title")}>
          <p></p>
          <span>Xem đánh giá</span>
        </div>
        <h1 className={cx("title")}>Xem người dùng nói gì về chúng tôi</h1>
        <div className={cx("news-review")}>
          <SimpleSlider settings={settingNewsReview}>
            <div>
              <div className={cx("news-review-item")}>
                <div className={cx("main-image")}>
                  <img src={banner} alt=""></img>
                </div>
                <div className={cx("review")}>
                  <p className={cx("review-title")}>
                    Thật tuyệt! Tôi đã tìm thấy một ngôi nhà trong mơ thông qua
                    DaNaHome
                  </p>
                  <p className={cx("review-content")}>
                    Nhờ website này mà tôi đã kiếm được một ngôi nhà phù hợp với
                    lối sống và sở thích của mình một cách dễ dàng mà không cần
                    thông qua các bước phức tạp
                  </p>
                  <div className={cx("review-user")}>
                    <div className={cx("user-info")}>
                      <div className={cx("user-image")}>
                        <img src={banner} alt=""></img>
                      </div>
                      <div className={cx("user-detail")}>
                        <p className={cx("user-name")}>Lê Xuân Châu</p>
                        <p className={cx("user-address")}>
                          352 Nguyễn Tất Thành, Đà Nẵng
                        </p>
                      </div>
                    </div>
                    <div className={cx("vote")}>
                      <span>
                        <StarIcon></StarIcon> 4.6
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className={cx("news-review-item")}>
                <div className={cx("main-image")}>
                  <img src={banner} alt=""></img>
                </div>
                <div className={cx("review")}>
                  <p className={cx("review-title")}>
                    Thật tuyệt! Tôi đã tìm thấy một ngôi nhà trong mơ thông qua
                    DaNaHome
                  </p>
                  <p className={cx("review-content")}>
                    Nhờ website này mà tôi đã kiếm được một ngôi nhà phù hợp với
                    lối sống và sở thích của mình một cách dễ dàng mà không cần
                    thông qua các bước phức tạp
                  </p>
                  <div className={cx("review-user")}>
                    <div className={cx("user-info")}>
                      <div className={cx("user-image")}>
                        <img src={banner} alt=""></img>
                      </div>
                      <div className={cx("user-detail")}>
                        <p className={cx("user-name")}>Lê Xuân Châu</p>
                        <p className={cx("user-address")}>
                          352 Nguyễn Tất Thành, Đà Nẵng
                        </p>
                      </div>
                    </div>
                    <div className={cx("vote")}>
                      <span>
                        <StarIcon></StarIcon> 4.6
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className={cx("news-review-item")}>
                <div className={cx("main-image")}>
                  <img src={banner} alt=""></img>
                </div>
                <div className={cx("review")}>
                  <p className={cx("review-title")}>
                    Thật tuyệt! Tôi đã tìm thấy một ngôi nhà trong mơ thông qua
                    DaNaHome
                  </p>
                  <p className={cx("review-content")}>
                    Nhờ website này mà tôi đã kiếm được một ngôi nhà phù hợp với
                    lối sống và sở thích của mình một cách dễ dàng mà không cần
                    thông qua các bước phức tạp
                  </p>
                  <div className={cx("review-user")}>
                    <div className={cx("user-info")}>
                      <div className={cx("user-image")}>
                        <img src={banner} alt=""></img>
                      </div>
                      <div className={cx("user-detail")}>
                        <p className={cx("user-name")}>Lê Xuân Châu</p>
                        <p className={cx("user-address")}>
                          352 Nguyễn Tất Thành, Đà Nẵng
                        </p>
                      </div>
                    </div>
                    <div className={cx("vote")}>
                      <span>
                        <StarIcon></StarIcon> 4.6
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className={cx("news-review-item")}>
                <div className={cx("main-image")}>
                  <img src={banner} alt=""></img>
                </div>
                <div className={cx("review")}>
                  <p className={cx("review-title")}>
                    Thật tuyệt! Tôi đã tìm thấy một ngôi nhà trong mơ thông qua
                    DaNaHome
                  </p>
                  <p className={cx("review-content")}>
                    Nhờ website này mà tôi đã kiếm được một ngôi nhà phù hợp với
                    lối sống và sở thích của mình một cách dễ dàng mà không cần
                    thông qua các bước phức tạp
                  </p>
                  <div className={cx("review-user")}>
                    <div className={cx("user-info")}>
                      <div className={cx("user-image")}>
                        <img src={banner} alt=""></img>
                      </div>
                      <div className={cx("user-detail")}>
                        <p className={cx("user-name")}>Lê Xuân Châu</p>
                        <p className={cx("user-address")}>
                          352 Nguyễn Tất Thành, Đà Nẵng
                        </p>
                      </div>
                    </div>
                    <div className={cx("vote")}>
                      <span>
                        <StarIcon></StarIcon> 4.6
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SimpleSlider>
        </div>
      </div>
    </div>
  );
}

export default Home;
