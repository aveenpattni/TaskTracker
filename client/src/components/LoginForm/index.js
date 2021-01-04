import React from 'react';
import styled from "@emotion/styled";
import units from "design-units";
import { Link } from "react-router-dom"

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;
const FormLabel = styled.label``;
const FormInput = styled.input``;
const FormButton = styled.button``;

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  render() {
    return (
      <FormWrapper ref={this.formRef} onSubmit={this.props.sendLogin}>
        Login Form
        <FormLabel>Username:</FormLabel>
        <FormInput name="loginUsername" placeholder="Username" required/>
        <FormLabel>Password:</FormLabel>
        <FormInput type="password" name="loginPassword" placeholder="Password" required/>
        {this.props.loginFail ? <p>Login was unsuccessful</p> : null}
        <FormButton type="submit" >Submit</FormButton>
        <Link to="/signup" >Signup</Link>
      </FormWrapper>
    )
  }
}