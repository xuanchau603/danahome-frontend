import MyModal from "./../MyModal/index";
import style from "./Menu.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

function Menu(props) {
  return (
    <>
      <MyModal
        classes={props.classes}
        status={props.open}
        onCancel={props.onCancel}
      >
        <h2 className={cx("menu-title")}>{props.title}</h2>
        {props.children}
      </MyModal>
    </>
  );
}

export default Menu;
