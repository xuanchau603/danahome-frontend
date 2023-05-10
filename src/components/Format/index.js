import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DangerousIcon from "@mui/icons-material/Dangerous";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import CreditCardOffOutlinedIcon from "@mui/icons-material/CreditCardOffOutlined";

const Format = {
  formatStatus: (status) => {
    if (status === 1) {
      return (
        <b
          style={{
            color: "#9e9a08",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            fontSize: 14,
            background: "#fcfbd7",
            padding: "0.6rem",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
          }}
        >
          <WarningAmberIcon style={{ marginRight: 4 }}></WarningAmberIcon> Chờ
          xác nhận
        </b>
      );
    } else if (status === 2) {
      return (
        <b
          style={{
            color: "#1ead07",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            fontSize: 14,
            background: "#e4f7e1",
            padding: "0.6rem",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
          }}
        >
          <CheckCircleOutlineIcon
            style={{ marginRight: 4 }}
          ></CheckCircleOutlineIcon>{" "}
          Đang hiển thị
        </b>
      );
    } else if (status === 3) {
      return (
        <b
          style={{
            color: "#8c230d",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            fontSize: 14,
            background: "#fcdfd9",
            padding: "0.6rem",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
          }}
        >
          <DangerousIcon style={{ marginRight: 4 }}></DangerousIcon> Hết hạn
        </b>
      );
    } else if (status === 4) {
      return (
        <b
          style={{
            color: "#000",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            fontSize: 14,
            background: "#edebeb",
            padding: "0.6rem",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
          }}
        >
          <BlockIcon style={{ marginRight: 4 }}></BlockIcon> Đã ẩn
        </b>
      );
    } else if (status === 5) {
      return (
        <b
          style={{
            color: "#0693a1",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            fontSize: 14,
            background: "#cceaed",
            padding: "0.6rem",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
          }}
        >
          <CreditCardOffOutlinedIcon
            style={{ marginRight: 4 }}
          ></CreditCardOffOutlinedIcon>{" "}
          Chưa thanh toán
        </b>
      );
    }
  },
  formatPaymentType: (status) => {
    if (status === 1) {
      return (
        <b
          style={{
            color: "#3f423e",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            fontSize: 14,
            background: "#f0f7f3",
            padding: "0.6rem 1rem",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
          }}
        >
          Trừ tiền tài khoản
        </b>
      );
    } else if (status === 2) {
      return (
        <b
          style={{
            color: "#fff",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            fontSize: 14,
            background: "#d82f8b",
            padding: "0.6rem 1rem",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <b>MOMO</b>
        </b>
      );
    } else if (status === 3) {
      return (
        <b
          style={{
            color: "#8c230d",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            fontSize: 14,
            background: "#fff",
            padding: "0.6rem 1rem",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <b style={{ color: "#0b6fd4" }}>ZALO</b>
          <b
            style={{
              color: "#fff",
              background: "#12e362",
              padding: "0.2rem",
              borderRadius: 3,
            }}
          >
            PAY
          </b>
        </b>
      );
    } else if (status === 4) {
      return (
        <b
          style={{
            color: "#000",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            fontSize: 14,
            background: "#fff",
            padding: "0.6rem 1rem",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <b style={{ color: "red" }}>VN</b>
          <b style={{ color: "#079ef5" }}>PAY</b>
        </b>
      );
    }
  },
  formatPaymentStatus: (status) => {
    if (status === 1) {
      return (
        <b
          style={{
            color: "#9e9a08",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            fontSize: 14,
            background: "#fcfbd7",
            padding: "0.6rem",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
          }}
        >
          <WarningAmberIcon style={{ marginRight: 4 }}></WarningAmberIcon> Thất
          bại
        </b>
      );
    } else if (status === 2) {
      return (
        <b
          style={{
            color: "#1ead07",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            fontSize: 14,
            background: "#e4f7e1",
            padding: "0.6rem",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
          }}
        >
          <CheckCircleOutlineIcon
            style={{ marginRight: 4 }}
          ></CheckCircleOutlineIcon>{" "}
          Đã thanh toán
        </b>
      );
    }
  },
  formatPrice: (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  },
  formatAccountType: (status) => {
    if (status === 1) {
      return (
        <b
          style={{
            color: "#8a8507",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            fontSize: 14,
            background: "#f7f272",
            padding: "0.6rem",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
          }}
        >
          <CheckCircleIcon style={{ marginRight: 4 }}></CheckCircleIcon> VIP
        </b>
      );
    } else if (status === 2) {
      return (
        <b
          style={{
            color: "#0962ba",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            fontSize: 14,
            background: "#c7e3ff",
            padding: "0.6rem",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
          }}
        >
          <SentimentSatisfiedAltIcon
            style={{ marginRight: 4 }}
          ></SentimentSatisfiedAltIcon>{" "}
          Thường
        </b>
      );
    } else if (status === 3) {
      return (
        <b
          style={{
            color: "#8c230d",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            fontSize: 14,
            background: "#fcdfd9",
            padding: "0.6rem",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
          }}
        >
          <BlockIcon style={{ marginRight: 4 }}></BlockIcon> Bị khóa
        </b>
      );
    }
  },
  formatRole: (roleName) => {
    if (roleName === "ADMIN") {
      return (
        <b
          style={{
            color: "#33b533",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            fontSize: 14,
            background: "#d9fad9",
            padding: "0.6rem",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            width: "fit-content",
          }}
        >
          <VerifiedUserIcon style={{ marginRight: 4 }}></VerifiedUserIcon> ADMIN
        </b>
      );
    } else if (roleName === "USER") {
      return (
        <b
          style={{
            color: "#595c59",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            fontSize: 14,
            background: "#eaf0e9",
            padding: "0.6rem",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            width: "fit-content",
          }}
        >
          <AccountCircleIcon style={{ marginRight: 4 }}></AccountCircleIcon>{" "}
          Người dùng
        </b>
      );
    }
  },
};

export default Format;
