import Footer from "../Components/Footer";
import ManageSidebar from "../Components/ManageSidebar";
import ManageHeader from "./../Components/ManageHeader/index";

function ManageLayout(props) {
  return (
    <>
      <ManageHeader></ManageHeader>
      <ManageSidebar></ManageSidebar>
      <div
        style={{ marginTop: "5rem", marginLeft: "28rem", padding: "2rem 4rem" }}
      >
        {props.children}
        <Footer></Footer>
      </div>
    </>
  );
}

export default ManageLayout;
