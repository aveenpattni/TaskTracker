import React from 'react';
import styled from "@emotion/styled";
import units from "design-units";
import { Link } from "react-router-dom"

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;
const FormLabel = styled.label`
  ${units({
    paddingTop: ["1"]
  })}
`;
const FormInput = styled.input`
  ${units({
    padding: ["1"]
  })}
`;
const FormButton = styled.button`
  ${units({
    marginTop: ["1"],
    marginBottom: ["1"],
  })}
`;
const FormLink = styled(Link)`
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: white;
  ${units({
    marginTop: ["1"],
    marginBottom: ["1"],
    backgroundColor: "secondary"
  })}
`;

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  render() {
    return (
      <FormWrapper ref={this.formRef} onSubmit={this.props.sendLogin}>
        <FormLabel>Username:</FormLabel>
        <FormInput name="loginUsername" placeholder="Username" required/>
        <FormLabel>Password:</FormLabel>
        <FormInput type="password" name="loginPassword" placeholder="Password" required/>
        {this.props.loginFail ? <p>Login was unsuccessful</p> : null}
        <FormButton type="submit" >Submit</FormButton>
        <h4>New User?</h4>
        <FormLink to="/signup" >Signup</FormLink>
      </FormWrapper>
    )
  }
}