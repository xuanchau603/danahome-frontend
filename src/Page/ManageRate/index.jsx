import style from "./ManageRate.module.scss";
import classNames from "classnames/bind";
import MyBreadCrumb from "../../components/MyBreadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ReplyIcon from "@mui/icons-material/Reply";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Menu from "../../components/Menu";
import MyButton from "../../components/MyButton";
import reviewsAPI from "../../API/reviewsAPI";
import { useSelector } from "react-redux";
import verifyAPI from "../../API/verifyAPI";
import { message } from "antd";
import { loadingEnd, loadingStart } from "../../Redux/loadingSlice";
import { useDispatch } from "react-redux";

const cx = classNames.bind(style);

const items = [
  {
    href: "/",
    icon: <HomeIcon></HomeIcon>,
    text: "Trang chủ",
  },
  {
    href: "./manage-rate",
    text: "Quản lý đánh giá",
  },
];

function ManageRate() {
  const [MenuRate, setMenuRate] = useState();
  const [reviews, setReviews] = useState([]);
  const [reviewId, setReiviewId] = useState();
  const [reviewMail, setReiviewMail] = useState();
  const [reviewTitle, setReiviewTitle] = useState();
  const [reviewContent, setReiviewContent] = useState();


  const { auth } = useSelector((state) => {
    return state;
  });

  const dispatch = useDispatch();

  const ShowLoading = (active)=>{
    active ? dispatch(loadingStart()) : dispatch(loadingEnd());
  }

  useEffect(() => {
    const getStatistics = async () => {
      ShowLoading(true)
      const response = await reviewsAPI.getAllReviews(
        auth.login.currentUser.access_Token,
      );
      if (response.status === 200) {
        setReviews(response.data.data);
      }
      ShowLoading(false)
    };
    getStatistics();
  }, []);

  

  return (
    <div className={cx("wrapper")}>
      <MyBreadCrumb items={items}></MyBreadCrumb>
      <h1>Quản lý đánh giá</h1>
      <div className={cx("manage-rate")}>
        <table>
          <tr>
            <th>Mã bài đánh giá</th>
            <th>Tiêu đề</th>
            <th>Nội dung bài đánh giá</th>
            <th>Mức đánh giá</th>
            <th>Người đánh giá</th>
            <th>Chức năng</th>
          </tr>
          {reviews.length > 0
            ? reviews.map((item) => {
                return (
                  <tr>
                    <th>#{item.ID.split("-")[0]}</th>
                    <th style={{padding: 20, color: "#32a852", fontSize: 22, fontStyle: "italic"}}>{item.title.length > 30 ? `${item.title.replace(/(.{30})/g, "$1\n")}` : `${item.title}`}</th>
                    <th style={{padding: 20}}>{item.description.length > 30 ? `${item.description.replace(/(.{30})/g, "$1\n")}` : `${item.description}`}</th>
                    <th>{item.point}</th>
                    <th>{item.user.full_Name}</th>
                    <th>
                      <ul className={cx("btn")}>
                        <li className={cx("btn-delete")}>
                          <RemoveCircleIcon></RemoveCircleIcon>
                          <a href="/">Xoá</a>
                        </li>
                        <li className={cx("btn-reply")}>
                          <ReplyIcon></ReplyIcon>
                          <NavLink
                            onClick={() => {
                              setReiviewId(item.ID.split("-")[0])
                              setReiviewMail(item.user.email)
                              setMenuRate(true);
                            }}
                          >
                            Phản hồi
                          </NavLink>
                        </li>
                      </ul>
                    </th>
                  </tr>
                );
              })
            : null}
        </table>
        {MenuRate && (
          <Menu
            classes={cx("menu-status")}
            onCancel={() => {
              setMenuRate(false);
            }}
            open={MenuRate}
            title={`Phản hồi đánh giá`}
          >
            <div className={cx("container")}>
              <div className={cx("form-group")}>
                <b>Mã bài đánh giá:</b>
                <input type="text" disabled value={`#${reviewId}`} />
              </div>
              <div className={cx("form-group")}>
                <b>Tiêu đề:</b>
                <input type="text" value={reviewTitle} onChange={(e)=>{ setReiviewTitle(e.target.value) }}/>
              </div>
              <div className={cx("form-group")}>
                <b>Nội dung:</b>
                <input type="text" value={reviewContent} onChange={(e)=>{ setReiviewContent(e.target.value) }}/>
              </div>
              <MyButton primary classes={cx("btn-confirm")} onClick={async ()=>{

                const data = {
                  email: reviewMail,
                  title: reviewTitle,
                  content: reviewContent
                }
                ShowLoading(true)
                const response = await verifyAPI.responseReview(data);
                if(response.status === 200){
                  message.success(`${response.data.message} ${reviewMail}`)
                }else{
                  message.error("Phản hồi thất bại!")
                }
                ShowLoading(false)
              }}>
                Phản hồi
              </MyButton>
            </div>
          </Menu>
        )}
      </div>
    </div>
  );
}

export default ManageRate;
