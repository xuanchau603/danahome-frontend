import style from "./SearchBox.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import MyButton from "../MyButton";
import Menu from "../Menu";
import { Radio, Slider, Space, Tooltip } from "antd";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoneyIcon from "@mui/icons-material/Money";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import addressAPI from "../../API/addressAPI";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useSelector } from "react-redux";

const cx = classNames.bind(style);

function SearchBox() {
  const [showMenuType, setShowMenuType] = useState(false);
  const [showMenuProvince, setShowMenuProvince] = useState(false);
  const [showMenuDistrict, setShowMenuDistrict] = useState(false);
  const [showMenuWards, setShowMenuWards] = useState(false);
  const [showMenuPrice, setShowMenuPrice] = useState(false);
  const [showMenuSize, setShowMenuSize] = useState(false);
  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWards, setListWards] = useState([]);
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");

  const navigate = useNavigate();

  const categoryRooms = useSelector((state) => {
    return state.category.categoryRooms;
  });

  const getProvince = async () => {
    const response = await addressAPI.getProvince();
    setListProvince(response.data);
  };
  useEffect(() => {
    getProvince();
  }, []);

  const HandleDistricts = async (code) => {
    const response = await addressAPI.getDistrictByCode(code);
    setListDistrict(response.data.districts);
  };

  const HandleWards = async (code) => {
    const response = await addressAPI.getWardsByCode(code);
    setListWards(response.data.wards);
  };

  const onChangeMenuType = (e) => {
    setType(e.target.value);
  };

  const onchangeProvince = async (e) => {
    const data = e.target.value.split(",");
    setAddress(e.target.value);
    HandleDistricts(data[0]);
    setShowMenuProvince(false);
    setShowMenuDistrict(true);
  };

  const onchangeMenuDistrict = (e) => {
    const data = e.target.value.split(",");
    setAddress((prev) => {
      return prev + "-" + e.target.value;
    });
    HandleWards(data[0]);
    setShowMenuDistrict(false);
    setShowMenuWards(true);
  };

  const onchangeMenuWards = (e) => {
    setAddress((prev) => {
      return prev + "-" + e.target.value;
    });
    setShowMenuWards(false);
  };

  const onCancelMenuType = () => {
    setShowMenuType(false);
  };

  const onCancelMenuAddress = () => {
    setShowMenuProvince(false);
  };

  const onCancelMenuDistrict = () => {
    setShowMenuDistrict(false);
  };

  const onCancelMenuWards = () => {
    setShowMenuWards(false);
  };

  const onChangePrice = (value) => {
    setPrice(value[0] + " - " + value[1]);
  };

  const onChangeSize = (value) => {
    setSize(value[0] + " - " + value[1]);
  };

  const onCancelMenuPrice = () => {
    setShowMenuPrice(false);
  };

  const onCancelMenuSize = () => {
    setShowMenuSize(false);
  };

  const handleSearch = () => {
    const filter = {
      typeName: type.split(",")[1] || undefined,
      type: type.split(",")[0] || undefined,
      province: address.split("-")[0] || undefined,
      district: address.split("-")[1] || undefined,
      ward: address.split("-")[2] || undefined,
      priceFrom: price.split(" -")[0] || undefined,
      priceTo: price.split("- ")[1] || undefined,
      acreageFrom: size.split(" -")[0] || undefined,
      acreageTo: size.split("- ")[1] || undefined,
    };
    navigate(`/search-result?${queryString.stringify(filter)}`);
  };

  return (
    <div className={cx("search-box")}>
      <h2 className={cx("title")}>Tìm kiếm nơi ở phù hợp với bản thân</h2>
      <div className={cx("search-action")}>
        <div className={cx("search-input")}>
          <div
            onClick={() => setShowMenuType(true)}
            className={cx("form-group")}
          >
            <label htmlFor="type">
              <MapsHomeWorkIcon fontSize="large"></MapsHomeWorkIcon>
            </label>
            <Tooltip title={type ? type.split(",")[1] : "Loại"}>
              <div id="type" className={cx("data")}>
                <p>{type ? type.split(",")[1] : "Loại"}</p>
              </div>
            </Tooltip>
            {!type && (
              <span className={cx("more")}>
                <ChevronRightIcon fontSize="large"></ChevronRightIcon>
              </span>
            )}
          </div>
          <div
            onClick={() => {
              setShowMenuProvince(true);
            }}
            className={cx("form-group")}
          >
            <label htmlFor="type">
              <LocationOnIcon fontSize="large"></LocationOnIcon>
            </label>
            <Tooltip
              title={
                (address.split("-")[2] &&
                  `${address.split("-")[0].split(",")[1]},${
                    address.split("-")[1].split(",")[1]
                  },${address.split("-")[2].split(",")[1]}`) ||
                (address.split("-")[1] &&
                  `${address.split("-")[0].split(",")[1]},${
                    address.split("-")[1].split(",")[1]
                  }`) ||
                (address.split("-")[0] &&
                  `${address.split("-")[0].split(",")[1]}`) ||
                "Địa chỉ"
              }
            >
              <div id="type" className={cx("data")}>
                <p>
                  {(address.split("-")[2] &&
                    `${address.split("-")[0].split(",")[1]},${
                      address.split("-")[1].split(",")[1]
                    },${address.split("-")[2].split(",")[1]}`) ||
                    (address.split("-")[1] &&
                      `${address.split("-")[0].split(",")[1]},${
                        address.split("-")[1].split(",")[1]
                      }`) ||
                    (address.split("-")[0] &&
                      `${address.split("-")[0].split(",")[1]}`) ||
                    "Địa chỉ"}
                </p>
              </div>
            </Tooltip>

            {!address && (
              <span className={cx("more")}>
                <ChevronRightIcon fontSize="large"></ChevronRightIcon>
              </span>
            )}
          </div>
          <div
            onClick={() => setShowMenuPrice(true)}
            className={cx("form-group")}
          >
            <label htmlFor="type">
              <MoneyIcon fontSize="large"></MoneyIcon>{" "}
            </label>
            <Tooltip
              title={
                price
                  ? price.split(" -")[0] === price.split("- ")[1]
                    ? "Từ " + price.split("-")[1] + " triệu đồng"
                    : "Từ " + price + " triệu đồng"
                  : "Giá cả"
              }
            >
              <div id="type" className={cx("data")}>
                <p>
                  {price
                    ? price.split(" -")[0] === price.split("- ")[1]
                      ? "Từ " + price.split("-")[1] + " triệu đồng"
                      : "Từ " + price + " triệu đồng"
                    : "Giá cả"}
                </p>
              </div>
            </Tooltip>
            {!price && (
              <span className={cx("more")}>
                <ChevronRightIcon fontSize="large"></ChevronRightIcon>
              </span>
            )}
          </div>
          <div
            onClick={() => setShowMenuSize(true)}
            className={cx("form-group")}
          >
            <label htmlFor="type">
              <AspectRatioIcon fontSize="large"></AspectRatioIcon>
            </label>
            <Tooltip
              title={
                size
                  ? size.split(" -")[0] === size.split("- ")[1]
                    ? "Từ " + size.split("-")[1] + " m2"
                    : "Từ " + size + " m2"
                  : "Diện tích"
              }
            >
              <div id="type" className={cx("data")}>
                <p>
                  {size
                    ? size.split(" -")[0] === size.split("- ")[1]
                      ? "Từ " + size.split("-")[1] + " m2"
                      : "Từ " + size + " m2"
                    : "Diện tích"}
                </p>
              </div>
            </Tooltip>
            {!size && (
              <span className={cx("more")}>
                <ChevronRightIcon fontSize="large"></ChevronRightIcon>
              </span>
            )}
          </div>
        </div>

        <MyButton onClick={handleSearch} classes={cx("btn-search")} primary>
          Tìm kiếm
        </MyButton>
        {showMenuType && (
          <Menu
            classes={cx("menu-type")}
            open={showMenuType}
            onCancel={onCancelMenuType}
            title={"Chọn loại bất động sản"}
          >
            <Radio.Group onChange={onChangeMenuType}>
              <Space direction="vertical">
                {categoryRooms.map((item) => {
                  return (
                    <Radio key={item.ID} value={item.ID + "," + item.name}>
                      {item.name}
                    </Radio>
                  );
                })}
              </Space>
            </Radio.Group>
            <MyButton
              onClick={() => setShowMenuType(false)}
              classes={cx("btn")}
              primary
            >
              Áp dụng
            </MyButton>
          </Menu>
        )}
        {showMenuProvince && (
          <Menu
            classes={cx("menu-type")}
            open={showMenuProvince}
            onCancel={onCancelMenuAddress}
            title={"Chọn tỉnh/thành phố"}
          >
            <div className={cx("list-option")}>
              <Radio.Group onChange={onchangeProvince}>
                <Space direction="vertical">
                  {listProvince.map((item, index) => {
                    return (
                      <Radio key={index} value={item.code + "," + item.name}>
                        {item.name}
                      </Radio>
                    );
                  })}
                </Space>
              </Radio.Group>
            </div>
            <MyButton
              onClick={() => setShowMenuProvince(false)}
              classes={cx("btn")}
              primary
            >
              Áp dụng
            </MyButton>
          </Menu>
        )}
        {showMenuDistrict && (
          <Menu
            classes={cx("menu-type")}
            open={showMenuDistrict}
            onCancel={onCancelMenuDistrict}
            title={"Chọn quận/huyện"}
          >
            <div className={cx("list-option")}>
              <Radio.Group onChange={onchangeMenuDistrict}>
                <Space direction="vertical">
                  {listDistrict.map((item, index) => {
                    return (
                      <Radio key={index} value={item.code + "," + item.name}>
                        {item.name}
                      </Radio>
                    );
                  })}
                </Space>
              </Radio.Group>
            </div>
            <MyButton
              onClick={() => setShowMenuDistrict(false)}
              classes={cx("btn")}
              primary
            >
              Áp dụng
            </MyButton>
          </Menu>
        )}
        {showMenuWards && (
          <Menu
            classes={cx("menu-type")}
            open={showMenuWards}
            onCancel={onCancelMenuWards}
            title={"Chọn phường/xã"}
          >
            <div className={cx("list-option")}>
              <Radio.Group onChange={onchangeMenuWards}>
                <Space direction="vertical">
                  {listWards.map((item, index) => {
                    return (
                      <Radio
                        key={index}
                        name="fds"
                        value={item.code + "," + item.name}
                      >
                        {item.name}
                      </Radio>
                    );
                  })}
                </Space>
              </Radio.Group>
            </div>
            <MyButton
              onClick={() => setShowMenuWards(false)}
              classes={cx("btn")}
              primary
            >
              Áp dụng
            </MyButton>
          </Menu>
        )}

        {showMenuPrice && (
          <Menu
            classes={cx("menu-type")}
            open={showMenuPrice}
            onCancel={onCancelMenuPrice}
            title={"Chọn mức giá"}
          >
            <div className={cx("range-price")}>
              <h1>{`Từ  ${
                price.split(" -")[0] === price.split("- ")[1]
                  ? price.split("-")[1]
                  : price || 0
              } triệu đồng`}</h1>
              <Slider
                range
                step={0.5}
                max={15}
                // defaultValue={[0, 15]}
                value={[price.split("-")[0], price.split("-")[1]]}
                onChange={onChangePrice}
              />
              <div className={cx("quick-select")}>
                <h1>Chọn nhanh</h1>
                <div className={cx("quick-option")}>
                  <div
                    className={cx("quick-item")}
                    onClick={() => setPrice("0 - 1")}
                  >
                    Dưới 1 triệu đồng
                  </div>
                  <div
                    className={cx("quick-item")}
                    onClick={() => setPrice("1 - 2")}
                  >
                    Từ 1 đến 2 triệu đồng
                  </div>
                  <div
                    className={cx("quick-item")}
                    onClick={() => setPrice("2 - 3")}
                  >
                    Từ 2 đến 3 triệu đồng
                  </div>
                  <div
                    className={cx("quick-item")}
                    onClick={() => setPrice("3 - 5")}
                  >
                    Từ 3 đến 5 triệu đồng
                  </div>
                  <div
                    className={cx("quick-item")}
                    onClick={() => setPrice("5 - 7")}
                  >
                    Từ 5 đến 7 triệu đồng
                  </div>
                  <div
                    className={cx("quick-item")}
                    onClick={() => setPrice("7 - 10")}
                  >
                    Từ 7 đến 10 triệu đồng
                  </div>
                  <div
                    className={cx("quick-item")}
                    onClick={() => setPrice("15 - 15")}
                  >
                    Từ 15 triệu đồng
                  </div>
                  {/* <div className={cx("quick-item")}>
                    Từ 10 đến 15 triệu đồng
                  </div> */}
                  {/* <div className={cx("quick-item")}>Trên 15 triệu đồng</div> */}
                </div>
              </div>
              <MyButton
                onClick={() => setShowMenuPrice(false)}
                classes={cx("btn")}
                primary
              >
                Áp dụng
              </MyButton>
            </div>
          </Menu>
        )}
        {showMenuSize && (
          <Menu
            classes={cx("menu-type")}
            open={showMenuSize}
            onCancel={onCancelMenuSize}
            title={"Chọn diện tích"}
          >
            <div className={cx("range-price")}>
              <h1>{`Từ  ${
                size.split(" -")[0] === size.split("- ")[1]
                  ? size.split("-")[1]
                  : size || 0
              } m2`}</h1>
              <Slider
                range
                step={5}
                max={100}
                value={[size.split("-")[0], size.split("-")[1]]}
                // defaultValue={[0, 15]}
                onChange={onChangeSize}
              />
              <div className={cx("quick-select")}>
                <h1>Chọn nhanh</h1>
                <div className={cx("quick-option")}>
                  <div
                    className={cx("quick-item")}
                    onClick={() => setSize("0 - 20")}
                  >
                    Dưới 20 m2
                  </div>
                  <div
                    className={cx("quick-item")}
                    onClick={() => setSize("20 - 30")}
                  >
                    Từ 20 - 30 m2
                  </div>
                  <div
                    className={cx("quick-item")}
                    onClick={() => setSize("30 - 50")}
                  >
                    Từ 30 - 50 m2
                  </div>
                  <div
                    className={cx("quick-item")}
                    onClick={() => setSize("50 - 70")}
                  >
                    Từ 50 - 70 m2
                  </div>
                  <div
                    className={cx("quick-item")}
                    onClick={() => setSize("70 - 90")}
                  >
                    Từ 70 - 90 m2
                  </div>
                  <div
                    className={cx("quick-item")}
                    onClick={() => setSize("100 - 100")}
                  >
                    Từ 100 m2
                  </div>
                  {/* <div className={cx("quick-item")}>
                    Từ 10 đến 15 triệu đồng
                  </div> */}
                  {/* <div className={cx("quick-item")}>Trên 15 triệu đồng</div> */}
                </div>
              </div>
              <MyButton
                onClick={() => setShowMenuSize(false)}
                classes={cx("btn")}
                primary
              >
                Áp dụng
              </MyButton>
            </div>
          </Menu>
        )}
      </div>
    </div>
  );
}

export default SearchBox;
