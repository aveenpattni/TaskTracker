import React from 'react';
import styled from "@emotion/styled";
import units from "design-units";
import { status } from "./constants";

const TaskWrapper = styled.div`
  display:flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 4px;
  margin: 8px;
  width: 100%;
  background: ${props => (
    props.status === 2 ? "green" : (props.status === 1 ? "blue" : "red")
  )}
  ${units({
  })}
`;
const DeleteButton = styled.button``;
const UpdateButton = styled.button``;

export const Task = ({onDelete, onUpdate, item}) => {
  return (
    <TaskWrapper status={item.status}>
      <h5>{item.title}</h5>
      <p>{status[item.status]}</p>
      <DeleteButton onClick={onDelete}>Delete</DeleteButton>
      <UpdateButton onClick={onUpdate}>Update</UpdateButton>
    </TaskWrapper>
  )
}