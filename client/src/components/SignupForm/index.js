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

const FormUpload = styled.input``;
export class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPicture: null
    }
    this.formRef = React.createRef();
  }

  signup = (e) => {
    e.preventDefault();
    const userData = {
      username: e.target.signupUsername.value,
      email: e.target.signupEmail.value,
      password: e.target.signupPassword.value,
      firstName: e.target.signupFirstName.value,
      lastName: e.target.signupLastName.value
    }
    this.props.sendSignup(userData);
  }

  uploadImage = (e) => {
    this.setState({
      userPicture: e.target.files[0]
    })
    console.log("🔥", e.target.files[0])
  }

  render() {
    console.log(this.state);
    return (
      <SignupFormWrapper ref={this.formRef} onSubmit={this.signup}>
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

        <FormUpload name="profilePhoto" type="file" onChange={this.uploadImage} />

        <FormButton type="submit">Sign Up</FormButton>
        <h4>Returning User?</h4>
        <FormLink to="/login" >Login</FormLink>
      </SignupFormWrapper>
    )
  }
}
