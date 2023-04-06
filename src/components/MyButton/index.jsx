import style from "./index.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

function MyButton({
  primary,
  to,
  href,
  children,
  outline,
  active,
  onClick,
  classes,
}) {
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
        active,
      })}
      {...props}
    >
      {children}
    </Comp>
  );
}

export default MyButton;
