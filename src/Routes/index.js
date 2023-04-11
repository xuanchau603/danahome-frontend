import LayoutWithSearchBox from "../Layout/LayoutWithSearchBox";
import Favorite from "../Page/Favorite";
import Home from "../Page/Home";

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
];

// const privateRouter = [];

export default publicRoute;
