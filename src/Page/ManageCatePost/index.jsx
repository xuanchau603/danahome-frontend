import style from "./ManageCatePost.module.scss";
import classNames from "classnames/bind";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import MyButton from "../../components/MyButton";
import MyBreadCrumb from "../../components/MyBreadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import EditIcon from "@mui/icons-material/Edit";
import categoryAPI from "../../API/categoryAPI";
import Format from "../../components/Format";
import { message } from "antd";

const cx = classNames.bind(style);

const items = [
  {
    href: "/",
    icon: <HomeIcon></HomeIcon>,
    text: "Trang chủ",
  },
  {
    href: "./manage-cate-post",
    text: "Quản lý loại tin",
  },
];

function ManageCatePost() {
  const [MenuCatePost, setMenuCatePost] = useState();
  const [MenuEditPost, setMenuEditPost] = useState();
  const [ListCatePost, SetListCatePost] = useState([]);

  //Edit news
  const [IDPostEdit, SetIDPostEdit] = useState();
  const [NamePostEdit, SetNamePostEdit] = useState();
  const [PricePostEdit, SetPricePostEdit] = useState();

  //Add news
  const [NamePost, SetNamePost] = useState();
  const [PricePost, SetPricePost] = useState();

  useEffect(() => {
    const GetAllCateNews = async () => {
      const response = await categoryAPI.getAllCategoryNews();

      if (response.status === 200) {
        SetListCatePost(response.data.data);
      } else {
        message.error(response.message);
      }
    };
    GetAllCateNews();
  }, []);

  return (
    <div className={cx("wrapper")}>
      <MyBreadCrumb items={items}></MyBreadCrumb>
      <h1>Quản lý loại tin</h1>
      <div className={cx("manage-cate-post")}>
        <table>
          <tr>
            <th>Mã loại tin</th>
            <th>Loại tin</th>
            <th>Giá loại tin</th>
            <th>Chức năng</th>
          </tr>
          {ListCatePost.map((item) => {
            return (
              <tr>
                <th>#{item.ID.split("-")[0]}</th>
                <th>{item.name}</th>
                <th>{Format.formatPrice(item.price)}</th>
                <th>
                  <div className={cx("action")}>
                    <span className={cx("btn-remove")}>
                      <RemoveCircleIcon></RemoveCircleIcon>
                      <a href="">Xoá</a>
                    </span>
                    <span
                      onClick={() => {
                        SetIDPostEdit(item.ID);
                        SetNamePostEdit(item.name);
                        SetPricePostEdit(item.price);
                        setMenuEditPost(true);
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
          setMenuCatePost(true);
        }}
        primary
        classes={cx("btn-add")}
      >
        Thêm loại tin mới
      </MyButton>
      {MenuCatePost && (
        <Menu
          classes={cx("menu-status")}
          onCancel={() => {
            setMenuCatePost(false);
          }}
          open={MenuCatePost}
          title={`Thêm loại tin`}
        >
          <div className={cx("container")}>
            <div className={cx("form-group")}>
              <b>Loại tin:</b>
              <input
                value={NamePost}
                type="text"
                onChange={(event) => {
                  SetNamePost(event.target.value);
                }}
              />
            </div>
            <div className={cx("form-group")}>
              <b>Giá tiền:</b>
              <input
                value={PricePost}
                type="text"
                onChange={(event) => {
                  SetPricePost(event.target.value);
                }}
              />
            </div>
            <MyButton
              onClick={() => {
                //Request post add news
                console.log({
                  NamePost,
                  PricePost,
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
      {MenuEditPost && (
        <Menu
          classes={cx("menu-status")}
          onCancel={() => {
            setMenuEditPost(false);
          }}
          open={MenuEditPost}
          title={`Sửa loại tin`}
        >
          <div className={cx("container")}>
            <div className={cx("form-group")}>
              <b>Mã loại tin:</b>
              <input type="text" value={IDPostEdit} disabled />
            </div>
            <div className={cx("form-group")}>
              <b>Loại tin:</b>
              <input
                type="text"
                value={NamePostEdit}
                onChange={(event) => {
                  SetNamePostEdit(event.target.value);
                }}
              />
            </div>
            <div className={cx("form-group")}>
              <b>Giá tiền:</b>
              <input
                type="text"
                value={PricePostEdit}
                onChange={(event) => {
                  SetPricePostEdit(event.target.value);
                }}
              />
            </div>
            <MyButton
              onClick={() => {
                //Request handle edit category news

                console.log({
                  IDPostEdit,
                  NamePostEdit,
                  PricePostEdit,
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

export default ManageCatePost;
