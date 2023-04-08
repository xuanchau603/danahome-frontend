import Footer from "../Components/Footer";
import Header from "../Components/Header";

function DefaultLayout(props) {
  return (
    <>
      <Header></Header>
      {props.children}
      <Footer></Footer>
    </>
  );
}

export default DefaultLayout;
