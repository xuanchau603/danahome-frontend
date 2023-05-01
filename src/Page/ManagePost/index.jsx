import style from "./ManagePost.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import PreviewIcon from "@mui/icons-material/Preview";
import BlockIcon from "@mui/icons-material/Block";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MyBreadCrumb from "../../components/MyBreadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import {
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

  const handleChangeCategory = async (value) => {
    setcategoryNewsId(value ? value : undefined);
    try {
      dispatch(loadingStart());
      const response = await NewsAPI.getAllNews({
        categoryNewsId: value ? value : undefined,
        status: statusFilter,
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
  const handleChangeStatus = async (value) => {
    setstatusFilter(value ? value : undefined);
    try {
      dispatch(loadingStart());
      const response = await NewsAPI.getAllNews({
        status: value ? value : undefined,
        categoryNewsId: categoryNewsId,
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

  useEffect(() => {
    window.scrollTo(0, 0);

    getAllNewsByUserId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.login.currentUser.ID, dispatch]);

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
        <h1>Quản lý tin đăng</h1>
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
                        <b>Địa chỉ: </b>
                        {`${item.house_Number}, ${item.ward.name}, ${item.district.name}, ${item.province.name}`}
                      </div>
                      <div className={cx("btn-wrapper")}>
                        <Link
                          to={`/edit-post?newsId=${item.ID}`}
                          className={cx("btn-edit", "btn")}
                        >
                          <ModeEditOutlineOutlinedIcon></ModeEditOutlineOutlinedIcon>
                          Sửa tin
                        </Link>
                        {item.status === 2 && (
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
                                  notification.success({
                                    placement: "topRight",
                                    duration: 5,
                                    message: "Tin này đã được ẩn",
                                    className: cx("notify"),
                                  });
                                  getAllNewsByUserId();
                                } else {
                                  message.error(jsonData.message, 2);
                                  dispatch(loadingEnd());
                                }
                              } catch (error) {
                                message.error(
                                  "Không thể kết nối đến server!",
                                  2,
                                );
                                dispatch(loadingEnd());
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
                              console.log(item.ID);
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
                                  notification.success({
                                    placement: "topRight",
                                    duration: 2,
                                    message: "Bài đăng đã được hiện thị lại",
                                  });
                                  getAllNewsByUserId();
                                } else {
                                  message.error(jsonData.message, 2);
                                  dispatch(loadingEnd());
                                }
                              } catch (error) {
                                message.error(
                                  "Không thể kết nối đến server!",
                                  2,
                                );
                                dispatch(loadingEnd());
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
                        {item.status === 3 && (
                          <div className={cx("btn-extend", "btn")}>
                            <PublishedWithChangesIcon></PublishedWithChangesIcon>
                            Gia hạn tin
                          </div>
                        )}
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
                      {MenuStatus && (
                        <Menu
                          classes={cx("menu-status")}
                          onCancel={() => {
                            setMenuStatus(false);
                          }}
                          open={MenuStatus}
                          title={`Cập nhật trạng thái tin(Mã tin: ${
                            newsId.split("-")[0]
                          })`}
                        >
                          <h1>Chọn trạng thái</h1>
                          <ul className={cx("list-option")}>
                            <Radio.Group
                              defaultValue={status}
                              onChange={onChangeRadio}
                            >
                              <Space direction="vertical">
                                <Radio value={1}>
                                  <span className={cx("warn")}>
                                    Chờ xác nhận
                                  </span>
                                </Radio>
                                <Radio value={2}>
                                  <span className={cx("success")}>
                                    Đang hiển thị
                                  </span>
                                </Radio>

                                <Radio value={3}>
                                  <span className={cx("error")}>Hết hạn</span>
                                </Radio>
                                <Radio value={4}>
                                  <span className={cx("hide")}>Đã ẩn</span>
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
                                  getAllNewsByUserId();
                                } else {
                                  message.error(jsonData.message, 2);
                                  dispatch(loadingEnd());
                                }
                              } catch (error) {
                                message.error(
                                  "Không thể kết nối đến server!",
                                  2,
                                );
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
    </div>
  );
}

export default ManagePost;
