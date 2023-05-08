import { Link, useSearchParams } from "react-router-dom";
import style from "./Return.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import paymentAPI from "../../API/paymentAPI";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "antd";
import { paymentSuccess, noufound, error } from "../../Image";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { editUser } from "../../Redux/authSlice";

const cx = classNames.bind(style);

function Return() {
  const [resultCode, setResultCode] = useState(null);
  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.get("partnerCode") === "MOMO") {
      const getResultPayment = async () => {
        const response = await paymentAPI.ipnMomo(
          Object.fromEntries([...searchParams]),
        );
        if (response.status === 200) {
          dispatch(editUser(response.data.data));
          setResultCode(response.data.statusCode);
        } else {
          setResultCode(response.statusCode);
        }
      };
      getResultPayment();
    } else if (searchParams.get("vnp_SecureHash")) {
      const getResultPayment = async () => {
        const response = await paymentAPI.ipnVNPAY(
          Object.fromEntries([...searchParams]),
        );
        if (response.status === 200) {
          dispatch(editUser(response.data.data));
          setResultCode(response.data.statusCode);
        } else {
          setResultCode(response.statusCode);
        }
      };
      getResultPayment();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cx("wrapper")}>
      {resultCode ? (
        <>
          {resultCode === "1" && (
            <div className={cx("info")}>
              <img src={paymentSuccess} alt=""></img>
              <h1>Thanh toán thành công!</h1>
            </div>
          )}{" "}
          {resultCode === "2" && (
            <div className={cx("info")}>
              <img src={error} alt=""></img>
              <h1>Thanh toán không thành công!</h1>
            </div>
          )}{" "}
          {resultCode === "3" && (
            <div className={cx("info")}>
              <img src={noufound} alt=""></img>
            </div>
          )}
          <div className={cx("action")}>
            <Link to={"/"}>
              <HomeOutlinedIcon></HomeOutlinedIcon> Trang chủ
            </Link>
            <Link to={"/manage-post"} state={{ userId: currentUser.ID }}>
              <FeedOutlinedIcon></FeedOutlinedIcon> Quản lý tin đăng
            </Link>
          </div>
        </>
      ) : (
        <Skeleton active></Skeleton>
      )}
    </div>
  );
}

export default Return;
