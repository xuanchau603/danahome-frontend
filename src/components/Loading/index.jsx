import style from "./Loading.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

function Loading(props) {
  return (
    <div className={cx("loader-container")}>
      <div className={cx("spinner")}></div>
    </div>
  );
}

export default Loading;
