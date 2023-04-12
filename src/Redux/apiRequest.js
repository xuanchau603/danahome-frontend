import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutSuccess,
} from "./authSlice";
import swal from "sweetalert";

const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:3001/user/login", user);
    if (res.status === 200) {
      dispatch(loginSuccess(res.data));
      navigate("/");
    }
  } catch (error) {
    dispatch(loginFailed());
    swal({
      title: "Thất bại!",
      text: "Sai thông tin đăng nhập!",
      icon: "error",
      buttons: "Ok",
    });
  }
};

const logoutUser = async (dispatch) => {
  dispatch(logoutSuccess());
};

const getAllproduct = async () => {
  try {
    const res = await axios.get("http://localhost:3001/product");
    return res.data;
  } catch (error) {
    alert(error);
  }
};

export { loginUser, logoutUser, getAllproduct };
