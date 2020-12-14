import React from "react";
import Axios from "axios";
import Cookie from "js-cookie";
import { BaseURL } from "../defaults.json";
import {
  Grid,
  Avatar,
  Container,
  Typography,
  TextField,
  Button,
  Link,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export default class LoginForm extends React.Component {
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
    const userInput = document.getElementById("userInput").value;
    const password = document.getElementById("password").value;
    const data = {
      userInput: userInput,
      password: password,
    };
    await this.setState({
      alert: {
        status: true,
        severity: "info",
        title: "Sending...",
      },
    });
    Axios.post(BaseURL + "/login", data).then(async (res) => {
      if (res.data.error) {
        this.setState({
          alert: {
            status: true,
            severity: "error",
            title: res.data.error,
          },
        });
      } else {
        await this.setState({
          alert: {
            status: true,
            severity: "success",
            title: res.data.value,
          },
        });
        await Cookie.set("token", res.data.token);
        await window.location.reload();
        this.props.history.push("/");
      }
    });
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

  /*onUserInputChange = (event) => {
    this.setState({ userInput: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
    console.log(document.getElementById("userInput").value)
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
              label="Email Address/ Username"
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
