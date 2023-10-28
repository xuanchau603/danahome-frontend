import style from "./ManageRoom.module.scss";
import classNames from "classnames/bind";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import MyButton from "../../components/MyButton";
import MyBreadCrumb from "../../components/MyBreadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import { NavLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import categoryAPI from "../../API/categoryAPI";
import { message } from "antd";

const cx = classNames.bind(style);

const items = [
  {
    href: "/",
    icon: <HomeIcon></HomeIcon>,
    text: "Trang chủ",
  },
  {
    href: "./manage-room",
    text: "Quản lý loại phòng",
  },
];
function ManageRoom() {
  const [MenuRoom, setMenuRoom] = useState();
  const [MenuEditRoom, setMenuEditRoom] = useState();
  const [ListRoom, setListRoom] = useState([]);

  //Add rooms
  const [NameRoom, SetNameRoom] = useState();
  const [IDRoom, SetIDRoom] = useState();

  //Edit rooms
  const [IDRoomEdit, SetIDRoomEdit] = useState();
  const [NameRoomEdit, SetNameRoomEdit] = useState();

  useEffect(() => {
    const GetAllCateRooms = async () => {
      const response = await categoryAPI.getAllCategoryRooms();

      if (response.status === 200) {
        setListRoom(response.data.data);
      } else {
        message.error(response.message);
      }
    };
    GetAllCateRooms();
  }, []);

  return (
    <div className={cx("wrapper")}>
      <MyBreadCrumb items={items}></MyBreadCrumb>
      <h1>Quản lý loại phòng</h1>
      <div className={cx("manage-room")}>
        <table>
          <tr>
            <th>Mã loại phòng</th>
            <th>Loại phòng</th>
            <th>Chức năng</th>
          </tr>
          {ListRoom.map((item) => {
            return (
              <tr>
                <th>#{item.ID.split("-")[0]}</th>
                <th>{item.name}</th>
                <th>
                  <div className={cx("action")}>
                    <span className={cx("btn-remove")}>
                      <RemoveCircleIcon></RemoveCircleIcon>
                      <a href="">Xoá</a>
                    </span>
                    <span
                      onClick={() => {
                        SetIDRoomEdit(item.ID);
                        SetNameRoomEdit(item.name);
                        setMenuEditRoom(true);
                      }}
                      className={cx("btn-edit")}
                    >
                      <EditIcon></EditIcon>
                      <a>Sửa</a>
                    </span>
                  </div>
                </th>
              </tr>
            );
          })}
        </table>
      </div>
      <MyButton
        onClick={() => {
          setMenuRoom(true);
        }}
        primary
        classes={cx("btn-add")}
      >
        Thêm loại phòng mới
      </MyButton>
      {MenuRoom && (
        <Menu
          classes={cx("menu-status")}
          onCancel={() => {
            setMenuRoom(false);
          }}
          open={MenuRoom}
          title={`Thêm loại phòng`}
        >
          <div className={cx("container")}>
            <div className={cx("form-group")}>
              <b>Mã loại phòng:</b>
              <input
                value={IDRoom}
                type="text"
                disabled
                onChange={(event) => {
                  SetIDRoom(event.target.value);
                }}
              />
            </div>
            <div className={cx("form-group")}>
              <b>Loại phòng:</b>
              <input
                value={NameRoom}
                type="text"
                onChange={(event) => {
                  SetNameRoom(event.target.value);
                }}
              />
            </div>
            <MyButton
              onClick={() => {
                //Request post add rooms
                console.log({
                  IDRoom,
                  NameRoom,
                });
              }}
              primary
              classes={cx("btn-confirm")}
            >
              Thêm mới
            </MyButton>
          </div>
        </Menu>
      )}
      {MenuEditRoom && (
        <Menu
          classes={cx("menu-status")}
          onCancel={() => {
            setMenuEditRoom(false);
          }}
          open={MenuEditRoom}
          title={`Thêm loại phòng`}
        >
          <div className={cx("container")}>
            <div className={cx("form-group")}>
              <b>Mã loại phòng:</b>
              <input
                value={IDRoomEdit}
                type="text"
                disabled
                onChange={(event) => {
                  SetIDRoomEdit(event.target.value);
                }}
              />
            </div>
            <div className={cx("form-group")}>
              <b>Loại phòng:</b>
              <input
                value={NameRoomEdit}
                type="text"
                onChange={(event) => {
                  SetNameRoomEdit(event.target.value);
                }}
              />
            </div>
            <MyButton
              onClick={() => {
                //Request handle edit category news

                console.log({
                  IDRoomEdit,
                  NameRoomEdit,
                });
              }}
              primary
              classes={cx("btn-confirm")}
            >
              Cập nhật
            </MyButton>
          </div>
        </Menu>
      )}
    </div>
  );
}

export default ManageRoom;
