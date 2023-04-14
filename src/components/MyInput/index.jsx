import { forwardRef, useState } from "react";
import style from "./MyInput.module.scss";
import classNames from "classnames/bind";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const cx = classNames.bind(style);

function MyInput(props, ref) {
  const [showPass, setShowPass] = useState(false);

  return (
    <>
      <div
        className={cx("form-group", {
          [props.classes]: props.classes,
        })}
      >
        <input
          name={props.name}
          value={props.value}
          id={props.id}
          ref={ref}
          type={props.type}
          onChange={props.onChange}
          onBlur={props.onBlur}
          placeholder=" "
        ></input>
        <label htmlFor={props.id}>{props.label}</label>
        <span className={cx("icon")}>{props.icon}</span>
        <span className={cx("error-message")}>{props.errorMessage}</span>
        {props.type === "password" && (
          <div className={cx("show-pass")}>
            {showPass && (
              <span
                onClick={() => {
                  ref.current.type = "password";
                  setShowPass(false);
                }}
              >
                <RemoveRedEyeIcon></RemoveRedEyeIcon>
              </span>
            )}
            {!showPass && (
              <span
                onClick={() => {
                  ref.current.type = "text";
                  setShowPass(true);
                }}
              >
                <VisibilityOffIcon></VisibilityOffIcon>
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default forwardRef(MyInput);
