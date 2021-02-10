import React, { useState } from 'react';
import styled from "@emotion/styled";
import units from "design-units";
import { status } from "./constants";
import { ModalWrapper } from "../Modal";
import { DeleteConfirm } from "../DeleteConfirm";
import { UpdateForm } from "../UpdateForm";
import { Button as CustomButton } from "../Button";

const TaskWrapper = styled.div`
  display:flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 4px;
  margin: 8px;
  width: 100%;
  background: ${props => (
    props.status === 2 ? "#a8ffa8" : (props.status === 1 ? "#a8a8ff" : "#ffa8a8")
  )}
  ${units({
  })}
`;
const TaskTitle = styled.h3`
  margin: 0;
  padding: 0;
  align-self: center;
`;
const TaskDescription = styled.p`
  margin: 0;
  padding: 0;
  border: 1px solid black;
  border-radius: 4px;
  ${units({
    backgroundColor: "white",
    padding: ["1"]
  })}
`;
const TaskPriority = styled.h4`
  margin: 0;
  padding: 0;
`;
const TaskDueDate = styled.h4`
  margin: 0;
  padding: 0;
`;
const InfoZone = styled.div`
  display: flex;
  justify-content: space-between;
  ${units({
    padding: ["1"]
  })}
`;
const ButtonZone = styled.div`
  display: flex;
  justify-content: space-between;
  ${units({
    padding: ["1"]
  })}
`;

const DeleteButton = styled(CustomButton)``;
const UpdateButton = styled(CustomButton)``;

export const Task = ({onDelete, onUpdate, item, col}) => {
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
  const date = new Date(item.due)
  return (
    <TaskWrapper status={col}>
      <TaskTitle>{item.title}</TaskTitle>
      <TaskDescription>{item.description}</TaskDescription>
      <InfoZone>
        <TaskPriority>Priority: {item.priority}</TaskPriority>
        <TaskDueDate>Due: {date.toDateString()}</TaskDueDate>
      </InfoZone>
      <ButtonZone>
      <DeleteButton onClick={openDeleteModal}>Delete</DeleteButton>
      <UpdateButton onClick={openUpdateModal}>Update</UpdateButton>
      </ButtonZone>

      {isDeleteModalOpen ?
        <ModalWrapper close={closeModal}>
          <DeleteConfirm onDelete={onDelete} close={closeModal}/>
        </ModalWrapper> : null}
      {isUpdateModalOpen ?
        <ModalWrapper close={closeModal}>
          <UpdateForm onUpdate={onUpdate} close={closeModal} item={item}/>
        </ModalWrapper> : null}
    </TaskWrapper>
  )
}