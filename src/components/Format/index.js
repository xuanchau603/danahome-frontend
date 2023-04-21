import moment from "moment";

moment.updateLocale("en", {
  relativeTime: {
    future: "trong %s",
    past: "%s trước",
    s: "vài giây trước",
    ss: "%d giây",
    m: "một giây",
    mm: "%d phút",
    h: "một giờ",
    hh: "%d giờ",
    d: "một ngày",
    dd: "%d ngày",
    M: "một tháng",
    MM: "%d tháng",
    y: "một năm",
    yy: "%d năm",
  },
});

const Format = {
  formatDate: (data) => {
    const date = new Date(data);
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    const h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (m < 10) {
      m = "0" + m;
    }
    if (s < 10) {
      s = "0" + s;
    }
    return (data = `${dd}/ ${mm}/ ${yyyy} | ${h}:${m}:${s}`);
  },
  formatStatusOrder: (status) => {
    if (status === 0) {
      return <b style={{ color: "#d9ce04" }}>Chờ xác nhận</b>;
    } else if (status === 1) {
      return <b style={{ color: "#0abf3a" }}>Đã xác nhận</b>;
    }
    return <b style={{ color: "#cf0c0c" }}>Đã hủy</b>;
  },
  formatPrice: (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  },
};

export default Format;
