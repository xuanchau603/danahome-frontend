import { Radio, Space } from "antd";
import MyModal from "./../MyModal/index";
import style from "./Menu.module.scss";
import classNames from "classnames/bind";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";

const cx = classNames.bind(style);

function Menu(props) {
  const [value, setValue] = useState(1);
  const [history, setHistory] = useState([props.items]);
  const current = history[history.length - 1];

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <MyModal
      classes={props.classes}
      status={props.open}
      onCancel={props.onCancel}
    >
      <h2 className={cx("menu-title")}>{props.title}</h2>
      {/* {history.length > 1 && (
        <button
          onClick={() => {
            setHistory((prev) => prev.slice(0, prev.length - 1));
          }}
          className={cx("btn-back")}
        >
          <ArrowBackIcon fontSize="large"></ArrowBackIcon>
        </button>
      )} */}
      <div className={cx("list-option")}>
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            {history.map((item, index) => {
              //   const isParent = !!item.children;

              return (
                <Radio
                  key={index}
                  //   onClick={() => {
                  //     if (isParent) {
                  //       setHistory((prev) => {
                  //         return [...prev, item.children];
                  //       });
                  //     }
                  //   }}
                  value={item.name}
                >
                  <span className={cx("option")}>{item.name}</span>
                </Radio>
              );
            })}
          </Space>
        </Radio.Group>
      </div>
    </MyModal>
  );
}

export default Menu;
