import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: JSON.parse(localStorage.getItem("cart")),
  },
  reducers: {
    initCart: (state, action) => {
      console.log("Ok");
      state.cart = action.payload;
      localStorage.setItem("cart", JSON.stringify(action.payload));
      message.success("Thêm vào giỏ hàng thành công!", 2);
    },
    addToCart: (state, action) => {
      if (state.cart.length >= 10) {
        message.error("Giỏ hàng tối đa 10 sản phẩm!", 2);
      } else {
        state.cart.push(action.payload);
        message.success("Thêm vào giỏ hàng thành công!", 2);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    removeFromCart: (state, action) => {
      state.cart.splice(action.payload, 1);
      message.success("Xóa sản phẩm khỏi giỏ hàng thành công!", 2);
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    addQuantity: (state, action) => {
      if (state.cart[action.payload].quantity >= 10) {
        message.error("Số lượng sản phẩm đạt tối đa!", 2);
      } else {
        ++state.cart[action.payload].quantity;
        message.success("Cập nhật số lượng trong giỏ hàng thành công!", 2);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    minusQuantity: (state, action) => {
      if (state.cart[action.payload].quantity <= 1) {
        message.error("Số lượng sản phẩm tối thiểu là 1!", 2);
      } else {
        --state.cart[action.payload].quantity;
        message.success("Cập nhật số lượng trong giỏ hàng thành công!", 2);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
  },
});

export const {
  addToCart,
  initCart,
  removeFromCart,
  addQuantity,
  minusQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
