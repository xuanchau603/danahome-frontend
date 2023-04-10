import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider(props) {
  var settings = props.settings;
  return (
    <div className="container" style={{ marginTop: "6rem" }}>
      <Slider {...settings}>{props.children}</Slider>
    </div>
  );
}
