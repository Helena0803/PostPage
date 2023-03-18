import React, { useState } from "react";
import { Button, Modal } from "antd";
import { ReactComponent as Cart } from "../Post/cart.svg";

export const DeletePost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* <Button type="primary"> */}
      {
        <Cart
          onClick={showModal}
          style={{ color: "black" }}
          // style={{ backgroundColor: "white" }}
          // style={{ fill: "none" }}
          // style={{ stroke: "width" }}
        />
      }
      {/* </Button> */}
      <Modal
        title="Удаление поста"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Вы уверены, что хотите удалить пост?</p>
      </Modal>
    </>
  );
};
