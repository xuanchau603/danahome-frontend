import style from "./WebsiteRade.module.scss";
import classNames from "classnames/bind";
import MyBreadCrumb from "../../components/MyBreadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import React, { useState } from "react";
import { Rate, message } from "antd";
import MyButton from "../../components/MyButton";
import reviewsAPI from "../../API/reviewsAPI";
import { useSelector } from "react-redux";
import { loadingEnd, loadingStart } from "../../Redux/loadingSlice";
import { useDispatch } from "react-redux";

const cx = classNames.bind(style);

const items = [
  {
    href: "/",
    icon: <HomeIcon></HomeIcon>,
    text: "Trang chủ",
  },
  {
    href: "./web-rate",
    text: "Đánh giá",
  },
];

function WebsiteRate() {
  const [point, setPoint] = useState();
  const [title, settitle] = useState();
  const [description, setDescription] = useState();

  const { auth } = useSelector((state) => {
    return state;
  });

  const dispatch = useDispatch();

  const ShowLoading = (active)=>{
    active ? dispatch(loadingStart()) : dispatch(loadingEnd());
  }

  const handleSubmitReview = async () => {
    ShowLoading(true)
    const response = await reviewsAPI.createReview(
      { point, title, description },
      auth.login.currentUser.access_Token,
    );
    if (response.status === 200) {
      message.success(response.data.message, 2);
    }
    ShowLoading(false)
  };

  return (
    <div className={cx("wrapper")}>
      <MyBreadCrumb items={items}></MyBreadCrumb>
      <h1>Đánh giá website</h1>
      <div className={cx("rate-select")}>
        <h2>Chọn mức đánh giá:</h2>
        <Rate
          onChange={(value) => {
            setPoint(value);
          }}
        />
      </div>
      <div className={cx("rate-title")}>
        <h2>Tiêu đề</h2>
        <input
          value={title}
          onChange={(e) => settitle(e.target.value)}
          type="text"
        />
      </div>
      <div className={cx("rate-content")}>
        <h2>Nội dung bài đánh giá</h2>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={cx("content")}
        ></textarea>
      </div>
      <MyButton
        disible={!point || !title || !description}
        onClick={handleSubmitReview}
        primary
        classes={cx("btn-submit")}
      >
        Gửi đánh giá
      </MyButton>
    </div>
  );
}

export default WebsiteRate;
