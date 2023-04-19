import LayoutWithSearchBox from "../Layout/LayoutWithSearchBox";
import Favorite from "../Page/Favorite";
import Home from "../Page/Home";
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
  },
  {
    path: "/payment",
    component: Payment,
  },
];

// const privateRouter = [];

export default publicRoute;
export { UserRouter };
