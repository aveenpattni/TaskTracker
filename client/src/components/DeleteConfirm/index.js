import React from "react";
import styled from "@emotion/styled";
import units from "design-units";

const DeleteConfirmWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DeleteMessage = styled.h4`
  ${units({
    padding: 0,
    margin: 3
  })}
`;
const DeleteButton = styled.button`
  background: #ffa8a8;
  border: 1px solid black;
  border-radius: 4px;
  :hover {
    background-color: gray;
  }
  ${units({
    padding: 1
  })}
`;

export const DeleteConfirm = ({onDelete, close}) => {
  const submitDelete = () => {
    onDelete();
    close();
  }
  return (
    <DeleteConfirmWrapper>
      <DeleteMessage>Are you sure you want to delete?</DeleteMessage>
      <DeleteButton onClick={submitDelete}>Delete</DeleteButton>
    </DeleteConfirmWrapper>
  )
}