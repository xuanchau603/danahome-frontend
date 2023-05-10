import LayoutWithSearchBox from "../Layout/LayoutWithSearchBox";
import ManageLayout from "../Layout/ManageLayout";
import EditPost from "../Page/EditPost";
import ExtendPost from "../Page/ExtendPost";
import Favorite from "../Page/Favorite";
import Home from "../Page/Home";
import ManageNews from "../Page/ManageNews";
import ManagePost from "../Page/ManagePost";
import ManageUser from "../Page/ManageUser";
import NewPost from "../Page/NewPost";
import NewsDetail from "../Page/NewsDetail";
import Payment from "../Page/Payment";
import PaymentHistory from "../Page/PaymentHistory";
import PaymentOnline from "../Page/PaymentOnline";
import Return from "../Page/Return";
import SearchResult from "../Page/SearchResult";
import UserInfo from "../Page/UserInfo";

const publicRoute = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/favorite",
    component: Favorite,
    layout: LayoutWithSearchBox,
  },
  {
    path: "/search-result",
    component: SearchResult,
    layout: LayoutWithSearchBox,
  },
  {
    path: "/news-detail",
    component: NewsDetail,
  },
  {
    path: "/return",
    component: Return,
  },
];

const UserRouter = [
  {
    path: "/new-post",
    component: NewPost,
    layout: ManageLayout,
  },
  {
    path: "/payment",
    component: Payment,
    layout: ManageLayout,
  },
  {
    path: "/manage-post",
    component: ManagePost,
    layout: ManageLayout,
  },
  {
    path: "/manage-news",
    component: ManageNews,
    layout: ManageLayout,
  },
  {
    path: "/user-information",
    component: UserInfo,
    layout: ManageLayout,
  },
  {
    path: "/edit-post",
    component: EditPost,
    layout: ManageLayout,
  },
  {
    path: "/manage-user",
    component: ManageUser,
    layout: ManageLayout,
  },
  {
    path: "/extend-post",
    component: ExtendPost,
    layout: ManageLayout,
  },
  {
    path: "/payment-online",
    component: PaymentOnline,
    layout: ManageLayout,
  },
  {
    path: "/payment-history",
    component: PaymentHistory,
    layout: ManageLayout,
  },
];

// const privateRouter = [];

export default publicRoute;
export { UserRouter };
