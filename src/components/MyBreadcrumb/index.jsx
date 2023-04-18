import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import style from "./MyBreadcrumb.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

function MyBreadCrumb(props) {
  const items = props.items.map((item, index) => {
    const to = item.href ? item.href : "";
    return {
      title: (
        <Link to={to} key={index} className={cx("bread-item")}>
          {item.icon}
          <span>{item.text}</span>
        </Link>
      ),
    };
  });

  return <Breadcrumb separator=">" items={items} />;
}

export default MyBreadCrumb;
