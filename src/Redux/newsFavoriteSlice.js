import { createSlice } from "@reduxjs/toolkit";
import { message, notification } from "antd";

const newsFavoriteSlice = createSlice({
  name: "news-favorite",
  initialState: {
    listNewsFavorite: JSON.parse(localStorage.getItem("news-favorite")) || [],
  },
  reducers: {
    addToListNewsFavorite: (state, action) => {
      if (state.listNewsFavorite.length >= 10) {
        message.error("Chỉ được phép lưu tối đa 10 tin!", 2);
      } else {
        state.listNewsFavorite.push(action.payload);
        notification.success({
          placement: "bottomLeft",
          duration: 2,
          message: "Đã thêm vào danh sách tin yêu thích",
        });
        localStorage.setItem(
          "news-favorite",
          JSON.stringify(state.listNewsFavorite),
        );
      }
    },
    removeFromListNewsFavorite: (state, action) => {
      state.listNewsFavorite.splice(action.payload, 1);
      notification.error({
        placement: "bottomLeft",
        duration: 2,
        message: "Đã gỡ khỏi danh sách tin yêu thích",
      });
      if (state.listNewsFavorite.length === 0) {
        return localStorage.removeItem("news-favorite");
      }
      localStorage.setItem(
        "news-favorite",
        JSON.stringify(state.listNewsFavorite),
      );
    },
  },
});

export const { addToListNewsFavorite, removeFromListNewsFavorite } =
  newsFavoriteSlice.actions;

export default newsFavoriteSlice.reducer;
