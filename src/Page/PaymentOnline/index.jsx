import style from "./PaymentOnline.module.scss";
import classNames from "classnames/bind";
import MyBreadCrum from "./../../components/MyBreadcrumb/index";
import HomeIcon from "@mui/icons-material/Home";
import { Input, Radio, Select, Space, message } from "antd";
import Mybuton from "../../components/MyButton";
import Format from "./../../components/Format/index";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadingEnd, loadingStart } from "../../Redux/loadingSlice";
import paymentAPI from "../../API/paymentAPI";
import moment from "moment";
import { Buffer } from "buffer";
import authAPI from "../../API/authAPI";
import { editUser } from "../../Redux/authSlice";
import NewsAPI from "../../API/newsAPI";
const cx = classNames.bind(style);

function PaymentOnline() {
  const [total, setTotal] = useState(0);
  const [paymentType, setPaymentType] = useState(null);
  const [day, setDay] = useState(0);

  const location = useLocation();
  const data = location.state;

  const dispath = useDispatch();
  const navigate = useNavigate();

  const { auth } = useSelector((state) => {
    return state;
  });

  const itemsBread = [
    {
      href: "/",
      icon: <HomeIcon></HomeIcon>,
      text: "Trang chủ",
    },
    {
      href: "/manage-post",
      text: "Quản lý",
      state: {
        userId: auth.login.currentUser.ID,
      },
    },
    // {
    //   text: data.type === 1 && "Thanh toán tin",
    //   // eslint-disable-next-line no-dupe-keys
    //   text: data.type === 2 && "Nạp tiền",
    //   // eslint-disable-next-line no-dupe-keys
    //   text: data.type === 3 && "Đăng ký vip",
    // },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (data.type === 1) {
      auth.login.currentUser.type === 1
        ? setTotal(
            data.newsTypePrice *
              Math.ceil(moment(data.expire_At).diff(moment(), "hours") / 24) *
              0.8,
          )
        : setTotal(
            data.newsTypePrice *
              Math.ceil(moment(data.expire_At).diff(moment(), "hours") / 24),
          );
    }
  }, [
    auth.login.currentUser.type,
    data.expire_At,
    data.newsTypePrice,
    data.type,
  ]);

  function onChangeRadio(e) {
    setPaymentType(e.target.value);
  }

  const handlePayment = async () => {
    const formData = new FormData();
    formData.append("newsId", data.newsId);
    formData.append("userId", auth.login.currentUser.ID);

    if (paymentType === 1) {
      if (data.type === 1) {
        try {
          if (auth.login.currentUser.amount < total) {
            message.error("Tài khoản của bạn không đủ để thanh toán!", 2);
          } else {
            dispath(loadingStart());
            formData.append("amount", auth.login.currentUser.amount - total);
            const response = await authAPI.editUser(
              formData,
              auth.login.currentUser.access_Token,
            );
            if (response.status === 200) {
              const response = await authAPI.getUserById(
                auth.login.currentUser.ID,
                auth.login.currentUser.access_Token,
              );
              if (response.status === 200) {
                dispath(editUser(response.data.user_Info));
                formData.append("status", "2");
                const responseNews = await NewsAPI.editNews(
                  formData,
                  auth.login.currentUser.access_Token,
                );
                const jsonData = await responseNews.json();
                if (responseNews.status === 200) {
                  formData.append("total", total);
                  formData.append("orderId", new Date().getTime());
                  formData.append("paymentType", "1");
                  formData.append(
                    "description",
                    `Thanh toán tin DanaHome (Mã tin: ${data.newsId}) Ngày hết hạn: ${data.expire_At}`,
                  );
                  const response = await paymentAPI.createPayment(
                    formData,
                    auth.login.currentUser.access_Token,
                  );
                  message.success(jsonData.message, 2);
                  if (response.status === 200) {
                    navigate("/manage-post", {
                      state: {
                        userId: auth.login.currentUser.ID,
                      },
                    });
                  } else {
                    message.error("Gia hạn tin thất bại!", 2);
                    dispath(loadingEnd());
                  }
                } else {
                  message.error("Gia hạn tin thất bại!", 2);
                  dispath(loadingEnd());
                }
              } else {
                message.error("Gia hạn tin thất bại!", 2);
                dispath(loadingEnd());
              }
            } else {
              message.error("Gia hạn tin thất bại!", 2);
              dispath(loadingEnd());
            }
          }
        } catch (error) {
          message.error("Không thể kết nối đến Server!", 2);
          dispath(loadingEnd());
        }
      } else if (data.type === 3) {
        if (!day) return message.error("Vui lòng chọn gói vip", 2);

        try {
          if (auth.login.currentUser.amount < total) {
            message.error("Tài khoản của bạn không đủ để thanh toán!", 2);
          } else {
            dispath(loadingStart());
            const VIP_Expire_At = moment(new Date()).add(day * 30, "days")._d;
            formData.append("amount", auth.login.currentUser.amount - total);
            formData.append("VIP_Expire_At", VIP_Expire_At);
            formData.append("type", 1);
            const response = await authAPI.editUser(
              formData,
              auth.login.currentUser.access_Token,
            );
            if (response.status === 200) {
              const response = await authAPI.getUserById(
                auth.login.currentUser.ID,
                auth.login.currentUser.access_Token,
              );
              if (response.status === 200) {
                dispath(editUser(response.data.user_Info));
                message.success("Đăng ký vip thành công!", 2);
                navigate("/");
              }
            } else {
              message.error("Gia hạn tin thất bại!", 2);
              dispath(loadingEnd());
            }
          }
        } catch (error) {
          message.error("Không thể kết nối đến Server!", 2);
          dispath(loadingEnd());
        }
      }
    } else if (paymentType === 2) {
      if (data.type === 1) {
        try {
          dispath(loadingStart());
          formData.append("amount", total);
          formData.append(
            "orderInfo",
            `Thanh toán tin DanaHome(ngày hết hạn: ${moment(
              data.expire_At,
            ).format("DD/MM/YYYY-hh:mm:ss A")})`,
          );
          formData.append(
            "extraData",
            Buffer.from(
              JSON.stringify({
                newsId: data.newsId,
                userId: auth.login.currentUser.ID,
                expire_At: data.expire_At,
              }),
            ).toString("base64"),
          );
          const response = await paymentAPI.payWithMomo(
            formData,
            auth.login.currentUser.access_Token,
          );
          if (response.status === 200) {
            window.location.replace(response.data.payUrl);
            dispath(loadingEnd());
            return;
          }
          message.error("Gia hạn tin thất bại!", 2);
          dispath(loadingEnd());
        } catch (error) {
          message.error("Không thể kết nối đến Server!", 2);
          dispath(loadingEnd());
        }
      } else if (data.type === 2) {
        if (total < 10000) {
          message.error("Số tiền nạp tối thiểu là 10.000đ!", 2);
        } else {
          try {
            dispath(loadingStart());
            formData.append("amount", total);
            formData.append(
              "orderInfo",
              `Nạp tiền vào tài khoản: ${auth.login.currentUser.full_Name}`,
            );
            formData.append(
              "extraData",
              Buffer.from(
                JSON.stringify({
                  userId: auth.login.currentUser.ID,
                  isVIP: auth.login.currentUser.type === 1,
                }),
              ).toString("base64"),
            );
            const response = await paymentAPI.payWithMomo(
              formData,
              auth.login.currentUser.access_Token,
            );
            if (response.status === 200) {
              window.location.replace(response.data.payUrl);
              dispath(loadingEnd());
              return;
            }
            message.error("Gia hạn tin thất bại!", 2);
            dispath(loadingEnd());
          } catch (error) {
            message.error("Không thể kết nối đến Server!", 2);
            dispath(loadingEnd());
          }
        }
      } else if (data.type === 3) {
        if (!day) return message.error("Vui lòng chọn gói vip", 2);
        const VIP_Expire_At = moment(new Date()).add(day * 30, "days")._d;
        try {
          dispath(loadingStart());
          formData.append("amount", total);

          formData.append(
            "orderInfo",
            `Đăng ký vip vào tài khoản: ${auth.login.currentUser.full_Name}`,
          );
          formData.append(
            "extraData",
            Buffer.from(
              JSON.stringify({
                userId: auth.login.currentUser.ID,
                VIP_Expire_At: VIP_Expire_At,
              }),
            ).toString("base64"),
          );
          const response = await paymentAPI.payWithMomo(
            formData,
            auth.login.currentUser.access_Token,
          );
          if (response.status === 200) {
            window.location.replace(response.data.payUrl);
            dispath(loadingEnd());
            return;
          }
          message.error("Đăng ký vip thất bại!", 2);
          dispath(loadingEnd());
        } catch (error) {
          message.error("Không thể kết nối đến Server!", 2);
          dispath(loadingEnd());
        }
      }
    } else if (paymentType === 4) {
      if (data.type === 1) {
        try {
          dispath(loadingStart());
          formData.append("amount", total);
          formData.append(
            "orderInfo",
            `${auth.login.currentUser.ID}_${new Date(
              data.expire_At,
            ).getTime()}`,
          );
          const response = await paymentAPI.payWithVNPay(
            formData,
            auth.login.currentUser.access_Token,
          );
          if (response.status === 200) {
            window.location.replace(response.data.payUrl);
            dispath(loadingEnd());
            return;
          }
          message.error("Gia hạn tin thất bại!", 2);
          dispath(loadingEnd());
        } catch (error) {
          message.error("Không thể kết nối đến Server!", 2);
          dispath(loadingEnd());
        }
      } else if (data.type === 2) {
        if (total < 10000) {
          message.error("Số tiền nạp tối thiểu là 10.000đ!", 2);
        } else {
          try {
            dispath(loadingStart());
            formData.delete("newsId");
            formData.append(
              "newsId",
              auth.login.currentUser.type === 1 ? "naptienvip" : "naptien",
            );
            formData.append("amount", total);
            formData.append("orderInfo", auth.login.currentUser.ID);
            const response = await paymentAPI.payWithVNPay(
              formData,
              auth.login.currentUser.access_Token,
            );
            if (response.status === 200) {
              window.location.replace(response.data.payUrl);
              dispath(loadingEnd());
              return;
            }
            message.error("Gia hạn tin thất bại!", 2);
            dispath(loadingEnd());
          } catch (error) {
            message.error("Không thể kết nối đến Server!", 2);
            dispath(loadingEnd());
          }
        }
      } else if (data.type === 3) {
        if (!day) return message.error("Vui lòng chọn gói vip", 2);
        try {
          dispath(loadingStart());
          const VIP_Expire_At = moment(new Date()).add(day * 30, "days")._d;
          formData.delete("newsId");
          formData.append("newsId", "dangkyvip");
          formData.append("amount", total);
          formData.append(
            "orderInfo",
            `${auth.login.currentUser.ID}_${new Date(VIP_Expire_At).getTime()}`,
          );
          const response = await paymentAPI.payWithVNPay(
            formData,
            auth.login.currentUser.access_Token,
          );
          if (response.status === 200) {
            window.location.replace(response.data.payUrl);
            dispath(loadingEnd());
            return;
          }
          message.error("Gia hạn tin thất bại!", 2);
          dispath(loadingEnd());
        } catch (error) {
          message.error("Không thể kết nối đến Server!", 2);
          dispath(loadingEnd());
        }
      }
    } else if (paymentType === 5) {
      try {
        formData.append("status", "1");
        const responseNews = await NewsAPI.editNews(
          formData,
          auth.login.currentUser.access_Token,
        );
        if (responseNews.status === 200) {
          message.success(
            "Thanh toán tin thành công! Vui lòng chờ quản trị viên xác nhận.",
            2,
          );
          navigate("/manage-post", {
            state: {
              userId: auth.login.currentUser.ID,
            },
          });
        } else {
          message.error("Gia hạn tin thất bại!", 2);
          dispath(loadingEnd());
        }
      } catch (error) {
        message.error("Không thể kết nối đến Server!", 2);
        dispath(loadingEnd());
      }
    }
  };

  return (
    <div className={cx("wrapper")}>
      <MyBreadCrum items={itemsBread}></MyBreadCrum>
      {data.type === 3 && auth.login.currentUser.type === 1 ? (
        <h1 style={{ marginTop: 20, fontSize: 30 }}>
          Tài khoản của bạn đã là tài khoản VIP
        </h1>
      ) : (
        <>
          {data.type === 1 && (
            <h1 className={cx("title")}>
              Thanh toán tin (Mã tin: {data.newsId.split("-")[0]})
            </h1>
          )}

          <div className={cx("payment-info")}>
            <h1 className={cx("title-news")}>{data.title}</h1>
          </div>
          {data.type === 2 && (
            <div className={cx("news-options")}>
              <div className={cx("money")}>
                <h1>Chọn nhanh số tiền muốn nạp:</h1>
                <Radio.Group onChange={(e) => setTotal(e.target.value)}>
                  <Radio value={50000}>50.000đ</Radio>
                  <Radio value={100000}>100.000đ</Radio>
                  <Radio value={200000}>200.000đ</Radio>
                  <Radio value={500000}>500.000đ</Radio>
                  <Radio value={1000000}>1.000.000đ</Radio>
                  <Radio value={2000000}>2.000.000đ</Radio>
                </Radio.Group>
                <p>Hoặc nhập số tiền cần nạp:</p>
                <Input
                  type="number"
                  value={total}
                  min={0}
                  step={10000}
                  style={{ fontSize: 18 }}
                  onChange={(e) => setTotal(e.target.value)}
                  prefix="đ"
                  suffix="VNĐ"
                />
              </div>
            </div>
          )}
          {data.type === 3 && (
            <div className={cx("option-vip")}>
              <h1 style={{ marginBottom: 10, fontSize: 20 }}>Chọn gói VIP</h1>
              <Select
                defaultValue={"--Chọn gói VIP--"}
                style={{
                  width: 280,
                }}
                options={[
                  {
                    value: 1,
                    label: `1 Tháng`,
                  },
                  {
                    value: 3,
                    label: `3 Tháng (Giảm 10%)`,
                  },
                  {
                    value: 6,
                    label: `6 Tháng (Giảm 20%)`,
                  },
                  {
                    value: 12,
                    label: `12 Tháng (Giảm 30%)`,
                  },
                ]}
                onChange={(value) => {
                  setDay(value);
                  if (value === 1) {
                    setTotal(25000);
                  } else if (value === 3) {
                    setTotal(25000 * value * 0.9);
                  } else if (value === 6) {
                    setTotal(25000 * value * 0.8);
                  } else if (value === 12) {
                    setTotal(25000 * value * 0.7);
                  }
                }}
              />
            </div>
          )}

          <div className={cx("total-price")}>
            <h1>
              Số tiền cần thanh toán: <b>{Format.formatPrice(total)}</b>
            </h1>
            {auth.login.currentUser.type === 1 && data.type === 1 && (
              <p>
                Tài khoản vip được giảm:{" "}
                {Math.ceil(
                  moment(data.expire_At).diff(moment(), "hours") / 24,
                ) ? (
                  <>
                    <b>
                      {Format.formatPrice(
                        data.newsTypePrice *
                          Math.ceil(
                            moment(data.expire_At).diff(moment(), "hours") / 24,
                          ) *
                          0.2,
                      )}
                    </b>
                    (20%)
                  </>
                ) : (
                  "0đ"
                )}
              </p>
            )}
            {auth.login.currentUser.type === 1 && data.type === 2 && (
              <p>
                Tài khoản vip được tặng thêm:{" "}
                {total ? (
                  <>
                    <b>{Format.formatPrice(total * 0.15)}</b>
                    (10%)
                  </>
                ) : (
                  "0đ"
                )}
              </p>
            )}
          </div>
          <div className={cx("main")}>
            <div className={cx("payment-options")}>
              <h1>Chọn phương thức thanh toán</h1>
              <Radio.Group onChange={onChangeRadio}>
                <Space direction="vertical">
                  {data.type === 1 || data.type === 3 ? (
                    <Radio value={1}>
                      <li className={cx("payment-options-item")}>
                        <p>
                          Trừ tiền trong tài khoản DaNaHome (Bạn đang có: TK
                          Chính{" "}
                          <b>
                            {Format.formatPrice(auth.login.currentUser.amount)}
                          </b>
                          )
                        </p>
                        {auth.login.currentUser.amount < total && (
                          <span>
                            Số tiền trong tài khoản của bạn không đủ để thực
                            hiện thanh toán, vui lòng{" "}
                            <Link
                              to={"/payment-online"}
                              state={{
                                title: `Nạp tiền vào tài khoản: ${auth.login.currentUser.full_Name}`,
                                type: 2,
                              }}
                            >
                              nạp thêm
                            </Link>{" "}
                            hoặc chọn phương thức khác bên dưới
                          </span>
                        )}
                      </li>
                    </Radio>
                  ) : null}
                  <Radio value={2}>
                    <li className={cx("payment-options-item")}>
                      <p>Thanh toán qua ví điện tử MOMO</p>
                      <img
                        src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                        alt=""
                      ></img>
                    </li>
                  </Radio>
                  <Radio value={3}>
                    <li className={cx("payment-options-item")}>
                      <p>Thanh toán qua ví điện tử ZALOPAY</p>
                      <img
                        src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png"
                        alt=""
                      ></img>
                    </li>
                  </Radio>
                  <Radio value={4}>
                    <li className={cx("payment-options-item")}>
                      <p>Thanh toán qua ví điện tử VNPAY</p>
                      <img
                        src="data:image/png;base64,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"
                        alt=""
                      ></img>
                    </li>
                  </Radio>

                  {data.type === 1 && (
                    <Radio value={5}>
                      <li className={cx("payment-options-item")}>
                        <p>Chuyển khoản ngân hàng</p>
                        {paymentType === 5 && (
                          <p>
                            Ngân hàng: <span>VIETCOMBANK</span> <br></br>
                            Số tài khoản: <span>5743895934574</span> <br></br>
                            Nội dung chuyển khoản:{" "}
                            <span>
                              {auth.login.currentUser.full_Name
                                .normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")}{" "}
                              THANHTOAN {data.newsId.split("-")[0]}{" "}
                              {data.newsTypePrice === 10000
                                ? "TIN VIP"
                                : "TIN THUONG"}{" "}
                              {Math.ceil(
                                moment(data.expire_At).diff(moment(), "hours") /
                                  24,
                              )}{" "}
                              NGAY
                            </span>
                          </p>
                        )}
                      </li>
                    </Radio>
                  )}
                </Space>
              </Radio.Group>
              <div className={cx("action")}>
                <Mybuton
                  to={"/manage-post"}
                  state={{ userId: auth.login.currentUser.ID }}
                  classes={cx("btn")}
                  dark
                >
                  Quay lại
                </Mybuton>
                <Mybuton
                  onClick={handlePayment}
                  classes={cx("btn")}
                  primary={paymentType}
                  disible={!paymentType}
                >
                  Thanh toán
                </Mybuton>
              </div>
            </div>
            <ul className={cx("note")}>
              <h1>Lưu ý</h1>
              <li>Nội dung phải viết bằng tiếng Việt có dấu</li>
              <li>Tiêu đề tin không dài quá 100 kí tự</li>
              <li>
                Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng có
                hiệu quả hơn.
              </li>
              <li>
                Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn, hãy
                sửa vị trí tin rao của bạn trên bản đồ bằng cách kéo icon tới
                đúng vị trí của tin rao.
              </li>
              <li>
                Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều lần so
                với tin rao không có ảnh. Hãy đăng ảnh để được giao dịch nhanh
                chóng!
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default PaymentOnline;
