import React from 'react';
import styled from "@emotion/styled";
import units from "design-units";
import { LoginForm } from "../components/LoginForm";

const LoginWrapper = styled.div``;

export const LoginPage = (props) => {
  return (
    <LoginWrapper>
      Login Page
      <LoginForm {...props}/>
    </LoginWrapper>
  )
}