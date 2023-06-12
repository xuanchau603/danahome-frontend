import style from "./ManageRate.module.scss";
import classNames from "classnames/bind";
import MyBreadCrumb from "../../components/MyBreadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ReplyIcon from '@mui/icons-material/Reply';

const cx = classNames.bind(style);

const items = [
  {
    href: "/",
    icon: <HomeIcon></HomeIcon>,
    text: "Trang chủ",
  },
  {
    href: "./manage-rate",
    text: "Quản lý đánh giá",
  },
];

function ManageRate() {
  return (
    <div className={cx("wrapper")}>
      <MyBreadCrumb items={items}></MyBreadCrumb>
      <h1>Quản lý đánh giá</h1>
      <div className={cx("manage-rate")}>
        <table>
          <tr>
            <th>Mã bài đánh giá</th>
            <th>Tiêu đề</th>
            <th>Nội dung bài đánh giá</th>
            <th>Mức đánh giá</th>
            <th>ID người dùng</th>
          </tr>
          <tr>
            <th>#acqrv510</th>
            <th>Tôi thực sự thích giao diện của website</th>
            <th>Giao diện cực thân thiện với người dùng, tôi có thể thanh thục nó trong chưa đầy 1 tiếng</th>
            <th>4.5</th>
            <th>#agvzx210</th>
          </tr>
          <tr>
          <th>#acqrv510</th>
            <th>Website đã giúp tôi rất nhiều</th>
            <th>Nhờ vào website mà tôi đã có thể tìm được căn hộ mong muốn mà không mất quá nhiều thời gian để tìm kiếm</th>
            <th>4.5</th>
            <th>#agvzx210</th>
          </tr>
        </table>
        <ul className={cx("btn-delete")}>
          <li className={cx("list-items")}>
            <RemoveCircleIcon></RemoveCircleIcon>
            <a href="/">Xoá</a>
          </li>
          <li className={cx("list-items")}>
            <RemoveCircleIcon></RemoveCircleIcon>
            <a href="/">Xoá</a>
          </li>
        </ul>
        <ul className={cx("btn-reply")}>
          <li className={cx("list-items")}>
            <ReplyIcon></ReplyIcon>
            <a href="/">Phản hồi</a>
          </li>
          <li className={cx("list-items")}>
            <ReplyIcon></ReplyIcon>
            <a href="/">Phản hồi</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ManageRate;
