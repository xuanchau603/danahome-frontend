import style from "./ManageRate.module.scss";
import classNames from "classnames/bind";
import MyBreadCrumb from "../../components/MyBreadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ReplyIcon from "@mui/icons-material/Reply";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import MyButton from "../../components/MyButton";
import reviewsAPI from "../../API/reviewsAPI";
import { useSelector } from "react-redux";

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
  const [MenuRate, setMenuRate] = useState();
  const [reviews, setReviews] = useState([]);
  const { auth } = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    const getStatistics = async () => {
      const response = await reviewsAPI.getAllReviews(
        auth.login.currentUser.access_Token,
      );
      if (response.status === 200) {
        setReviews(response.data.data);
      }
    };
    getStatistics();
  }, []);

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
            <th>Người đánh giá</th>
          </tr>
          {reviews.length > 0
            ? reviews.map((item) => {
                return (
                  <tr>
                    <th>#{item.ID.split("-")[0]}</th>
                    <th>{item.title}</th>
                    <th>{item.description}</th>
                    <th>{item.point}</th>
                    <th>{item.user.full_Name}</th>
                  </tr>
                );
              })
            : null}
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
            <NavLink
              onClick={() => {
                setMenuRate(true);
              }}
              href="#"
            >
              Phản hồi
            </NavLink>
          </li>
          <li className={cx("list-items")}>
            <ReplyIcon></ReplyIcon>
            <NavLink
              onClick={() => {
                setMenuRate(true);
              }}
              href="#"
            >
              Phản hồi
            </NavLink>
          </li>
        </ul>
        {MenuRate && (
          <Menu
            classes={cx("menu-status")}
            onCancel={() => {
              setMenuRate(false);
            }}
            open={MenuRate}
            title={`Thêm loại phòng`}
          >
            <div className={cx("container")}>
              <div className={cx("form-group")}>
                <b>Mã bài đánh giá:</b>
                <input type="text" disabled placeholder="#0001" />
              </div>
              <div className={cx("form-group")}>
                <b>Tiêu đề:</b>
                <input type="text" />
              </div>
              <div className={cx("form-group")}>
                <b>Nội dung:</b>
                <input type="text" />
              </div>
              <MyButton primary classes={cx("btn-confirm")}>
                Phản hồi
              </MyButton>
            </div>
          </Menu>
        )}
      </div>
    </div>
  );
}

export default ManageRate;
