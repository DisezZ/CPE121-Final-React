import React from "react";
import Axios from "axios";
import Cookie from "js-cookie";
import AppBar from "../components/AppBar";
import NavBar from "../components/NavBar";
import { mainTag, subTag } from "../tags.json";
import { BaseURL } from "../defaults.json";
import {
  Grid,
  Paper,
  Checkbox,
  FormControlLabel,
  Avatar,
  Typography,
  Box,
  Container,
  TextField,
  Button,
  Link,
  Divider,
  Menu,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { grey, blue, orange } from "@material-ui/core/colors";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import MainBackground from "../image/Web1920–6@2x.png";

export default class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      anonymous: false,
      mainTag: null,
      subTag: [],
      topicBar: "",
      contentBar: "",
      alert: {
        status: false,
        title: "Error",
        severity: "error",
      },
      backdrop: false,
    };
  }

  handleTopicBarChange = (event) => {
    this.setState({
      topicBar: event.target.value,
    });
  };

  handleContentBarChange = (event) => {
    this.setState({
      contentBar: event.target.value,
    });
  };

  handlePostButtonClick = async () => {
    const { anonymous, mainTag, subTag, topicBar, contentBar } = this.state;
    if (mainTag === null || topicBar === "" || contentBar === "") {
      this.setState({
        alert: {
          status: true,
          severity: "error",
          title: "Missing Somethings",
        },
      });
    } else if (this.state.backdrop === false) {
      this.setState(
        {
          backdrop: true,
        },
        async () => {
          const token = Cookie.get("token");
          const data = {
            token: token,
            anonymous: anonymous,
            mainTag: mainTag,
            subTag: subTag,
            topic: topicBar,
            content: contentBar,
          };
          await this.setState({
            alert: {
              status: true,
              severity: "info",
              title: "Sending...",
            },
          });
          Axios.post(BaseURL + "/post", data).then((res) => {
            console.log(res.data);
            if (res.data.value) {
              this.setState(
                {
                  alert: {
                    status: true,
                    severity: "success",
                    title: "Created Post Finished!",
                  },
                },
                () => this.setState({ backdrop: false })
              );
            } else {
              this.setState(
                {
                  alert: {
                    status: true,
                    severity: "error",
                    title: res.data.error,
                  },
                },
                () => this.setState({ backdrop: false })
              );
            }
          });
        }
      );
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

  handleSwap = () => {
    this.setState({ anonymous: !this.state.anonymous });
  };

  render() {
    const colorBlue = blue[600];
    const { userInfo } = this.props;
    const color = grey[300];
    const { loaded } = this.props;
    return (
      <div
        style={{
          backgroundImage: `url(${MainBackground})`,
          minHeight: "100vh",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
      >
        <AppBar position="static" {...this.props}></AppBar>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ paddingTop: "8vh" }}
        >
          <Grid item xs={12} lg={10}>
            <Paper style={{ width: "60vw", padding: "20px" }}>
              <div style={{ backgroundColor: "white" }}>
                <div>
                  <Grid container direction="column" spacing={2}>
                    <Grid
                      item
                      container
                      direction="row"
                      spacing={3}
                      alignItems="center"
                      justify="space-between"
                    >
                      <Grid item xs={3}>
                        <Typography variant="h5" style={{ fontWeight: "bold" }}>
                          Create Post :
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <div>
                          <Grid
                            container
                            justify="flex-end"
                            alignItems="center"
                            spacing={1}
                          >
                            <Grid item>
                              <Typography style={{ fontWeight: "bold" }}>
                                As :
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Avatar
                                src={
                                  this.state.anonymous
                                    ? `${Math.floor(Math.random() * 1000000)
                                        .toString(36)
                                        .substring(7)}`
                                    : userInfo.avatar
                                }
                              ></Avatar>
                            </Grid>
                            <Grid item>
                              <Typography>
                                {this.state.anonymous
                                  ? "Anonymous"
                                  : userInfo.username}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Button onClick={this.handleSwap}>
                                <SwapHorizIcon />
                              </Button>
                            </Grid>
                          </Grid>
                        </div>
                      </Grid>
                    </Grid>
                    <Paper style={{ backgroundColor: color, padding: "15px" }}>
                      <Grid container direction="column">
                        <Grid item>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12}>
                              <TextField
                                style={{ backgroundColor: "white" }}
                                required
                                variant="outlined"
                                margin="none"
                                fullWidth
                                id="Post-Topic"
                                label="Post Topic"
                                name="post-topic"
                                type="string"
                                autoComplete="off"
                                onChange={this.handleTopicBarChange}
                              />
                            </Grid>
                            <Grid item xs={3}>
                              <Autocomplete
                                style={{ backgroundColor: "white" }}
                                onChange={(event, value) => {
                                  this.setState({ mainTag: value });
                                }}
                                openOnFocus
                                limitTags={2}
                                id="Main-Tag-Autocomplete"
                                options={mainTag}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Main Tag"
                                    placeholder="Type to search"
                                  />
                                )}
                              />
                            </Grid>
                            <Grid item xs={9}>
                              <Autocomplete
                                style={{ backgroundColor: "white" }}
                                onChange={(event, value) => {
                                  if (value.length > 4) {
                                    value.pop();
                                  }
                                  this.setState({ subTag: value });
                                }}
                                openOnFocus
                                multiple
                                limitTags={4}
                                id="Sub-Tag-Autocomplete"
                                options={subTag}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Sub Tag"
                                    placeholder="Type to search & max at 4 items"
                                  />
                                )}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <TextField
                            style={{ backgroundColor: "white" }}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="Post-Content"
                            label="Post Content"
                            name="post-content"
                            type="string"
                            rows={8}
                            multiline
                            autoComplete="off"
                            onChange={this.handleContentBarChange}
                          />
                        </Grid>
                        <Grid container justify="flex-end" spacing={2}>
                          <Grid item xs={5} md={3} lg={2}>
                            <Button
                              style={{
                                backgroundColor: "white",
                                width: "100%",
                                height: "100%",
                                borderRadius: "20px",
                                backgroundColor: colorBlue,
                                color: "white",
                              }}
                              onClick={this.handlePostButtonClick}
                            >
                              Post
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
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
