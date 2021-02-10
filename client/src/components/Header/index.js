import React from 'react';
import styled from "@emotion/styled";
import units from "design-units";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import { CustomLink } from "../Link";

const HeaderWrapper = styled.div`
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  z-index: 10;
  transition: 0.2s;
  ${units({
    backgroundColor: "primary",
    height: "60px"
  })}
`;
const HeaderShell = styled.div`
  width: 100%;
  max-width: 1080px;
  display:flex;
  justify-content: space-between;
  align-items: center;
`
const HeaderBlock = styled.div`
  height: 60px;
`
const ButtonSection = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.h4`
  margin: 8px;
`;

const LogoSection = styled.div`
  margin: 8px;
`;

const LogoutButton = styled(Button)``;

export const Header = ({logout, isLoggedIn, user}) => {
  const fName = `Hello, ${user.firstName}`
  return (
    <>
    <HeaderWrapper>
      <HeaderShell>
        <LogoSection>Task Tracker✔️</LogoSection>
        <ButtonSection>
          {isLoggedIn && user.firstName ? <Name>{fName}</Name> : null}
          {isLoggedIn && user.firstName ?
            <LogoutButton onClick={logout}>Sign Out</LogoutButton>
            : null}
        </ButtonSection>
      </HeaderShell>
    </HeaderWrapper>
    <HeaderBlock />
  </>
  )
}