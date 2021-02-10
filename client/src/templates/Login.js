import React from 'react';
import styled from "@emotion/styled";
import units from "design-units";
import { LoginForm } from "../components/LoginForm";

const LoginWrapper = styled.div`
  width: 100%;
  height: 100%;  
  display: flex;
  flex-direction: column;
  justify-conetent: center;
  align-items: center;
`;
const LoginHeader = styled.h2``;

export const LoginPage = (props) => {
  return (
    <LoginWrapper>
      <LoginHeader>Login</LoginHeader>
      <LoginForm {...props}/>
    </LoginWrapper>
  )
}