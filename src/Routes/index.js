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
  },
];

// const privateRouter = [];

export default publicRoute;
