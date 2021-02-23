import React from 'react'
import styled from "@emotion/styled";
import units from "design-units";
import { Link } from "react-router-dom";

const SignupFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;
const FormInput = styled.input`
  ${units({
    margin: 1,
    padding: 1
  })}
`;
const FormLabel = styled.label`
  text-align: center;
`;
const FormButton = styled.button`
  ${units({
    marginTop: 1,
    marginBottom: 1,
    padding: 1
  })}
`;
const FormLink = styled(Link)`
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  ${units({
    marginBottom: ["1"],
    backgroundColor: "secondary",
    color: "black",
    padding: 1
  })}
`;

export class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }
  render() {
    return (
      <SignupFormWrapper ref={this.formRef} onSubmit={this.props.sendSignup}>
        <FormLabel>First Name:</FormLabel>
        <FormInput name="signupFirstName" placeholder="First Name" required/>

        <FormLabel>Last Name:</FormLabel>
        <FormInput name="signupLastName" placeholder="Last Name" required/>

        <FormLabel>Email:</FormLabel>
        <FormInput name="signupEmail" type="email" placeholder="Email" required/>

        <FormLabel>Username:</FormLabel>
        <FormInput name="signupUsername" placeholder="Username" required/>

        <FormLabel>Password:</FormLabel>
        <FormInput name="signupPassword" type="password" placeholder="Password" required/>

        <FormButton type="submit">Sign Up</FormButton>
        <h4>Returning User?</h4>
        <FormLink to="/login" >Login</FormLink>
      </SignupFormWrapper>
    )
  }
}
