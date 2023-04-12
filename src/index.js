import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "./components/GlobalStyle/index.js";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import { FloatButton, Tooltip } from "antd";
import { Provider } from "react-redux";
import store from "./Redux/strore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle>
        <App />
        <Tooltip title="Lên đầu trang">
          <FloatButton.BackTop />
        </Tooltip>
        <Tooltip title="Liên hệ tư vấn">
          <FloatButton
            onClick={() => {
              alert("Chat Bot");
            }}
            shape="square"
            type="primary"
            style={{
              right: 94,
            }}
            icon={<MapsUgcIcon fontSize="large" />}
          />
        </Tooltip>
      </GlobalStyle>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
