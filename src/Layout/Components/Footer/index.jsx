import style from "./Footer.module.scss";
import classNames from "classnames/bind";
import logo from "../../../Image";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MyButton from "../../../components/MyButton";

const cx = classNames.bind(style);

function Footer() {
  return (
    <div className={cx("footer")}>
      <div className={cx("subcribe")}>
        <h1>
          Đăng ký để nhận nhiều thông tin <br></br>và cập nhật từ DanaHome
        </h1>
        <div className={cx("form-group")}>
          <input id="email" type="email" placeholder=" "></input>
          <label htmlFor="email">EMAIL</label>
          <span className={cx("icon")}>
            <MailOutlineIcon></MailOutlineIcon>
          </span>
          <MyButton primary classes={cx("button")}>
            Đăng ký
          </MyButton>
        </div>
      </div>
      <div className={cx("wrapper")}>
        <div className={cx("social")}>
          <div className={cx("logo")}>
            <img src={logo} alt="logo"></img>
          </div>
          <p className={cx("introduction")}>
            Chúng tôi cung cấp thông tin về nhà, trọ và chung cư để giúp mọi
            người có thể tìm thấy căn nhà mơ ước
          </p>
          <div className={cx("social-media")}>
            <button href="/" className={cx("social-app")}>
              <FacebookIcon></FacebookIcon>
            </button>
            <button href="/" className={cx("social-app")}>
              <TwitterIcon></TwitterIcon>
            </button>
            <button href="/" className={cx("social-app")}>
              <InstagramIcon></InstagramIcon>
            </button>
          </div>
        </div>
        <div className={cx("property")}>
          <h1>Kiểu loại</h1>
          <ul className={cx("type")}>
            <li>
              <a href="/">Nhà</a>
            </li>
            <li>
              <a href="/">Phòng trọ</a>
            </li>
            <li>
              <a href="/">Chung cư</a>
            </li>
          </ul>
        </div>
        <div className={cx("article")}>
          <h1>Tin tức</h1>
          <ul className={cx("type")}>
            <li>
              <a href="/">Tin mới</a>
            </li>
            <li>
              <a href="/">Tin phổ biến</a>
            </li>
            <li>
              <a href="/">Đọc nhiều nhất</a>
            </li>
            <li>
              <a href="/">Mẹo và thủ thuật</a>
            </li>
          </ul>
        </div>
        <div className={cx("contact")}>
          <h1>Liên hệ</h1>
          <p>16 Nguyễn Văn Linh </p>

          <p>0905-008-800 </p>
          <p>info@danahome.vn</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
