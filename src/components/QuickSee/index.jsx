import style from "./QuickSee.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

function QuickSee(props) {
  return (
    <div className={cx("quick-see")}>
      <h1 className={cx("quick-title")}>{props.title}</h1>
      <div className={cx("quick-list")}>
        {props.items.map((item, index) => {
          return (
            <div key={index} className={cx("quick-item", props.classes)}>
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default QuickSee;
