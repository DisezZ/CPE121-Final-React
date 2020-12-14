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
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export default class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorStatus: "",
      alert: {
        status: false,
        title: "Error",
        severity: "error",
      },
      backdrop: false,
    };
  }

  onSubmitButtonPressed = async () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const repeatpassword = document.getElementById("repeatpassword").value;
    if (password == repeatpassword) {
      const data = {
        username: username,
        email: email,
        password: password,
      };
      console.log(data);
      await this.setState({
        alert: {
          status: true,
          severity: "info",
          title: "Sending...",
        },
      });
      Axios.post(BaseURL + "/register", data).then(async (res) => {
        if (res.data.error) {
          this.setState({
            alert: {
              status: true,
              severity: "error",
              title: res.data.error,
            },
          });
        } else {
          this.setState({
            alert: {
              status: true,
              severity: "success",
              title: res.data.value,
            },
          });
          this.props.history.push("/login");
        }
      });
    } else {
      await this.setState({
        alert: {
          status: true,
          severity: "error",
          title: "Password must be the same",
        }
      });
    }
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      alert: {
        status: false,
        severity: this.state.alert.severity,
        title: this.state.alert.title,
      },
    });
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
            <Snackbar
              open={this.state.alert.status}
              autoHideDuration={6000}
              onClose={this.handleClose}
            >
              <Alert
                elevation={6}
                variant="filled"
                onClose={this.handleClose}
                severity={this.state.alert.severity}
              >
                {this.state.alert.title}
              </Alert>
            </Snackbar>
          </form>
        </Container>
      </div>
    );
  }
}
