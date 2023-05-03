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
  Input,
  Popconfirm,
  Radio,
  Select,
  Space,
  Tooltip,
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
  const [MenuUser, setMenuUser] = useState();
  const [MenuChangePasswordUser, setMenuChangePasswordUser] = useState();

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
    try {
      dispatch(loadingStart());
      const response = await authAPI.getAllUsers(
        {
          roleId: value ? value : undefined,
          type: statusFilter,
        },
        auth.login.currentUser.access_Token,
      );
      if (response.status === 200) {
        setListUsers(response.data.data);
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
      const response = await authAPI.getAllUsers(
        {
          type: value ? value : undefined,
          roleId: roleId,
        },
        auth.login.currentUser.access_Token,
      );
      if (response.status === 200) {
        setListUsers(response.data.data);
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
      const response = await authAPI.getAllUsers(
        null,
        auth.login.currentUser.access_Token,
      );
      if (response.status === 200) {
        setListUsers(response.data.data);
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
                  getAllUsers();
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
            setMenuUser(false);
          }}
          open={MenuUser}
          title={`Cập nhật thông tin tài khoản(Mã tài khoản: ${
            userId.split("-")[0]
          })`}
        >
          <div className={cx("container")}>
            <div className={cx("form-group")}>
              <span>Mã thành viên:</span>
              <Input className={cx("input")} value={userId} disabled />
            </div>
            <div className={cx("form-group")}>
              <span>Số điện thoại:</span>
              <Input
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                value={phone}
                className={cx("input")}
              />
            </div>
            <div className={cx("form-group")}>
              <span>Tên hiển thị:</span>
              <Input
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
                className={cx("input")}
              />
            </div>
            <div className={cx("form-group")}>
              <span>Email:</span>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={cx("input")}
              />
            </div>
            <div className={cx("form-group")}>
              <span>Số Zalo:</span>
              <Input value={phone} className={cx("input")} />
            </div>
            <div className={cx("form-group")}>
              <span>Facebook:</span>
              <Input
                className={cx("input")}
                placeholder="Liên kết trang cá nhân của bạn"
              />
            </div>
            <div style={{ margin: "4rem 0" }} className={cx("form-group")}>
              <span>Mật khẩu:</span>
              <MyButton
                onClick={() => {
                  // setPassword("");
                  setMenuChangePasswordUser(true);
                }}
                classes={cx("btn-changePass")}
                outline
              >
                Đổi mật khẩu
              </MyButton>
            </div>
            {/* <div className={cx("form-group-avatar")}>
              <span>Ảnh đại diện:</span>
              <div className={cx("avatar")}>
                <img src={imagePreview[0]} alt=""></img> <br></br>
                <Upload
                  showUploadList={false}
                  onChange={(file) => {
                    setImage(file.file.originFileObj);
                    getBase64(file.file.originFileObj, (url) => {
                      setImagePreview([url]);
                    });
                  }}
                  customRequest={(e) => {
                    return e.onSuccess();
                  }}
                  fileList={imagePreview}
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
            </div> */}

            <MyButton
              // onClick={handleSubmit}
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
              <span>Nhập mật khẩu mới:</span>
              <Input className={cx("input")} />
            </div>

            <MyButton
              // onClick={handleSubmit}
              disible={!phone || !fullName || !email}
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
