import style from "./Contact.module.scss";
import HomeIcon from "@mui/icons-material/Home";
import MyBreadCrumb from "../../components/MyBreadcrumb";
import classNames from "classnames/bind";
import MyButton from "../../components/MyButton";

const cx = classNames.bind(style);

const items = [
  {
    href: "/",
    icon: <HomeIcon></HomeIcon>,
    text: "Trang chủ",
  },
  {
    href: "./contact",
    text: "Liên hệ",
  },
];

function Contact() {
  return (
    <div className={cx("wrapper")}>
      <MyBreadCrumb items={items}></MyBreadCrumb>
      <h1>Liên hệ</h1>
      <p>
        Bạn cần hỗ trợ? DanaHome rất hân hạnh được hỗ trợ bạn, hãy để lại thông
        tin ở bên dưới. Chúng tôi sẽ xử lý yêu cầu và phản hồi nhanh nhất có thể
      </p>
        <div className={cx("username")}>
          <p>Họ và tên </p>
          <input type="text" placeholder="Họ và tên" />
        </div>
        <div className={cx("email")}>
          <p>Email </p>
          <input type="text" placeholder="Email" />
        </div>
      <div className={cx("message")}>
        <p>Nội dung lời nhắn</p>
        <textarea></textarea>
      </div>
      <MyButton primary classes={cx("btn-send")}>
        Gửi
      </MyButton>
    </div>
  );
}

export default Contact;
