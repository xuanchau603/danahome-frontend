import LayoutWithSearchBox from "../Layout/LayoutWithSearchBox";
import Favorite from "../Page/Favorite";
import Home from "../Page/Home";
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
];

// const privateRouter = [];

export default publicRoute;
