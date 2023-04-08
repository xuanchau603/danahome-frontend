import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MyButton from "../MyButton";
import classNames from "classnames/bind";
import style from "./Slider.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const cx = classNames.bind(style);

export default function SimpleSlider(props) {
  var settings = {
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
    // autoplay: true,
    // autoplaySpeed: 1000,
  };
  return (
    <div className="container" style={{ marginTop: "6rem" }}>
      <Slider {...settings}>{props.children}</Slider>
    </div>
  );
}
