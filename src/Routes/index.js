import LayoutWithSearchBox from "../Layout/LayoutWithSearchBox";
import Favorite from "../Page/Favorite";
import Home from "../Page/Home";
import NewsDetail from "../Page/NewsDetail";
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

// const privateRouter = [];

export default publicRoute;
