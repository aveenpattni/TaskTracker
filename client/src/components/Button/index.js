import React from 'react';
import styled from "@emotion/styled";
import units from "design-units";

const ButtonWrapper = styled.button`
  display:flex;
  border: 1px solid black;
  border-radius: 4px;
  margin: 8px;
  ${units({
    backgroundColor: "button",
    color: "black"
  })}
`;

export const Button = ({onClick, children}) => (
  <ButtonWrapper onClick={onClick}>
    {children ? children : null}
  </ButtonWrapper>
);