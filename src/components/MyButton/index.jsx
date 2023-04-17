import { forwardRef } from "react";
import style from "./index.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

function MyButton(
  {
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
  },
  ref,
) {
  let Comp = "div";
  const props = {
    onClick,
  };

  if (to) {
    props.to = to;
    Comp = "Link";
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
      })}
      ref={ref}
      {...props}
    >
      {children}
    </Comp>
  );
}

export default forwardRef(MyButton);
