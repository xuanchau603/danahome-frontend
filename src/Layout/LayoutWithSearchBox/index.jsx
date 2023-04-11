import Footer from "../Components/Footer";
import Header from "../Components/Header";
import SearchBox from "./../../components/SearchBox/index";

function LayoutWithSearchBox(props) {
  return (
    <>
      <Header></Header>
      <SearchBox></SearchBox>
      {props.children}
      <Footer></Footer>
    </>
  );
}

export default LayoutWithSearchBox;
