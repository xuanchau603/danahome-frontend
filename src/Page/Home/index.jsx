import { Col, Radio, Row, Space } from "antd";
import style from "./Home.module.scss";
import classNames from "classnames/bind";
import { banner } from "../../Image";
import MyButton from "./../../components/MyButton/index";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoneyIcon from "@mui/icons-material/Money";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CabinIcon from "@mui/icons-material/Cabin";
import HouseIcon from "@mui/icons-material/House";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../../components/Menu";
import Format from "../../components/Format";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SimpleSlider from "../../components/SimpleSlider";
const cx = classNames.bind(style);

function Home() {
  const [showMenuType, setShowMenuType] = useState(false);
  const [province, setProvince] = useState([]);

  const onCancelMenuType = () => {
    setShowMenuType(false);
  };

  const getProvince = async () => {
    const res = await axios.get("https://provinces.open-api.vn/api/?depth=1");
    setProvince(res.data);
  };
  useEffect(() => {
    getProvince();
  }, []);

  // const menuItemsType1 = [
  //   {
  //     code: 1,
  //     value: "Nhà",
  //     children: {
  //       data: [
  //         {
  //           code: 1,
  //           value: "Nhà 1",
  //         },
  //         {
  //           code: 2,
  //           value: "Nhà 2",
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     code: 2,
  //     value: "Phòng trọ",
  //   },
  //   {
  //     code: 3,
  //     value: "Chung cư",
  //   },
  // ];

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

      <div className={cx("search-box")}>
        <h2 className={cx("title")}>Tìm kiếm nơi ở phù hợp với bản thân</h2>
        <div className={cx("search-action")}>
          <div className={cx("search-input")}>
            <div
              onClick={() => setShowMenuType(true)}
              className={cx("form-group")}
            >
              <label htmlFor="type">
                <MapsHomeWorkIcon fontSize="large"></MapsHomeWorkIcon>
              </label>
              <input id="type" type="submit" value={"Loại"} />
              <span className={cx("more")}>
                <ChevronRightIcon fontSize="large"></ChevronRightIcon>
              </span>
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="type">
                <LocationOnIcon fontSize="large"></LocationOnIcon>
              </label>
              <input id="type" type="submit" value={"Địa chỉ"} />
              <span className={cx("more")}>
                <ChevronRightIcon fontSize="large"></ChevronRightIcon>
              </span>
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="type">
                <MoneyIcon fontSize="large"></MoneyIcon>{" "}
              </label>
              <input id="type" type="submit" value={"Giá cả"} />
              <span className={cx("more")}>
                <ChevronRightIcon fontSize="large"></ChevronRightIcon>
              </span>
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="type">
                <AspectRatioIcon fontSize="large"></AspectRatioIcon>
              </label>
              <input id="type" type="submit" value={"Diện tích"} />
              <span className={cx("more")}>
                <ChevronRightIcon fontSize="large"></ChevronRightIcon>
              </span>
            </div>
          </div>

          <MyButton
            onClick={() => alert("thanh ngu")}
            classes={cx("btn-search")}
            primary
          >
            Tìm kiếm
          </MyButton>
          <Menu
            classes={cx("menu-type")}
            open={showMenuType}
            onCancel={onCancelMenuType}
            title={"Chọn loại bất động sản"}
            items={province}
          ></Menu>
        </div>
      </div>

      <div className={cx("news-box")}>
        <div className={cx("sub-title")}>
          <p></p>
          <span>Đề xuất của chúng tôi</span>
        </div>
        <div className={cx("news-action")}>
          <span className={cx("title")}>DANH SÁCH NỔI BẬT</span>
          <div className={cx("news-button")}>
            <button className={cx("button-item", "active")}>
              <HouseIcon fontSize="large"></HouseIcon> Nhà
            </button>
            <button className={cx("button-item")}>
              <CabinIcon fontSize="large"></CabinIcon> Phòng trọ
            </button>
            <button className={cx("button-item")}>
              <ApartmentIcon fontSize="large"></ApartmentIcon> Chung cư
            </button>
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

        <SimpleSlider>
          <div>
            <div className={cx("new-items")}>
              <div className={cx("news-image")}>
                <img src={banner} alt=""></img>
                <span className={cx("news-tag")}>
                  <WhatshotIcon fontSize="large"></WhatshotIcon> Phổ biến
                </span>
                <MyButton classes={cx("btn-detail")} primary>
                  Xem ngay
                </MyButton>
              </div>
              <div className={cx("news-name")}>
                <span>Roselands House</span>
              </div>
              <div className={cx("news-price")}>
                <span>{Format.formatPrice(350000000)}</span>
              </div>
              <div className={cx("news-actor")}>
                <div className={cx("actor-avatar")}>
                  <img src={banner} alt=""></img>
                </div>
                <div className={cx("actor-info")}>
                  <p className={cx("actor-name")}>Lê Xuân Châu</p>
                  <p className={cx("actor-address")}>
                    1041 Nguyễn tất thành, Đà Nẵng
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={cx("new-items")}>
              <div className={cx("news-image")}>
                <img src={banner} alt=""></img>
                <span className={cx("news-tag")}>
                  <WhatshotIcon fontSize="large"></WhatshotIcon> Phổ biến
                </span>
                <MyButton classes={cx("btn-detail")} primary>
                  Xem ngay
                </MyButton>
              </div>
              <div className={cx("news-name")}>
                <span>Roselands House</span>
              </div>
              <div className={cx("news-price")}>
                <span>{Format.formatPrice(350000000)}</span>
              </div>
              <div className={cx("news-actor")}>
                <div className={cx("actor-avatar")}>
                  <img src={banner} alt=""></img>
                </div>
                <div className={cx("actor-info")}>
                  <p className={cx("actor-name")}>Lê Xuân Châu</p>
                  <p className={cx("actor-address")}>
                    1041 Nguyễn tất thành, Đà Nẵng
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={cx("new-items")}>
              <div className={cx("news-image")}>
                <img src={banner} alt=""></img>
                <span className={cx("news-tag")}>
                  <WhatshotIcon fontSize="large"></WhatshotIcon> Phổ biến
                </span>
                <MyButton classes={cx("btn-detail")} primary>
                  Xem ngay
                </MyButton>
              </div>
              <div className={cx("news-name")}>
                <span>Roselands House</span>
              </div>
              <div className={cx("news-price")}>
                <span>{Format.formatPrice(350000000)}</span>
              </div>
              <div className={cx("news-actor")}>
                <div className={cx("actor-avatar")}>
                  <img src={banner} alt=""></img>
                </div>
                <div className={cx("actor-info")}>
                  <p className={cx("actor-name")}>Lê Xuân Châu</p>
                  <p className={cx("actor-address")}>
                    1041 Nguyễn tất thành, Đà Nẵng
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={cx("new-items")}>
              <div className={cx("news-image")}>
                <img src={banner} alt=""></img>
                <span className={cx("news-tag")}>
                  <WhatshotIcon fontSize="large"></WhatshotIcon> Phổ biến
                </span>
                <MyButton classes={cx("btn-detail")} primary>
                  Xem ngay
                </MyButton>
              </div>
              <div className={cx("news-name")}>
                <span>Roselands House</span>
              </div>
              <div className={cx("news-price")}>
                <span>{Format.formatPrice(350000000)}</span>
              </div>
              <div className={cx("news-actor")}>
                <div className={cx("actor-avatar")}>
                  <img src={banner} alt=""></img>
                </div>
                <div className={cx("actor-info")}>
                  <p className={cx("actor-name")}>Lê Xuân Châu</p>
                  <p className={cx("actor-address")}>
                    1041 Nguyễn tất thành, Đà Nẵng
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={cx("new-items")}>
              <div className={cx("news-image")}>
                <img src={banner} alt=""></img>
                <span className={cx("news-tag")}>
                  <WhatshotIcon fontSize="large"></WhatshotIcon> Phổ biến
                </span>
                <MyButton classes={cx("btn-detail")} primary>
                  Xem ngay
                </MyButton>
              </div>
              <div className={cx("news-name")}>
                <span>Roselands House</span>
              </div>
              <div className={cx("news-price")}>
                <span>{Format.formatPrice(350000000)}</span>
              </div>
              <div className={cx("news-actor")}>
                <div className={cx("actor-avatar")}>
                  <img src={banner} alt=""></img>
                </div>
                <div className={cx("actor-info")}>
                  <p className={cx("actor-name")}>Lê Xuân Châu</p>
                  <p className={cx("actor-address")}>
                    1041 Nguyễn tất thành, Đà Nẵng
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SimpleSlider>
      </div>
    </div>
  );
}

export default Home;
