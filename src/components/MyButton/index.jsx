import { forwardRef } from "react";
import style from "./index.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(style);

function MyButton(
  {
    dark,
    primarydisible,
    disible,
    primary,
    to,
    href,
    children,
    outline,
    active,
    onClick,
    classes,
    state,
    target,
  },
  ref,
) {
  let Comp = "button";
  const props = {
    onClick,
  };

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }

  return (
    <Comp
      className={cx("wrapper", {
        [classes]: classes,
        primary,
        outline,
        disible,
        active,
        primarydisible,
        dark,
      })}
      state={state}
      ref={ref}
      {...props}
      type={"submit"}
      disabled={disible}
      target={target}
    >
      {children}
    </Comp>
  );
}

export default forwardRef(MyButton);
