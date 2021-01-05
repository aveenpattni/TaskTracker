import React from 'react';
import styled from "@emotion/styled";
import units from "design-units";
import { Switch, Route, Redirect, Link, withRouter } from 'react-router-dom';
import { LoginPage } from "./Login";
import { ToDoPage } from "./Todo";
import { LostPage } from "./Lost";
import { SignupPage } from "./Signup";
import { Header } from "../components/Header";
import axios from "axios";

const u = units;

const AppWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${u({
  })};
`

class App extends React.Component {
  state = {
    user: {},
    isLoggedIn: false,
    loginFail: false
  }

  authenticate = () => {
    const token = localStorage.getItem("jwt") || '';
    if (token) {
      const config = {
        headers: { authorization: token }
      }
      axios.get(`/auth`, config)
        .then(res => {
          this.setState({
            isLoggedIn: true,
            user: res.data
          });
        })
        .catch(err => {
          this.setState({
            isLoggedIn: false,
            loginFail: false
          });
          console.log(err);
          this.props.history.push('/login');
        });
    } else {
      this.props.history.push('/login');
    }
  };

  submitLogin = e => {
    e.preventDefault();
    const credentials = {
      username: e.target.loginUsername.value,
      password: e.target.loginPassword.value
    };
    const loginConfig = {
      method: "post",
      data: credentials,
      url: "/login",
      headers: {
        "Content-Type": "application/json"
      }
    };
    axios(loginConfig)
    .then(res => {
      localStorage.setItem("jwt", res.data.token);
        this.setState({
          user: res.data.user,
          isLoggedIn: true,
          loginFail: false
        });
        this.props.history.push('/todo')
    })
    .catch(err => {
      this.setState({
        loginFail: true
      });
      localStorage.removeItem("jwt");
    })
  };

  logout = e => {
    e.preventDefault();
    localStorage.removeItem("jwt");
    this.setState({
      user: {},
      isLoggedIn: false
    });
    this.props.history.push('/login');
  };

  render() {
    return (
      <AppWrapper>
        <Header user={this.state.user} isLoggedIn={this.state.isLoggedIn} logout={this.logout}/>
        <Switch>
          <Route path="/" exact render={() => { return this.state.isLoggedIn ? <Redirect to='/todo' /> : <Redirect to='/login' /> }} />
          <Route path="/login" >
            <LoginPage loginFail sendLogin={this.submitLogin}/>
          </Route>
          <Route path="/signup" >
            <SignupPage />
          </Route>
          <Route path="/todo" >
            {this.state.isLoggedIn ? <ToDoPage authenticate={this.authenticate} user={this.state.user}/> : <Redirect to='/' /> }
          </Route>
          <Route path="/" >
            <LostPage />
          </Route>
        </Switch>
        
      </AppWrapper>
    );
  }
}

export default withRouter(App);
