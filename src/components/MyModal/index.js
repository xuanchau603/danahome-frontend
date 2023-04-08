import { Modal } from "antd";

function MyModal(props) {
  return (
    <>
      <Modal
        className={props.classes}
        cancelText="Hủy"
        open={props.status}
        onCancel={props.onCancel}
        onOk={props.onOk}
        footer={null}
      >
        {props.children}
      </Modal>
    </>
  );
}

export default MyModal;
