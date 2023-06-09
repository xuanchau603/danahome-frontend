import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import publicRoute, { UserRouter } from "./Routes";
import DefaultLayout from "./Layout/DefautLayout";
import Loading from "./components/Loading";
import { useDispatch, useSelector } from "react-redux";
import authAPI from "./API/authAPI";
import { message } from "antd";
import { InitUser } from "./Redux/authSlice";
import { useEffect } from "react";
import categoryAPI from "./API/categoryAPI";
import { loadingEnd, loadingStart } from "./Redux/loadingSlice";
import { InitCategoryNews, InitCategoryRooms } from "./Redux/categorySlice";

function App() {
  const dispath = useDispatch();

  const userId = localStorage.getItem("user_Id");
  useEffect(() => {
    if (userId) {
      const token = localStorage.getItem("token");
      const Init = async () => {
        try {
          const respone = await authAPI.getUserById(userId, token);
          if (respone.status === 200) {
            dispath(
              InitUser({
                ...respone.data.user_Info,
                access_Token: token,
              }),
            );
          }
        } catch (error) {
          message.error("Không thể kết nối đến Server", 2);
        }
      };
      Init();
    }
    const getAllCateryRooms = async () => {
      try {
        dispath(loadingStart());
        const response = await categoryAPI.getAllCategoryRooms();
        if (response.status === 200) {
          dispath(InitCategoryRooms(response.data.data));
          dispath(loadingEnd());
        } else {
          message.error(response.message);
          dispath(loadingEnd());
        }
      } catch (error) {
        message.error("Không thể kết nối đến server", 2);
        dispath(loadingEnd());
      }
    };
    getAllCateryRooms();
    const getAllCateryNews = async () => {
      try {
        dispath(loadingStart());
        const response = await categoryAPI.getAllCategoryNews();
        if (response.status === 200) {
          dispath(InitCategoryNews(response.data.data));
          dispath(loadingEnd());
        } else {
          message.error(response.message);
          dispath(loadingEnd());
        }
      } catch (error) {
        message.error("Không thể kết nối đến server", 2);
        dispath(loadingEnd());
      }
    };
    getAllCateryNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentUser = useSelector((state) => {
    return state.auth.login.currentUser;
  });

  const loading = useSelector((state) => {
    return state.load.load.loadding;
  });

  return (
    <BrowserRouter>
      <div className="App">
        {loading && <Loading></Loading>}
        <Routes>
          {publicRoute.map((element, index) => {
            const Layout = element.layout || DefaultLayout;
            return (
              <Route
                key={index}
                path={element.path}
                element={
                  <Layout>
                    <element.component></element.component>
                  </Layout>
                }
              ></Route>
            );
          })}
          {UserRouter.map((element, index) => {
            const Layout = element.layout || DefaultLayout;
            return (
              <Route
                key={index}
                path={element.path}
                element={
                  currentUser ? (
                    <Layout>
                      <element.component></element.component>
                    </Layout>
                  ) : (
                    <Navigate to="/"></Navigate>
                  )
                }
              ></Route>
            );
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
