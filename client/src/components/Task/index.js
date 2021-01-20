import React from 'react';
import styled from "@emotion/styled";
import units from "design-units";

const TaskWrapper = styled.div`
  display:flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 4px;
  margin: 8px;
  ${units({
    backgroundColor: "secondary"
  })}
`;
const DeleteButton = styled.button``;
const UpdateButton = styled.button``;

export const Task = ({onDelete, onUpdate, item}) => {
  return (
    <TaskWrapper>
      <h5>{item.title}</h5>
      <DeleteButton onClick={onDelete}>Delete</DeleteButton>
      <UpdateButton onClick={onUpdate}>Update</UpdateButton>
    </TaskWrapper>
  )
}