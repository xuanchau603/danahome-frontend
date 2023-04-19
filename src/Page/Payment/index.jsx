import style from "./Payment.module.scss";
import classNames from "classnames/bind";
import MyBreadCrum from "./../../components/MyBreadcrumb/index";
import HomeIcon from "@mui/icons-material/Home";
import { DatePicker, Radio, Select, Space, message } from "antd";
import Mybuton from "../../components/MyButton";
import Format from "./../../components/Format/index";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NewsAPI from "../../API/newsAPI";
import { useDispatch, useSelector } from "react-redux";
import { loadingEnd, loadingStart } from "../../Redux/loadingSlice";

const cx = classNames.bind(style);

function Payment() {
  const [newsTypePrice, setNewsTypePrice] = useState(2000);
  const [day, setDay] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentType, setPaymentType] = useState(null);
  const [newsType, setNewsType] = useState(
    "e835fdf4-dc42-11ed-8c1c-2cf05ddd2632",
  );
  const [expire_At, setExpire_At] = useState();

  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  const dispath = useDispatch();

  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });

  const itemsBread = [
    {
      href: "/",
      icon: <HomeIcon></HomeIcon>,
      text: "Trang chủ",
    },
    {
      text: "Quản lý",
    },
    {
      text: "Thanh toán tin",
    },
  ];

  function disabledDate(current) {
    // Can not select days before today and today
    return current.valueOf() <= Date.now();
  }

  const onChange = (value) => {
    value === 0 ? setNewsTypePrice(2000) : setNewsTypePrice(10000);
    setNewsType(value);
  };

  const onChangeDate = (date) => {
    setDay(Math.ceil((date?.$d - new Date()) / 86400000));
    setExpire_At(date?.$d);
  };

  useEffect(() => {
    setTotal(newsTypePrice * day);
  }, [day, newsTypePrice]);

  function onChangeRadio(e) {
    setPaymentType(e.target.value);
  }

  const handlePayment = async () => {
    if (!expire_At) return message.error("Vui lòng chọn ngày hết hạn!", 2);
    if (!paymentType)
      return message.error("Vui lòng chọn phương thức thanh toán", 2);
    const formData = new FormData();
    formData.append("roomType", data.roomType);
    formData.append("newsType", newsType);
    formData.append("province", data.province.label);
    formData.append("district", data.district.label);
    formData.append("ward", data.ward.label);
    formData.append("house_Number", data.house_Number);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("expire_At", expire_At);
    formData.append("acreage", data.acreage);
    for (var item of data.images) {
      formData.append("images", item);
    }
    try {
      dispath(loadingStart());
      const response = await NewsAPI.createNews(
        formData,
        currentUser.access_Token,
      );
      const jsonData = await response.json();
      if (response.status === 200) {
        message.success(jsonData.message, 2);
        dispath(loadingEnd());
        return navigate("/");
      }
      message.error("Đăng tin thất bại!", 2);
      dispath(loadingEnd());
    } catch (error) {
      message.error("Không thể kết nối đến Server!", 2);
      dispath(loadingEnd());
    }
  };

  return (
    <div className={cx("wrapper")}>
      <MyBreadCrum items={itemsBread}></MyBreadCrum>
      <h1 className={cx("title")}>Thanh toán tin</h1>
      <p className={cx("warning")}>
        Nếu bạn đã từng đăng tin trên Phongtro123.com, hãy sử dụng chức năng ĐẨY
        TIN / GIA HẠN / NÂNG CẤP VIP trong mục QUẢN LÝ TIN ĐĂNG để làm mới, đẩy
        tin lên cao thay vì đăng tin mới. Tin đăng trùng nhau sẽ không được
        duyệt.
      </p>
      <div className={cx("payment-info")}>
        <h1 className={cx("title-news")}>{data.title}</h1>
      </div>
      <div className={cx("news-options")}>
        <div className={cx("option-item")}>
          <p>Chọn loại tin</p>
          <Select
            defaultValue={"e835fdf4-dc42-11ed-8c1c-2cf05ddd2632"}
            style={{
              width: 320,
            }}
            onChange={onChange}
            options={[
              {
                value: "e835fdf4-dc42-11ed-8c1c-2cf05ddd2632",
                label: "Tin thường (2.000đ/ngày)",
              },
              {
                value: "f3a4bbd9-dc42-11ed-8c1c-2cf05ddd2632",
                label: "Tin VIP nổi bật (10.000đ/ngày)",
              },
            ]}
          />
        </div>
        <div className={cx("option-item")}>
          <p>Chọn ngày hết hạn</p>
          <DatePicker
            showTime
            disabledDate={disabledDate}
            placeholder="Chọn ngày hết hạn"
            format={"DD-MM-YYYY"}
            onChange={onChangeDate}
          />
        </div>
      </div>
      <div className={cx("total-price")}>
        <h1>
          Số tiền cần thanh toán:{" "}
          <b>{expire_At ? Format.formatPrice(total) : "0đ"}</b>
        </h1>
      </div>
      <div className={cx("main")}>
        <div className={cx("payment-options")}>
          <h1>Chọn phương thức thanh toán</h1>
          <Radio.Group onChange={onChangeRadio}>
            <Space direction="vertical">
              <Radio value={1}>
                <li className={cx("payment-options-item")}>
                  <p>
                    Trừ tiền trong tài khoản Phongtro123 (Bạn đang có: TK Chính
                    0)
                  </p>
                  <span>
                    Số tiền trong tài khoản của bạn không đủ để thực hiện thanh
                    toán, vui lòng <b>nạp thêm</b> hoặc chọn phương thức khác
                    bên dưới
                  </span>
                </li>
              </Radio>
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

              <Radio value={5}>
                <li className={cx("payment-options-item")}>
                  <p>Chuyển khoản ngân hàng</p>
                  <p>
                    Nội dung chuyển khoản:{" "}
                    <span>PT123 THANHTOAN 622561 THUONG 5 NGAY</span>
                  </p>
                </li>
              </Radio>
            </Space>
          </Radio.Group>
          <div className={cx("action")}>
            <Mybuton to={"/new-post"} state={data} classes={cx("btn")} dark>
              Quay lại
            </Mybuton>
            <Mybuton
              onClick={handlePayment}
              classes={cx("btn")}
              primary={expire_At && paymentType}
              disible={!expire_At || !paymentType}
            >
              Thanh toán
            </Mybuton>
          </div>
        </div>
        <ul className={cx("note")}>
          <h1>Lưu ý khi đăng tin</h1>
          <li>Nội dung phải viết bằng tiếng Việt có dấu</li>
          <li>Tiêu đề tin không dài quá 100 kí tự</li>
          <li>
            Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng có hiệu
            quả hơn.
          </li>
          <li>
            Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn, hãy sửa
            vị trí tin rao của bạn trên bản đồ bằng cách kéo icon tới đúng vị
            trí của tin rao.
          </li>
          <li>
            Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều lần so với
            tin rao không có ảnh. Hãy đăng ảnh để được giao dịch nhanh chóng!
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Payment;
