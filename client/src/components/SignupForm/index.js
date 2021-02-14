import React from 'react'
import styled from "@emotion/styled";
import units from "design-units";

const SignupFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;
const FormInput = styled.input``;
const FormLabel = styled.label``;
const FormButton = styled.button``;

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

        <FormButton type="submit"> Submit</FormButton>
      </SignupFormWrapper>
    )
  }
}
