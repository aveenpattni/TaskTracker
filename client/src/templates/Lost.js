import React from 'react';
import styled from "@emotion/styled";
import units from "design-units";
import { Link } from "react-router-dom"

const LostWrapper = styled.div``;

const HomeButton = styled(Link)``;

export const LostPage = () => {
  return (
    <LostWrapper>
      Whoops, looks like you've ended up on the wrong page.
      Click below to go back to the home page.
      <HomeButton to="/">Home</HomeButton>
    </LostWrapper>
  )
}