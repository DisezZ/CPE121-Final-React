import React from "react";
import Axios from "axios";
import Cookie from "js-cookie";
import { BaseURL } from "../defaults.json";
import {
    Grid, Avatar, Container, Typography, TextField, Button, Link
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorStatus: "",
    };
  }

  onSubmitButtonPressed = () => {
    const userInput = document.getElementById("userInput").value
    const password = document.getElementById("password").value
    const data = {
        userInput: userInput,
        password: password
    }
    Axios.post(BaseURL + "/login", data).then(async (res) => {
      if (res.data.error) {
        this.setState({
          errorStatus: res.data.error,
        });
      } else {
        await Cookie.set("token", res.data.token);
        await window.location.reload()
        setTimeout(() => {
          this.props.history.push("/");
        },1000)
      }
    });
  };

  /*onUserInputChange = (event) => {
    this.setState({ userInput: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
    console.log(document.getElementById("userInput").value)
  };*/

  render() {
    return (
      <div >
        <Container maxWidth="sm">
          <Grid container direction="row" spacing="2" alignItems="center">
            <Grid item>
              <Avatar>
                <LockIcon></LockIcon>
              </Avatar>
            </Grid>
            <Grid item>
              <Typography component="h1" variant="h5">
                Log In
              </Typography>
            </Grid>
          </Grid>
          <form noValidate className="App">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userInput"
              label="Email Address"
              name="email"
              type="string"
              placeholder="Type your username or email"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              placeholder="Type your password"
            />
            {this.redirectRender}
            <Button
              className="App"
              onClick={this.onSubmitButtonPressed}
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Typography>{this.state.errorStatus}</Typography>
          </form>
        </Container>
      </div>
    );
  }
}
