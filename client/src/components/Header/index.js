import React from 'react';
import styled from "@emotion/styled";
import units from "design-units";
import { Link } from "react-router-dom";

const HeaderWrapper = styled.div`
  display:flex
`;

const HomeButton = styled(Link)``;
const LogoutButton = styled(Link)``;

export const Header = ({logout, isLoggedIn}) => {
  console.log(isLoggedIn);
  return (
    <HeaderWrapper>
      Header
      <HomeButton to="/">Home</HomeButton>
      {isLoggedIn? <LogoutButton onClick={logout}>Sign Out</LogoutButton> : null}
    </HeaderWrapper>
  )
}