import style from "./ManageUser.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MyBreadCrumb from "../../components/MyBreadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import ViewListIcon from "@mui/icons-material/ViewList";
import {
  Button,
  Input,
  Pagination,
  Popconfirm,
  Radio,
  Select,
  Space,
  Tooltip,
  Upload,
  message,
} from "antd";
import { loadingEnd, loadingStart } from "../../Redux/loadingSlice";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Menu from "../../components/Menu";
import MyButton from "../../components/MyButton";
import Format from "../../components/Format";
import authAPI from "../../API/authAPI";
import { UploadOutlined } from "@ant-design/icons";

const cx = classNames.bind(style);

function ManageUser() {
  const [listUsers, setListUsers] = useState([]);
  const [MenuStatus, setMenuStatus] = useState(false);
  const [MenuRole, setMenuRole] = useState(false);
  const [status, setStatus] = useState();
  const [statusFilter, setstatusFilter] = useState(null);
  const [userId, setUserId] = useState();
  const [roleId, setRoleId] = useState();
  const [phone, setPhone] = useState();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [prevImage, setPrevImage] = useState();
  const [image, setImage] = useState();
  const [MenuUser, setMenuUser] = useState();
  const [MenuChangePasswordUser, setMenuChangePasswordUser] = useState();
  const [page, setPage] = useState(1);
  const [totalPagination, setTotalPagination] = useState();

  const items = [
    {
      href: "/",
      icon: <HomeIcon></HomeIcon>,
      text: "Trang chủ",
    },
    {
      text: "Quản lý tài khoản",
    },
  ];
  const { auth } = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

  const handleChangeRole = async (value) => {
    setRoleId(value ? value : undefined);
    setPage(1);
    try {
      dispatch(loadingStart());
      const response = await authAPI.getAllUsers(
        {
          roleId: value ? value : undefined,
          type: statusFilter,
          page,
        },
        auth.login.currentUser.access_Token,
      );
      if (response.status === 200) {
        setListUsers(response.data.data);
        setTotalPagination(response.data.totalUser);
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
    setPage(1);
    try {
      dispatch(loadingStart());
      const response = await authAPI.getAllUsers(
        {
          type: value ? value : undefined,
          roleId: roleId,
          page,
        },
        auth.login.currentUser.access_Token,
      );
      if (response.status === 200) {
        setListUsers(response.data.data);
        setTotalPagination(response.data.totalUser);

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
  const getAllUsers = async () => {
    try {
      dispatch(loadingStart());
      setPage(1);
      const response = await authAPI.getAllUsers(
        null,
        auth.login.currentUser.access_Token,
      );
      if (response.status === 200) {
        setListUsers(response.data.data);
        setTotalPagination(response.data.totalUser);
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

    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.login.currentUser.ID, dispatch]);
  const onChange = async (page) => {
    setPage(page);
    try {
      dispatch(loadingStart());
      const response = await authAPI.getAllUsers(
        {
          type: statusFilter ? statusFilter : undefined,
          roleId: roleId ? roleId : undefined,
          page,
        },
        auth.login.currentUser.access_Token,
      );
      if (response.status === 200) {
        setListUsers(response.data.data);
        setTotalPagination(response.data.totalUser);
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

  const confirm = () => {
    message.error("Không có được xóa!");
  };
  const onChangeRadio = (e) => {
    setStatus(e.target.value);
  };
  const onChangeRadioRole = (e) => {
    setRoleId(e.target.value);
  };

  return (
    <div className={cx("wrapper")}>
      <MyBreadCrumb items={items}></MyBreadCrumb>
      <div className={cx("top")}>
        <h1>Quản lý tài khoản</h1>
        <div className={cx("filter")}>
          <Select
            className={cx("filter-item")}
            defaultValue="Lọc theo quyền tài khoản"
            style={{ width: 220 }}
            onChange={handleChangeRole}
            options={[
              { value: 0, label: "Hiện thị tất cả" },
              {
                value: "e4bae67b-e413-11ed-99e0-ecf4bbc11824",
                label: "Tài khoản USER",
              },
              {
                value: "e4bacecd-e413-11ed-99e0-ecf4bbc11824",
                label: "Tài khoản ADMIN",
              },
            ]}
          />
          <Select
            className={cx("filter-item")}
            defaultValue="Lọc theo trạng thái tài khoản"
            style={{ width: 260 }}
            onChange={handleChangeStatus}
            options={[
              { value: 0, label: "Hiện thị tất cả" },
              { value: "2", label: "Tài khoản thường" },
              { value: "1", label: "Tài khoản VIP" },
              { value: "3", label: "Tài khoản đã bị khóa" },
            ]}
          />
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
          showTotal={(total) => `Có tất cả ${total} tài khoản`}
        />
      </div>
      <table>
        <tbody>
          <tr>
            <th>Mã tài khoản</th>
            <th>Ảnh đại diện</th>
            <th>Thông tin tài khoản</th>
            <th>Tin đã đăng</th>
            <th>Ngày đăng ký</th>
            <th>Quyền</th>
            <th>Trạng thái</th>
          </tr>
          {listUsers.length > 0 ? (
            listUsers.map((item) => {
              return (
                <tr key={item.ID}>
                  <td>
                    <div className={cx("post-id")}>
                      <p>#{item.ID.split("-")[0]}</p>
                    </div>
                  </td>
                  <td>
                    <div className={cx("post-image")}>
                      <img src={item.image_URL} alt="/" />
                    </div>
                  </td>
                  <td>
                    <div className={cx("post-info")}>
                      <span className={cx("title")}>
                        <b>Họ và tên: </b>{" "}
                        <span className={cx("post-title")}>
                          {item.full_Name}
                        </span>
                      </span>
                      <div className={cx("info")}>
                        <b>Email: </b>
                        {item.email}
                      </div>
                      <div className={cx("info")}>
                        <b>Số điện thoại: </b>
                        {item.phone}
                      </div>
                      <div className={cx("btn-wrapper")}>
                        <span
                          onClick={() => {
                            setUserId(item.ID);
                            setFullName(item.full_Name);
                            setPhone(item.phone);
                            setEmail(item.email);
                            setPrevImage(item.image_URL);
                            setMenuUser(true);
                          }}
                          className={cx("btn-edit", "btn")}
                        >
                          <ModeEditOutlineOutlinedIcon></ModeEditOutlineOutlinedIcon>
                          Cập nhật tài khoản
                        </span>
                        {item.status === 3 && (
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
                              Xóa tài khoản
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
                    <Link
                      to={`/manage-post`}
                      state={{
                        userId: item.ID,
                        poster: item.full_Name,
                      }}
                      className={cx("totalNews")}
                    >
                      <p>
                        <ViewListIcon fontSize="large"></ViewListIcon>
                        Đã đăng {item.total_News} tin!{" "}
                      </p>
                    </Link>
                  </td>
                  <td>
                    <div className={cx("created")}>
                      <p>
                        {moment(item.createdAt).format("DD/MM/YYYY-hh:mm:ss A")}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className={cx("role")}>
                      {Format.formatRole(item.role_Name)}
                      {auth.login.currentUser.isAdmin && item.status !== 3 && (
                        <Tooltip title="Thay đổi quyền">
                          <span
                            onClick={() => {
                              setUserId(item.ID);
                              setRoleId(item.role_Id);
                              setMenuRole(true);
                            }}
                            className={cx("btn-edit")}
                          >
                            <EditIcon></EditIcon>
                          </span>
                        </Tooltip>
                      )}
                    </div>
                  </td>

                  <td>
                    <div className={cx("status")}>
                      {Format.formatAccountType(item.type)}
                      {auth.login.currentUser.isAdmin && item.status !== 3 && (
                        <Tooltip title="Thay đổi trạng thái">
                          <span
                            onClick={() => {
                              setUserId(item.ID);
                              setStatus(item.type);
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
      {MenuStatus && (
        <Menu
          classes={cx("menu-status")}
          onCancel={() => {
            setMenuStatus(false);
          }}
          open={MenuStatus}
          title={`Cập nhật trạng thái tài khoản(Mã tài khoản: ${
            userId.split("-")[0]
          })`}
        >
          <h1>Chọn trạng thái</h1>
          <ul className={cx("list-option")}>
            <Radio.Group defaultValue={status} onChange={onChangeRadio}>
              <Space direction="vertical">
                <Radio value={1}>
                  <span className={cx("success")}>Tài khoản VIP</span>
                </Radio>
                <Radio value={2}>
                  <span className={cx("warn")}>Tài khoản thường</span>
                </Radio>

                <Radio value={3}>
                  <span className={cx("error")}>Khóa tài khoản</span>
                </Radio>
              </Space>
            </Radio.Group>
          </ul>
          <MyButton
            onClick={async () => {
              dispatch(loadingStart());
              try {
                const formData = new FormData();
                formData.append("userId", userId);
                formData.append("type", status);
                const response = await authAPI.editUser(
                  formData,
                  auth.login.currentUser.access_Token,
                );
                const jsonData = await response.json();
                if (response.status === 200) {
                  getAllUsers();
                  setMenuStatus(false);
                  message.success(jsonData.message, 2);
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
      {MenuRole && (
        <Menu
          classes={cx("menu-status")}
          onCancel={() => {
            setMenuRole(false);
          }}
          open={MenuRole}
          title={`Cập nhật quyền tài khoản(Mã tài khoản: ${
            userId.split("-")[0]
          })`}
        >
          <h1>Chọn quyền</h1>
          <ul className={cx("list-option")}>
            <Radio.Group defaultValue={roleId} onChange={onChangeRadioRole}>
              <Space direction="vertical">
                <Radio value={"e4bacecd-e413-11ed-99e0-ecf4bbc11824"}>
                  <span className={cx("success")}>Quản trị viên (ADMIN)</span>
                </Radio>
                <Radio value={"e4bae67b-e413-11ed-99e0-ecf4bbc11824"}>
                  <span className={cx("warn")}>Người dùng hệ thống (USER)</span>
                </Radio>
              </Space>
            </Radio.Group>
          </ul>
          <MyButton
            onClick={async () => {
              dispatch(loadingStart());
              try {
                const formData = new FormData();
                formData.append("userId", userId);
                formData.append("roleId", roleId);
                const response = await authAPI.editUser(
                  formData,
                  auth.login.currentUser.access_Token,
                );
                const jsonData = await response.json();
                if (response.status === 200) {
                  await getAllUsers();
                  setMenuRole(false);
                  message.success(jsonData.message, 2);
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
      {MenuUser && (
        <Menu
          classes={cx("menu-status")}
          onCancel={() => {
            setImage(undefined);
            setMenuUser(false);
          }}
          open={MenuUser}
          title={`Cập nhật thông tin tài khoản(Mã tài khoản: ${
            userId.split("-")[0]
          })`}
        >
          <div className={cx("container")}>
            <div className={cx("form-group")}>
              <b>Mã thành viên:</b>
              <Input className={cx("input")} value={userId} disabled />
            </div>
            <div className={cx("form-group")}>
              <b>Số điện thoại:</b>
              <Input
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                value={phone}
                className={cx("input")}
              />
            </div>
            <div className={cx("form-group")}>
              <b>Tên hiển thị:</b>
              <Input
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                className={cx("input")}
              />
            </div>
            <div className={cx("form-group")}>
              <b>Email:</b>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={cx("input")}
              />
            </div>
            <div className={cx("form-group")}>
              <b>Số Zalo:</b>
              <Input value={phone} className={cx("input")} />
            </div>
            <div className={cx("form-group")}>
              <b>Facebook:</b>
              <Input
                className={cx("input")}
                placeholder="Liên kết trang cá nhân của bạn"
              />
            </div>
            <div style={{ margin: "4rem 0" }} className={cx("form-action")}>
              <div className={cx("password")}>
                <b>Mật khẩu:</b>
                <MyButton
                  onClick={() => {
                    setPassword("");
                    setConfirmPassword("");
                    setMenuChangePasswordUser(true);
                  }}
                  classes={cx("btn-changePass")}
                  outline
                >
                  Đổi mật khẩu
                </MyButton>
              </div>
              <div className={cx("avatar")}>
                <b>Ảnh đại diện:</b>
                <div>
                  <img src={prevImage} alt="" />
                  <Upload
                    showUploadList={false}
                    onChange={(file) => {
                      setImage(file.file.originFileObj);
                      setPrevImage(
                        URL.createObjectURL(file.file.originFileObj),
                      );
                    }}
                    customRequest={(e) => {
                      return e.onSuccess();
                    }}
                    beforeUpload={(file) => {
                      const isPNG =
                        file.type === "image/png" ||
                        file.type === "image/jpeg" ||
                        file.type === "image/jpg";
                      if (!isPNG) {
                        message.error(
                          `Chỉ được phép chọn file có đuôi png/jpeg/jpg`,
                        );
                      }
                      return isPNG || Upload.LIST_IGNORE;
                    }}
                    className={cx("btn-upload")}
                  >
                    <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                  </Upload>
                </div>
              </div>
            </div>

            <MyButton
              onClick={async () => {
                const formData = new FormData();
                formData.append("userId", userId);
                formData.append("phone", phone);
                formData.append("email", email);
                formData.append("fullName", fullName);
                formData.append("image", image);
                formData.append("zaloPhone", phone);
                formData.append("facebookUrl", "");
                console.log(...formData);
                try {
                  dispatch(loadingStart());
                  const response = await authAPI.editUser(
                    formData,
                    auth.login.currentUser.access_Token,
                  );
                  const jsonData = await response.json();
                  if (response.status === 200) {
                    await getAllUsers();
                    message.success(jsonData.message);
                    setMenuUser(false);
                    dispatch(loadingEnd());
                  } else {
                    message.error("Cập nhật không thành công");
                    dispatch(loadingEnd());
                  }
                } catch (error) {
                  message.error("Không thể kết nối đến Server");
                  dispatch(loadingEnd());
                }
              }}
              disible={!phone || !fullName || !email}
              classes={cx("btn-submit")}
              primary
            >
              Lưu & Cập nhật
            </MyButton>
          </div>
        </Menu>
      )}
      {MenuChangePasswordUser && (
        <Menu
          classes={cx("menu-status")}
          onCancel={() => {
            setMenuChangePasswordUser(false);
          }}
          open={MenuChangePasswordUser}
          title={`Cập nhật mật khẩu tài khoản(Mã tài khoản: ${
            userId.split("-")[0]
          })`}
        >
          <div className={cx("container")}>
            <div className={cx("form-group")}>
              <b>Nhập mật khẩu mới:</b>
              <Input
                placeholder="mật khẩu..."
                className={cx("input")}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className={cx("form-group")}>
              <b>Nhập lại khẩu mới:</b>
              <Input
                placeholder="nhập lại mật khẩu..."
                className={cx("input")}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                value={confirmPassword}
              />
            </div>

            <MyButton
              onClick={async () => {
                try {
                  dispatch(loadingStart());
                  const response = await authAPI.resetPassword(
                    userId,
                    "",
                    password,
                    auth.login.currentUser.access_Token,
                  );
                  if (response.status === 200) {
                    setPassword("");
                    setConfirmPassword("");
                    message.success(response.data.message, 2);
                    dispatch(loadingEnd());
                  } else {
                    message.error(response.message, 2);
                    dispatch(loadingEnd());
                  }
                } catch (error) {
                  message.error("Không thể kết nối đến server!");
                  dispatch(loadingEnd());
                }
              }}
              disible={
                password.length < 6 ||
                confirmPassword.length < 6 ||
                password !== confirmPassword
              }
              classes={cx("btn-submit")}
              primary
            >
              Lưu & Cập nhật
            </MyButton>
          </div>
        </Menu>
      )}
    </div>
  );
}

export default ManageUser;
