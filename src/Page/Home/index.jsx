import { Col, Row } from "antd";
import style from "./Home.module.scss";
import classNames from "classnames/bind";
import { banner } from "../../Image";
import MyButton from "./../../components/MyButton/index";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoneyIcon from "@mui/icons-material/Money";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";

const cx = classNames.bind(style);

function Home() {
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
            <div className={cx("form-group")}>
              <label htmlFor="type">
                <MapsHomeWorkIcon fontSize="large"></MapsHomeWorkIcon>
              </label>
              <input id="type" type="submit" value={"Loại"} />
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="type">
                <LocationOnIcon fontSize="large"></LocationOnIcon>
              </label>
              <input id="type" type="submit" value={"Địa chỉ"} />
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="type">
                <MoneyIcon fontSize="large"></MoneyIcon>{" "}
              </label>
              <input id="type" type="submit" value={"Giá cả"} />
            </div>
            <div className={cx("form-group")}>
              <label htmlFor="type">
                <AspectRatioIcon fontSize="large"></AspectRatioIcon>
              </label>
              <input id="type" type="submit" value={"Diện tích"} />
            </div>
          </div>

          <MyButton
            onClick={() => alert("thanh ngu")}
            classes={cx("btn-search")}
            primary
          >
            Tìm kiếm
          </MyButton>
        </div>
      </div>
    </div>
  );
}

export default Home;
