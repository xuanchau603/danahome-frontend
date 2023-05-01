import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DangerousIcon from "@mui/icons-material/Dangerous";
import BlockIcon from "@mui/icons-material/Block";

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
    }
  },
  formatPrice: (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  },
};

export default Format;
