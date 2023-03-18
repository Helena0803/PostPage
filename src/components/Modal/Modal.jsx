import React, { useState } from "react";
import { Modal } from "antd";
import { ReactComponent as Cart } from "../Post/cart.svg";

export const DeletePost = ({ deleteClickPost }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    deleteClickPost();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {<Cart onClick={showModal} style={{ color: "black" }} />}
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
