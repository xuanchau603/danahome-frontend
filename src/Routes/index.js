import LayoutWithSearchBox from "../Layout/LayoutWithSearchBox";
import ManageLayout from "../Layout/ManageLayout";
import Favorite from "../Page/Favorite";
import Home from "../Page/Home";
import ManagePost from "../Page/ManagePost";
import NewPost from "../Page/NewPost";
import NewsDetail from "../Page/NewsDetail";
import Payment from "../Page/Payment";
import SearchResult from "../Page/SearchResult";

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
  },
  {
    path: "/manage-post",
    component: ManagePost,
    layout: ManageLayout,
  },
];

// const privateRouter = [];

export default publicRoute;
export { UserRouter };
