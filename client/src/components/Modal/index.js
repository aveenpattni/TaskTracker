import React from 'react';
import styled from "@emotion/styled";
import units from "design-units";

const ModalWrapperStyled = styled.main`
width: 100vw;
height: 100vh;
position: fixed;
top: 0;
left: 0;
background-color: rgba(128,128,128, 0.6);
z-index: 99;
display: flex;
justify-content: center;
align-items: center;
`;

const ContentWrapper = styled.div`
  border: 2px solid black;
  border-radius: 4px;
  background: white;
  ${units({
    minHeight: ["128px"],
    minWidth: ["128px"]
  })}
`;

export const ModalWrapper = ({children}) => {
  return (
    <ModalWrapperStyled>
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </ModalWrapperStyled>
  )
}