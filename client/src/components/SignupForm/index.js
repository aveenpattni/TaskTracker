import React from 'react'
import styled from "@emotion/styled";
import units from "design-units";
import { Link } from "react-router-dom";
import axios from "axios";

const SignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

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

const UploadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const FormUpload = styled.input`
  display: none;
`;
const UploadLabel = styled.label`
  margin-top: 2rem;
  border: 1px solid black;
  border-radius: 8px;
  text-align: center;
`
const FormUploadButton = styled.button``;

export class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPicture: null,
      imageUrl: null,
      uploadStatus: null
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
      lastName: e.target.signupLastName.value,
      photoUrl: this.state.imageUrl
    }
    this.props.sendSignup(userData);
  }

  setImage = (e) => {
    this.setState({
      userPicture: e.target.files[0]
    });
  }
  uploadImage = () => {
    const fd = new FormData();
    fd.append("image", this.state.userPicture);
    axios.post("/api/photo-upload", fd, {
      onUploadProgress: progressEvent => {
        console.log(`Upload Progress: ${(progressEvent.loaded/progressEvent.total)*100}%`);
        this.setState({
          ...this.state,
          uploadStatus: (progressEvent.loaded/progressEvent.total)*100
        })
      }
    })
    .then(res => this.setState({
      ...this.state,
      imageUrl: res.data.imageUrl,
      uploadStatus: "success"
    }))
    .catch(err => this.setState({
      ...this.state,
      imageUrl: null,
      uploadStatus: "fail"
    }));
  }

  render() {
    return (
      <SignupWrapper>
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
          
          <FormButton type="submit">Sign Up</FormButton>

        </SignupFormWrapper>

        <UploadWrapper>
          <UploadLabel for="file">Upload Profile Picture</UploadLabel>
          <FormUpload id="file" name="profilePhoto" type="file" onChange={this.setImage} />
          {this.state.userPicture ? <FormUploadButton onClick={this.uploadImage}>Upload</FormUploadButton> : null}
        </UploadWrapper>

        <h4>Returning User?</h4>
        <FormLink to="/login" >Login</FormLink>
      </SignupWrapper>
    )
  }
}
