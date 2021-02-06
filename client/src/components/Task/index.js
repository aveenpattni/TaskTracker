import React, { useState } from 'react';
import styled from "@emotion/styled";
import units from "design-units";
import { status } from "./constants";
import { ModalWrapper } from "../Modal";
import { DeleteConfirm } from "../DeleteConfirm";

const TaskWrapper = styled.div`
  display:flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 4px;
  margin: 8px;
  width: 100%;
  background: ${props => (
    props.status === 2 ? "green" : (props.status === 1 ? "#7BD0DC" : "red")
  )}
  ${units({
  })}
`;
const DeleteButton = styled.button``;
const UpdateButton = styled.button``;

export const Task = ({onDelete, onUpdate, item}) => {
  const [isDeleteModalOpen, toggleDeleteModal] = useState(false);
  const [isUpdateModalOpen, toggleUpdateModal] = useState(false);
  const closeModal = e => {
    toggleDeleteModal(false);
    toggleUpdateModal(false);
  }
  const openDeleteModal = () => {
    toggleDeleteModal(true);
  }
  const openUpdateModal = () => {
    toggleUpdateModal(true);
  }

  return (
    <TaskWrapper status={item.status}>
      <h5>{item.title}</h5>
      <p>{status[item.status]}</p>
      <DeleteButton onClick={openDeleteModal}>Delete</DeleteButton>
      <UpdateButton onClick={openUpdateModal}>Update</UpdateButton>
      {isDeleteModalOpen ?
        <ModalWrapper close={closeModal} onDelete={onDelete}>
          <DeleteConfirm onDelete={onDelete} close={closeModal}/>
        </ModalWrapper> : null}
      {isUpdateModalOpen ?
        <ModalWrapper close={closeModal} onUpdate={onUpdate}>
          hi
        </ModalWrapper> : null}
    </TaskWrapper>
  )
}