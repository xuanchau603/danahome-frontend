import { useRef, useState } from "react";
import style from "./MyInput.module.scss";
import classNames from "classnames/bind";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const cx = classNames.bind(style);

function MyInput(props) {
  const [showPass, setShowPass] = useState(false);
  const passwordRef = useRef();

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
          ref={passwordRef}
          id={props.id}
          type={props.type}
          onChange={props.onChange}
          onBlur={props.onblur}
          placeholder=" "
        ></input>
        <label htmlFor={props.id}>{props.label}</label>
        <span className={cx("icon")}>{props.icon}</span>
        {props.type === "password" && (
          <div className={cx("show-pass")}>
            {showPass && (
              <span
                onClick={() => {
                  passwordRef.current.type = "password";
                  setShowPass(false);
                }}
              >
                <RemoveRedEyeIcon></RemoveRedEyeIcon>
              </span>
            )}
            {!showPass && (
              <span
                onClick={() => {
                  passwordRef.current.type = "text";
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

export default MyInput;
