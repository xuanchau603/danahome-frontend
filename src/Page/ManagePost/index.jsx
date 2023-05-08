import style from "./ManagePost.module.scss";
import classNames from "classnames/bind";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import PreviewIcon from "@mui/icons-material/Preview";
import BlockIcon from "@mui/icons-material/Block";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import MyBreadCrumb from "../../components/MyBreadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import {
  Pagination,
  Popconfirm,
  Radio,
  Select,
  Space,
  Tooltip,
  message,
  notification,
} from "antd";
import { loadingEnd, loadingStart } from "../../Redux/loadingSlice";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import NewsAPI from "./../../API/newsAPI";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Menu from "../../components/Menu";
import MyButton from "../../components/MyButton";
import Format from "../../components/Format";

const cx = classNames.bind(style);

function ManagePost() {
  const [listNews, setListNews] = useState([]);
  const [MenuStatus, setMenuStatus] = useState(false);
  const [status, setStatus] = useState();
  const [statusFilter, setstatusFilter] = useState(null);
  const [newsId, setNewsId] = useState();
  const [categoryNewsId, setcategoryNewsId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPagination, setTotalPagination] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [address, setAddress] = useState();
  const [price, setPrice] = useState();
  const [acreage, setAcreage] = useState();
  const [object, setObject] = useState();
  const [MenuPrevNews, setMenuPrevNews] = useState(false);

  const location = useLocation();
  const userId = location.state.userId;
  const poster = location.state.poster;
  const { auth, category } = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

  const onChange = async (page) => {
    setPage(page);
    try {
      dispatch(loadingStart());
      const response = await NewsAPI.getAllNews({
        categoryNewsId: categoryNewsId ? categoryNewsId : undefined,
        status: statusFilter ? statusFilter : undefined,
        userId: userId,
        page,
      });
      if (response.status === 200) {
        setListNews(response.data.data);
        setTotalPagination(response.data.totalNews);
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
  const navigate = useNavigate();

  const items = [
    {
      href: "/",
      icon: <HomeIcon></HomeIcon>,
      text: "Trang chủ",
    },
    {
      text: "Quản lý tin đăng",
      state: {
        userId: auth.login.currentUser.ID,
      },
    },
  ];

  const handleChangeCategory = async (value) => {
    setcategoryNewsId(value ? value : undefined);
    try {
      dispatch(loadingStart());
      setPage(1);
      const response = await NewsAPI.getAllNews({
        categoryNewsId: value ? value : undefined,
        status: statusFilter,
        userId: userId,
      });
      if (response.status === 200) {
        setListNews(response.data.data);
        setTotalPagination(response.data.totalNews);
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
  const handleChangeStatus = async (value) => {
    setstatusFilter(value ? value : undefined);
    try {
      dispatch(loadingStart());
      setPage(1);
      const response = await NewsAPI.getAllNews({
        status: value ? value : undefined,
        categoryNewsId: categoryNewsId,
        userId: userId,
      });
      if (response.status === 200) {
        setListNews(response.data.data);
        setTotalPagination(response.data.totalNews);
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
  const getAllNewsByUserId = async () => {
    try {
      dispatch(loadingStart());
      setPage(1);
      const response = await NewsAPI.getAllNews({
        userId: userId,
      });
      if (response.status === 200) {
        setTotalPagination(response.data.totalNews);
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

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllNewsByUserId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const confirm = () => {
    message.error("Không có được xóa!");
  };
  const onChangeRadio = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className={cx("wrapper")}>
      <MyBreadCrumb items={items}></MyBreadCrumb>
      <div className={cx("top")}>
        <h1>
          Quản lý tin đăng
          {poster
            ? ` (Tài khoản: ${poster})`
            : ` (Tài khoản: ${auth.login.currentUser.full_Name})`}
        </h1>
        <div className={cx("filter")}>
          <Select
            className={cx("filter-item")}
            defaultValue="Lọc theo loại tin VIP"
            onChange={handleChangeCategory}
            options={[
              { value: 0, label: "Hiện thị tất cả" },
              ...category.categoryNews.map((item) => {
                return {
                  value: item.ID,
                  label: item.name,
                };
              }),
            ]}
          />
          <Select
            className={cx("filter-item")}
            defaultValue="Lọc theo trạng thái"
            style={{ width: 220 }}
            onChange={handleChangeStatus}
            options={[
              { value: 0, label: "Hiện thị tất cả" },
              { value: "2", label: "Tin đang hiển thị" },
              { value: "3", label: "Tin hết hạn" },
              { value: "1", label: "Tin đang chờ xác nhận" },
              { value: "4", label: "Tin đang ẩn" },
              { value: "5", label: "Tin chưa thanh toán" },
            ]}
          />
          <Link className={cx("filter-item")} to={"/new-post"}>
            Đăng tin mới
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
          showTotal={(total) => `Có tất cả ${total} bài đăng`}
        />
      </div>
      <table>
        <tbody>
          <tr>
            <th>Mã tin</th>
            <th>Ảnh đại diện</th>
            <th>Tiêu đề</th>
            <th>Giá</th>
            <th>Ngày đăng tin</th>
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
                      <span className={cx("title")}>
                        <p>{item.roomType}</p>
                        <span
                          onClick={() => {
                            if (item.status === 2) {
                              navigate(`/news-detail?newsId=${item.ID}`);
                            } else {
                              setNewsId(item.ID);
                              setTitle(item.title);
                              setDescription(item.description);
                              setAddress(
                                `${item.province.name},${item.district.name},${item.ward.name},${item.house_Number}`,
                              );
                              setPrice(item.price);
                              setAcreage(item.acreage);
                              setObject(item.object);
                              setMenuPrevNews(true);
                            }
                          }}
                          className={cx("post-title")}
                        >
                          {item.title}{" "}
                          {moment(item.expire_At).diff(moment(), "hours") <=
                            24 &&
                            moment(item.expire_At).diff(moment(), "hours") >
                              0 &&
                            item.status === 3 && (
                              <small>
                                <AutoDeleteIcon></AutoDeleteIcon>
                                {`hết hạn sau: ${moment(item.expire_At).diff(
                                  moment(),
                                  "hours",
                                )} giờ`}
                              </small>
                            )}
                        </span>
                      </span>
                      <div className={cx("address")}>
                        <b>Địa chỉ: </b>
                        {`${item.house_Number}, ${item.ward.name}, ${item.district.name}, ${item.province.name}`}
                      </div>
                      <div className={cx("actor")}>
                        <b>Người đăng tin: </b>
                        {item.poster}
                      </div>
                      <div className={cx("btn-wrapper")}>
                        <Link
                          to={`/edit-post?newsId=${item.ID}`}
                          className={cx("btn-edit", "btn")}
                        >
                          <ModeEditOutlineOutlinedIcon></ModeEditOutlineOutlinedIcon>
                          Sửa tin
                        </Link>
                        {item.status === 2 && item.status !== 1 && (
                          <Popconfirm
                            placement="topLeft"
                            title={"Bạn có chắc muốn ẩn tin này?"}
                            onConfirm={async () => {
                              dispatch(loadingStart());
                              try {
                                const formData = new FormData();
                                formData.append("newsId", item.ID);
                                formData.append("status", "4");
                                const response = await NewsAPI.editNews(
                                  formData,
                                  auth.login.currentUser.access_Token,
                                );
                                const jsonData = await response.json();
                                if (response.status === 200) {
                                  getAllNewsByUserId();
                                  notification.success({
                                    placement: "topRight",
                                    duration: 2,
                                    message: "Tin này đã được ẩn",
                                    className: cx("notify"),
                                  });
                                } else {
                                  dispatch(loadingEnd());
                                  message.error(jsonData.message, 2);
                                }
                              } catch (error) {
                                dispatch(loadingEnd());
                                message.error(
                                  "Không thể kết nối đến server!",
                                  2,
                                );
                              }
                            }}
                            okText="Có"
                            cancelText="Không"
                          >
                            <div className={cx("btn-hide", "btn")}>
                              <BlockIcon></BlockIcon>
                              Ẩn tin
                            </div>
                          </Popconfirm>
                        )}
                        {item.status === 4 && (
                          <Popconfirm
                            placement="topLeft"
                            title={"Hiển thị lại tin này?"}
                            onConfirm={async () => {
                              dispatch(loadingStart());
                              try {
                                const formData = new FormData();
                                formData.append("newsId", item.ID);
                                formData.append("status", "2");
                                const response = await NewsAPI.editNews(
                                  formData,
                                  auth.login.currentUser.access_Token,
                                );
                                const jsonData = await response.json();
                                if (response.status === 200) {
                                  getAllNewsByUserId();
                                  notification.success({
                                    placement: "topRight",
                                    duration: 2,
                                    message: "Bài đăng đã được hiện thị lại",
                                  });
                                } else {
                                  dispatch(loadingEnd());
                                  message.error(jsonData.message, 2);
                                }
                              } catch (error) {
                                dispatch(loadingEnd());
                                message.error(
                                  "Không thể kết nối đến server!",
                                  2,
                                );
                              }
                            }}
                            okText="Có"
                            cancelText="Không"
                          >
                            <div className={cx("btn-show", "btn")}>
                              <PreviewIcon></PreviewIcon>
                              Hiện tin
                            </div>
                          </Popconfirm>
                        )}
                        {item.status === 3 &&
                        moment(item.expire_At).diff(moment(), "hours") <= 24 ? (
                          <Link
                            to={"/extend-post"}
                            state={{
                              newsId: item.ID,
                              title: item.title,
                              newTypeId: item.categorys_News_Id,
                              newsTypePrice: item.newsTypePrice,
                            }}
                            className={cx("btn-extend", "btn")}
                          >
                            <PublishedWithChangesIcon></PublishedWithChangesIcon>
                            Gia hạn tin
                          </Link>
                        ) : null}
                        {item.status === 5 ? (
                          <Link
                            to={"/payment-online"}
                            state={{
                              newsId: item.ID,
                              title: item.title,
                              newTypeId: item.categorys_News_Id,
                              newsTypePrice: item.newsTypePrice,
                              expire_At: item.expire_At,
                              type: 1,
                            }}
                            className={cx("btn-extend", "btn")}
                          >
                            <AddCardOutlinedIcon></AddCardOutlinedIcon>
                            Thanh toán tin
                          </Link>
                        ) : null}
                        {auth.login.currentUser.isAdmin && (
                          <Popconfirm
                            placement="topLeft"
                            title={"Bạn có chắc xóa tin này?"}
                            onConfirm={confirm}
                            okText="Có"
                            cancelText="Không"
                          >
                            <div className={cx("btn-delete", "btn")}>
                              <DeleteOutlineIcon></DeleteOutlineIcon>
                              Xóa tin
                            </div>
                          </Popconfirm>
                        )}
                      </div>
                      <div className={cx("views")}>
                        Lượt hiển thị: {item.news_Views}
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
                      <p>
                        {moment(item.createdAt).format("DD/MM/YYYY-hh:mm:ss A")}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className={cx("expire-date")}>
                      <p>
                        {moment(item.expire_At).format("DD/MM/YYYY-hh:mm:ss A")}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className={cx("status")}>
                      {Format.formatStatus(item.status)}
                      {auth.login.currentUser.isAdmin && (
                        <Tooltip title="Thay đổi trạng thái">
                          <span
                            onClick={() => {
                              setNewsId(item.ID);
                              setStatus(item.status);
                              setMenuStatus(true);
                            }}
                            className={cx("btn-edit")}
                          >
                            <EditIcon></EditIcon>
                          </span>
                        </Tooltip>
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
                  message.success(jsonData.message, 2);
                  setMenuStatus(false);
                  getAllNewsByUserId();
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

export default ManagePost;
