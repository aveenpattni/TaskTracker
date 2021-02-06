import React from "react";
import styled from "@emotion/styled";
import units from "design-units";

const UpdateConfirmWrapper = styled.div``;
const UpdateButton = styled.button``;

export const UpdateConfirm = ({onUpdate, close}) => {
  const submitUpdate = () => {
    onUpdate();
    close();
  }
  return (
    <UpdateConfirmWrapper>
      Are you sure you want to Update?
      <UpdateButton onClick={submitUpdate}>Update</UpdateButton>
    </UpdateConfirmWrapper>
  )
}