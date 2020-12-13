import React from "react";
import Axios from "axios";
import { BaseURL } from "../defaults.json";
import {
  Grid,
  Typography,
  Link,
  Button,
  TextField,
  Avatar,
  Container,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";

export default class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorStatus: ""
    };
  }

  onSubmitButtonPressed = () => {
    const username = document.getElementById("username").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const repeatpassword = document.getElementById("repeatpassword").value
    if (password == repeatpassword) {
      const data = {
      username: username,
      email: email,
      password: password,
    };
    console.log(data);
    Axios.post(BaseURL + "/register", data).then(async (res) => {
      if (res.data.error) {
        this.setState({
          errorStatus: res.data.error,
        });
      } else {
        this.props.history.push("/login");
      }
    });
    } else {
      this.setState({
        errorStatus: "Password must be the same!"
      })
    }
  };

  /*onUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onRepeatPasswordChange = (event) => {
    this.setState({ repeatpassword: event.target.value });
  };*/

  render() {
    return (
      <div>
        <Container maxWidth="sm">
          <Grid container direction="row" spacing="2" alignItems="center">
            <Grid item>
              <Avatar>
                <LockIcon></LockIcon>
              </Avatar>
            </Grid>
            <Grid item>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
            </Grid>
          </Grid>
          <form noValidate className="App">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="username"
              label="Username"
              type="username"
              id="username"
              placeholder="Type your username, 6-30 characters"
              
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="current-email"
              autoFocus
              placeholder="Type your email"
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
              placeholder="Type your password, 6-30 characters"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="repeat password"
              label="Repeat Password"
              type="password"
              id="repeatpassword"
              placeholder="Repeat your password"
            />
            <Button
              onClick={this.onSubmitButtonPressed}
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
            <Grid container justify='center' >
              <Typography color='error' >{this.state.errorStatus}</Typography>
            </Grid>
          </form>
        </Container>
      </div>
    );
  }
}
