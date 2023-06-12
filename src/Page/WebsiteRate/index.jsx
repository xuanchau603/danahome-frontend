import style from "./WebsiteRade.module.scss";
import classNames from "classnames/bind";
import MyBreadCrumb from "../../components/MyBreadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import React from "react";
import { Rate } from "antd";
import MyButton from "../../components/MyButton";

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
  return (
    <div className={cx("wrapper")}>
      <MyBreadCrumb items={items}></MyBreadCrumb>
      <h1>Đánh giá website</h1>
      <div className={cx("rate-select")}>
        <h2>Chọn mức đánh giá:</h2>
        <Rate allowHalf defaultValue={2.5} />
      </div>
      <div className={cx("rate-title")}>
        <h2>Tiêu đề</h2>
        <input type="text" />
      </div>
      <div className={cx("rate-content")}>
        <h2>Nội dung bài đánh giá</h2>
        <textarea className={cx("content")}></textarea>
      </div>
      <MyButton primary classes={cx("btn-submit")}>
        Tiếp theo
      </MyButton>
    </div>
  );
}

export default WebsiteRate;
