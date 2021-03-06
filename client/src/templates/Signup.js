import React from 'react';
import styled from "@emotion/styled";
import { SignupForm } from "../components/SignupForm";

const SignupWrapper = styled.div`
  width: 100%;
  height: 100%;  
  display: flex;
  flex-direction: column;
  justify-conetent: center;
  align-items: center;
`;

const SignupHeader = styled.h2``;

export const SignupPage = ({ sendSignup }) => {
  return (
    <SignupWrapper>
      <SignupHeader>Sign Up</SignupHeader>
      <SignupForm sendSignup={sendSignup}/>
    </SignupWrapper>
  )
}