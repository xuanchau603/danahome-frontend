import style from "./ManagePost.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Footer from "../../Layout/Components/Footer";
import MyBreadCrumb from "../../components/MyBreadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import { Popconfirm, Select, message } from "antd";
import { loadingEnd, loadingStart } from "../../Redux/loadingSlice";
import { useEffect, useState } from "react";
import NewsAPI from "./../../API/newsAPI";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const cx = classNames.bind(style);

function ManagePost() {
  const [listNews, setListNews] = useState([]);

  const items = [
    {
      href: "/",
      icon: <HomeIcon></HomeIcon>,
      text: "Trang chủ",
    },
    {
      text: "Quản lý tin đăng",
    },
  ];
  const { auth, category } = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const getAllNewsByUserId = async () => {
      try {
        dispatch(loadingStart());
        const response = await NewsAPI.getAllNews({
          userId: auth.login.currentUser.ID,
        });
        if (response.status === 200) {
          setListNews(response.data.data);
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
    getAllNewsByUserId();
  }, [auth.login.currentUser.ID, dispatch]);

  const confirm = () => {
    message.error("Không có được xóa!");
  };

  return (
    <div className={cx("wrapper")}>
      <MyBreadCrumb items={items}></MyBreadCrumb>
      <div className={cx("top")}>
        <h1>Quản lý tin đăng</h1>
        <div className={cx("filter")}>
          <Select
            className={cx("filter-item")}
            defaultValue="Lọc theo loại tin VIP"
            onChange={handleChange}
            options={category.categoryNews.map((item) => {
              return {
                value: item.ID,
                label: item.name,
              };
            })}
          />
          <Select
            className={cx("filter-item")}
            defaultValue="Lọc theo trạng thái"
            onChange={handleChange}
            options={[
              { value: "0", label: "Tin đang hiển thị" },
              { value: "1", label: "Tin hết hạn" },
              { value: "2", label: "Tin đang ẩn" },
            ]}
          />
          <Link className={cx("filter-item")} to={"/new-post"}>
            Đăng tin mới
          </Link>
        </div>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Mã tin</th>
            <th>Ảnh đại diện</th>
            <th>Tiêu đề</th>
            <th>Giá</th>
            <th>Ngày bắt đầu</th>
            <th>Ngày hết hạn</th>
            <th>Trạng thái</th>
          </tr>
          {listNews.length > 0 ? (
            listNews.map((item) => {
              return (
                <tr key={item.ID}>
                  <td>
                    <div className={cx("post-id")}>
                      <p>#{item.ID.split("-")[0]}</p>
                    </div>
                  </td>
                  <td>
                    <div className={cx("post-image")}>
                      <img src={item.featured_Image} alt="/" />
                    </div>
                  </td>
                  <td>
                    <div className={cx("post-info")}>
                      <Link
                        to={`/news-detail?newsId=${item.ID}`}
                        className={cx("title")}
                      >
                        <p>{item.roomType}</p>
                        <span className={cx("post-title")}>{item.title}</span>
                      </Link>
                      <div className={cx("address")}>
                        <p>Địa chỉ:</p>
                        <span className={cx("post-address")}>
                          {`${item.house_Number}, ${item.ward}, ${item.district}, ${item.province}`}
                        </span>
                      </div>
                      <div className={cx("btn-wrapper")}>
                        <Link to={"#"} className={cx("btn-edit", "btn")}>
                          <ModeEditOutlineOutlinedIcon></ModeEditOutlineOutlinedIcon>
                          Sửa tin
                        </Link>
                        <Popconfirm
                          placement="topLeft"
                          title={"Bạn có chắc xóa tin này?"}
                          onConfirm={confirm}
                          okText="Yes"
                          cancelText="No"
                        >
                          <div className={cx("btn-delete", "btn")}>
                            <DeleteOutlineIcon></DeleteOutlineIcon>
                            Xóa tin
                          </div>
                        </Popconfirm>
                      </div>
                      <div className={cx("update")}>
                        <p>Cập nhật gần nhất:</p>
                        <p>{moment(item.updatedAt).fromNow()}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={cx("price")}>
                      <p>{item.price / 1000000} triệu/tháng</p>
                    </div>
                  </td>
                  <td>
                    <div className={cx("post-date")}>
                      <p>{moment(item.createdAt).format("DD/MM/YYYY")}</p>
                    </div>
                  </td>
                  <td>
                    <div className={cx("expire-date")}>
                      <p>{moment(item.expire_At).format("DD/MM/YYYY")}</p>
                    </div>
                  </td>
                  <td>
                    <div className={cx("status")}>
                      {item.status === 0 ? (
                        <p style={{ color: "#bdc20e", fontWeight: 600 }}>
                          Chờ xác nhận
                        </p>
                      ) : (
                        <p style={{ color: "green", fontWeight: 600 }}>
                          Đã thanh toán
                        </p>
                      )}
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
      {!listNews.length > 0 && (
        <div className={cx("null")}>
          Bạn chưa có tin đăng nào. Bấm <Link to={"/new-post"}>vào đây</Link> để
          bắt đầu đăng tin.
        </div>
      )}
      <Footer></Footer>
    </div>
  );
}

export default ManagePost;
