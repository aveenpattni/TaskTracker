import React from "react";
import styled from "@emotion/styled";
import units from "design-units";

const DeleteConfirmWrapper = styled.div``;
const DeleteButton = styled.button``;

export const DeleteConfirm = ({onDelete, close}) => {
  const submitDelete = () => {
    onDelete();
    close();
  }
  return (
    <DeleteConfirmWrapper>
      Are you sure you want to delete?
      <DeleteButton onClick={submitDelete}>Delete</DeleteButton>
    </DeleteConfirmWrapper>
  )
}