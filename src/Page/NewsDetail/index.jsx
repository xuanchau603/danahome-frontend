/* eslint-disable jsx-a11y/anchor-is-valid */
import style from "./NewsDetail.module.scss";
import classNames from "classnames/bind";
import HomeIcon from "@mui/icons-material/Home";
import MyBreadCrum from "../../components/MyBreadcrumb";
import { Col, Row } from "antd";
import QuickSee from "../../components/QuickSee";
import NewsRent from "../../components/NewsRent";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { banner } from "../../Image";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SellIcon from "@mui/icons-material/Sell";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TagIcon from "@mui/icons-material/Tag";
import Map from "../../components/Map";

const cx = classNames.bind(style);

function NewsDetail() {
  const key = "AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8";

  const itemsQuickSeeNews = [
    <span>
      <ChevronRightIcon></ChevronRightIcon> Nỗi khổ của người thuê phòng trọ gần
      thì đắt mà xa thì rẻ
    </span>,
    <span>
      <ChevronRightIcon></ChevronRightIcon>
      Các công ty chuyển nhà trọ uy tín nhất hiện nay
    </span>,
    <span>
      <ChevronRightIcon></ChevronRightIcon>
      Có nên đầu tư cho thuê căn hộ Azura không?
    </span>,
    <span>
      <ChevronRightIcon></ChevronRightIcon>
      Top 5 trang web thuê nhà nguyên căn giá rẻ tại Việt Nam
    </span>,
    <span>
      <ChevronRightIcon></ChevronRightIcon>
      Điểm nổi bật của căn hộ Legacy Centrel là gì?
    </span>,
    <span>
      <ChevronRightIcon></ChevronRightIcon>
      Lý do khiến căn hộ C River view là nơi đáng sống tại Bình Dương
    </span>,
  ];
  const itemsCare = [
    <span>
      <ChevronRightIcon></ChevronRightIcon> Mẫu hợp đồng cho thuê phòng trọ
    </span>,
    <span>
      <ChevronRightIcon></ChevronRightIcon>
      Cẩn thận các kiểu lửa đảo khi thuê phòng trọ
    </span>,
    <span>
      <ChevronRightIcon></ChevronRightIcon>
      Kinh nghiệm thuê phòng trọ cho Sinh Viên
    </span>,
  ];
  const items = [
    {
      href: "/",
      icon: <HomeIcon></HomeIcon>,
      text: "Trang chủ",
    },
    {
      text: "Chi tiết tin",
    },
  ];
  return (
    <div className={cx("house-details")}>
      <MyBreadCrum items={items}></MyBreadCrum>
      <Row gutter={16}>
        <Col span={16}>
          <div className={cx("left-content")}>
            <div className={cx("post-image")}>
              <img src={banner} alt=""></img>
            </div>
            <div className={cx("post-header")}>
              <a href="#">
                Nhà trọ Cao cấp Mới xây rất đẹp thoáng mát, Gần Nguyễn Hữu Thọ
                Và Lê Đại Hành Đà Nẵng
              </a>
              <p>
                Chuyên mục: <a href="#">Cho thuê phòng trọ Quận Cẩm Lệ</a>
              </p>
              <div className={cx("post-address")}>
                <LocationOnIcon></LocationOnIcon>
                <p>
                  Địa chỉ: 168-05 Đường Hà Tông Quyền, Phường Khuê Trung, Quận
                  Cẩm Lệ, Đà Nẵng
                </p>
              </div>
              <div className={cx("post-attributes")}>
                <div className={cx("post-price")}>
                  <SellIcon></SellIcon>
                  <p>2.2 triệu/tháng</p>
                </div>
                <div className={cx("post-acreage")}>
                  <SettingsEthernetIcon></SettingsEthernetIcon>
                  <p>27m2</p>
                </div>
                <div className={cx("post-published")}>
                  <AccessTimeIcon></AccessTimeIcon>
                  <p>Hôm nay</p>
                </div>
                <div className={cx("post-code")}>
                  <TagIcon></TagIcon>
                  <p>301975</p>
                </div>
              </div>
            </div>
            <div className={cx("post-description")}>
              <h2>Thông tin mô tả</h2>
              <p>
                Phòng trọ cao cấp mới xây, Có bếp, giường ngủ sẵn, gần trung tâm
                thành phố (Lê Đại Hành - Hà Tông Quyền- Nguyễn Hữu Thọ): cách
                chợ 100m, cách Trường: ĐH Ngoại Ngữ, Kiến Trúc, Đông Á. CĐ Bách
                Khoa 5phut . Phòng thoáng mát, hiện đại, đầy đủ tiện ích:.. Có
                Chỗ để xe ,phơi rộng rãi thoáng. Máy giặt, điều hoà, nước nóng
                (lắp theo yêu cầu) ... wifi mạnh mẽ miễn phí, điện 3000 đ/kw,
                nước 40k/ người lớn, cửa ra vào bằng gỗ đẹp, khóa chắc chắn,
                camera an ninh từng tầng, lối đi riêng không chung chủ.... giao
                thông thuận tiện ( K168/5 Hà Tông Quyền Đà Nẵng).
              </p>
              <p>Giá cả hợp lý từ 2.0- 2.40 tr/ phòng / tháng</p>
              <p>
                Diện tích phòng : từ :20-27m2 Giảm giá 5% cho khách đóng tiền 3
                tháng/1 lần.
              </p>
              <p>
                Liên hệ anh Châu: 0934981031. Ưu tiên người đi làm và sinh viên
                nữ.
              </p>
            </div>
            <div className={cx("post-overview")}>
              <h2>Đặc điểm bài đăng</h2>
              <table>
                <tbody>
                  <tr>
                    <td>Mã tin:</td>
                    <td>#301975</td>
                  </tr>
                  <tr>
                    <td>Khu vực:</td>
                    <td>Cho thuê phòng trọ Đà Nẵng</td>
                  </tr>
                  <tr>
                    <td>Loại tin rao:</td>
                    <td>Phòng trọ, nhà trọ</td>
                  </tr>
                  <tr>
                    <td>Đối tượng thuê:</td>
                    <td>Tất cả</td>
                  </tr>
                  <tr>
                    <td>Gói tin:</td>
                    <td>Tin VIP 3</td>
                  </tr>
                  <tr>
                    <td>Ngày đăng:</td>
                    <td>Thứ 2, 10:09 10/04/2023</td>
                  </tr>
                  <tr>
                    <td>Ngày hết hạn:</td>
                    <td>Thứ 5, 10:09 20/04/2023</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={cx("post-contact")}>
              <h2>Thông tin liên hệ</h2>
              <table>
                <tbody>
                  <tr>
                    <td>Liên hệ:</td>
                    <td>Xuân Châu</td>
                  </tr>
                  <tr>
                    <td>Điện thoại:</td>
                    <td>0934981031</td>
                  </tr>
                  <tr>
                    <td>Zalo:</td>
                    <td>0934981031</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={cx("post-map")}>
              <h2>Bản đồ</h2>
              <p>
                Địa chỉ: 168-05 Đường Hà Tông Quyền, Phường Khuê Trung, Quận Cẩm
                Lệ, Đà Nẵng
              </p>
            </div>
            <Map
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={
                <div
                  style={{
                    height: `90vh`,
                    margin: `auto`,
                    border: "2px solid black",
                  }}
                />
              }
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
        </Col>
        <Col span={8}>
          <NewsRent></NewsRent>
          <QuickSee
            classes={cx("care")}
            title="Bài viết mới"
            items={itemsQuickSeeNews}
          ></QuickSee>
          <QuickSee
            classes={cx("care")}
            title="Có thể bạn quan tâm"
            items={itemsCare}
          ></QuickSee>
        </Col>
      </Row>
    </div>
  );
}

export default NewsDetail;
