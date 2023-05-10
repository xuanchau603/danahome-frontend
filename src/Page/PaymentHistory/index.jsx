import style from "./PaymentHistory.module.scss";
import classNames from "classnames/bind";
import { Link, useLocation } from "react-router-dom";
import MyBreadCrumb from "../../components/MyBreadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import { Pagination, Radio, Select, Space, message } from "antd";
import { loadingEnd, loadingStart } from "../../Redux/loadingSlice";
import { useEffect, useState } from "react";
import NewsAPI from "./../../API/newsAPI";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Menu from "../../components/Menu";
import MyButton from "../../components/MyButton";
import Format from "../../components/Format";
import paymentAPI from "./../../API/paymentAPI";

const cx = classNames.bind(style);

function PaymentHistory() {
  const [listPayment, setListPayment] = useState([]);
  const [MenuStatus, setMenuStatus] = useState(false);
  const [MenuPrevNews, setMenuPrevNews] = useState(false);
  const [status, setStatus] = useState();
  const [newsId] = useState();
  const [page, setPage] = useState(1);
  const [totalPagination, setTotalPagination] = useState();
  const [title] = useState();
  const [description] = useState();
  const [address] = useState();
  const [price] = useState();
  const [acreage] = useState();
  const [object] = useState();
  const { auth } = useSelector((state) => {
    return state;
  });
  const location = useLocation();
  const userId = location.state.userId;
  const poster = location.state.poster;
  const amount = location.state.amount;

  const onChange = async (page) => {
    setPage(page);
    try {
      dispatch(loadingStart());
      const response = await paymentAPI.getPayment(
        userId,
        auth.login.currentUser.access_Token,
        { page, payment_Type: status ? status : undefined },
      );
      if (response.status === 200) {
        setListPayment(response.data.data);
        setTotalPagination(response.data.totalPaymentInfo);
        dispatch(loadingEnd());
      } else {
        message.error(response.message, 2);
        dispatch(loadingEnd());
      }
    } catch (error) {
      message.error("Không thể kết nối đến Server", 2);
      dispatch(loadingEnd());
    }

    window.scrollTo(0, 0);
  };

  const items = [
    {
      href: "/",
      icon: <HomeIcon></HomeIcon>,
      text: "Trang chủ",
    },
    {
      text: "Lịch sử thanh toán",
      state: { userId: userId, poster, amount },
    },
  ];

  const dispatch = useDispatch();

  const handleChangeStatus = async (value) => {
    setPage(1);
    try {
      dispatch(loadingStart());
      const response = await paymentAPI.getPayment(
        userId,
        auth.login.currentUser.access_Token,
        { page, payment_Type: value ? value : undefined },
      );
      if (response.status === 200) {
        setListPayment(response.data.data);
        setTotalPagination(response.data.totalPaymentInfo);
        dispatch(loadingEnd());
      } else {
        message.error(response.message, 2);
        dispatch(loadingEnd());
      }
    } catch (error) {
      message.error("Không thể kết nối đến Server", 2);
      dispatch(loadingEnd());
    }
  };
  const getAllPaymentByUserId = async () => {
    try {
      dispatch(loadingStart());
      setPage(1);
      const response = await paymentAPI.getPayment(
        userId,
        auth.login.currentUser.access_Token,
      );
      if (response.status === 200) {
        setListPayment(response.data.data);
        setTotalPagination(response.data.totalPaymentInfo);
        dispatch(loadingEnd());
      } else {
        message.error(response.message, 2);
        dispatch(loadingEnd());
      }
    } catch (error) {
      message.error("Không thể kết nối đến Server", 2);
      dispatch(loadingEnd());
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllPaymentByUserId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeRadio = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className={cx("wrapper")}>
      <MyBreadCrumb items={items}></MyBreadCrumb>
      <div className={cx("top")}>
        <h1>Lịch sử thanh toán(Tài khoản: {poster})</h1>
        <div className={cx("filter")}>
          <Select
            className={cx("filter-item")}
            defaultValue="Lọc theo hình thức thanh toán"
            style={{ width: 280 }}
            onChange={handleChangeStatus}
            options={[
              { value: 0, label: "Hiện thị tất cả" },
              { value: "1", label: "Trừ tiền trong tài khoản DANAHOME" },
              { value: "2", label: "Thanh toán qua MOMO" },
              { value: "3", label: "Thanh toán qua ZALOPAY" },
              { value: "4", label: "Thanh toán qua VNPAY" },
            ]}
          />
          <Link
            className={cx("filter-item")}
            to={"/payment-online"}
            state={{ type: 2, title: `Nạp tiền vào tài khoản: ${poster}` }}
          >
            Nạp tiền
          </Link>
        </div>
      </div>
      <div className={cx("pagination")}>
        <Pagination
          current={page}
          onChange={onChange}
          total={totalPagination}
          pageSize={5}
          showQuickJumper
          locale={{ jump_to: "Đi đến trang:", page: null }}
          showTotal={(total) => `Có tất cả ${total} lần thanh toán`}
        />
      </div>
      <table>
        <tbody>
          <tr>
            <th>Ngày thanh toán</th>
            <th>Tin thanh toán</th>
            <th>Thông tin thanh toán</th>
            <th>Số dư</th>
            <th>Số tiền thanh toán</th>
            <th>Hình thức thanh toán</th>
            <th>Trạng thái</th>
          </tr>
          {listPayment.length > 0 ? (
            listPayment.map((item) => {
              return (
                <tr key={item.ID}>
                  <td>
                    <div className={cx("post-id")}>
                      <p>
                        {moment(item.createdAt).format("DD/MM/YYYY-hh:mm:ss A")}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className={cx("post-image")}>
                      {item.news ? (
                        <Link
                          to={`/news-detail?newsId=${item.news.ID}`}
                          className={cx("news-info")}
                        >
                          <h1>{item.news.title}</h1>
                          <img src={item.news.images[0].image_URL} alt=""></img>
                        </Link>
                      ) : (
                        <h1>Không có</h1>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className={cx("post-info")}>{item.description}</div>
                  </td>
                  <td>
                    <div className={cx("price")}>
                      <h1>{Format.formatPrice(amount)}</h1>
                    </div>
                  </td>
                  <td>
                    <div className={cx("post-date")}>
                      <p>{Format.formatPrice(item.amount)}</p>
                    </div>
                  </td>
                  <td>
                    <div className={cx("expire-date")}>
                      <p>
                        {Format.formatPaymentType(parseInt(item.payment_Type))}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className={cx("status")}>
                      {Format.formatPaymentStatus(parseInt(item.status))}
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>
                <div></div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {!listPayment.length > 0 && (
        <div className={cx("null")}>
          Bạn chưa từng thanh toán. Bấm{" "}
          <Link
            to={"/payment-online"}
            state={{ title: `Nạp tiền vào tài khoản: ${poster}`, type: 2 }}
          >
            vào đây
          </Link>{" "}
          để nạp tiền.
        </div>
      )}

      {MenuStatus && (
        <Menu
          classes={cx("menu-status")}
          onCancel={() => {
            setMenuStatus(false);
          }}
          open={MenuStatus}
          title={`Cập nhật trạng thái tin(Mã tin: ${newsId.split("-")[0]})`}
        >
          <h1>Chọn trạng thái</h1>
          <ul className={cx("list-option")}>
            <Radio.Group defaultValue={status} onChange={onChangeRadio}>
              <Space direction="vertical">
                <Radio value={1}>
                  <span className={cx("warn")}>Chờ xác nhận</span>
                </Radio>
                <Radio value={2}>
                  <span className={cx("success")}>Đang hiển thị</span>
                </Radio>

                <Radio value={3}>
                  <span className={cx("error")}>Hết hạn</span>
                </Radio>
                <Radio value={4}>
                  <span className={cx("hide")}>Đã ẩn</span>
                </Radio>
                <Radio value={5}>
                  <span className={cx("not-pay")}>Chưa thanh toán</span>
                </Radio>
              </Space>
            </Radio.Group>
          </ul>
          <MyButton
            onClick={async () => {
              dispatch(loadingStart());
              try {
                const formData = new FormData();
                formData.append("newsId", newsId);
                formData.append("status", status);
                const response = await NewsAPI.editNews(
                  formData,
                  auth.login.currentUser.access_Token,
                );
                const jsonData = await response.json();
                if (response.status === 200) {
                  await getAllPaymentByUserId();
                  message.success(jsonData.message, 2);
                  setMenuStatus(false);
                } else {
                  message.error(jsonData.message, 2);
                  dispatch(loadingEnd());
                }
              } catch (error) {
                message.error("Không thể kết nối đến server!", 2);
                dispatch(loadingEnd());
              }
            }}
            classes={cx("btn-submit")}
            primary
          >
            Lưu & Cập nhật
          </MyButton>
        </Menu>
      )}
      {MenuPrevNews && (
        <Menu
          classes={cx("menu-status")}
          onCancel={() => {
            setMenuPrevNews(false);
          }}
          open={MenuPrevNews}
          title={`Xem nhanh thông tin bài đăng(Mã tin: ${
            newsId.split("-")[0]
          })`}
        >
          <div className={cx("info-group")}>
            <b>Tiêu đề:</b>
            <span>{title}</span>
          </div>
          <div className={cx("info-group")}>
            <b>Mô tả:</b>
            <span>{description}</span>
          </div>
          <div className={cx("info-group")}>
            <b>Địa chỉ:</b>
            <span>{address}</span>
          </div>
          <div className={cx("info-group")}>
            <b>Giá cho thuê:</b>
            <span>{Format.formatPrice(price)}/tháng</span>
          </div>
          <div className={cx("info-group")}>
            <b>Diện tích:</b>
            <span>{acreage} m2</span>
          </div>
          <div className={cx("info-group")}>
            <b>Đối tượng:</b>
            <span>{object}</span>
          </div>
        </Menu>
      )}
    </div>
  );
}

export default PaymentHistory;
