import React from "react";
import Cookie from "js-cookie";
import Axios from "axios";
import { BaseURL, Notice } from "../defaults.json";
import { mainTag, subTag } from "../tags.json";
import PostList from "../components/PostsList";
import LoadingPage from "../components/LoadingPage";
import AppBar from "../components/AppBar";
import NavBar from "../components/NavBar";
import {
  Button,
  Divider,
  Paper,
  Grid,
  Hidden,
  Typography,
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  TabPanel,
} from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import { grey } from "@material-ui/core/colors";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import MainBackground from "../image/Web1920–6@2x.png";
import CPEBackground from "../image/PrimaryLogo-eng@3x.png";
import NavBackGround from "../image/Chitchat4@4x.png";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      posts: [],
      mainTag: [],
      subTag: [],
      alert: {
        status: false,
        severity: "",
        title: "",
      },
    };
  }

  componentDidMount() {
    this.postRequest();
  }

  postRequest = async () => {
    console.log(this.state.mainTag);
    const token = Cookie.get("token");
    const data = {
      token: token,
      mainTag: this.state.mainTag,
      subTag: this.state.subTag,
    };
    console.log(data.mainTag);
    await Axios.post(BaseURL + "/posts/", data).then((res) => {
      if (!res.data.error) {
        //console.log(res.data[0])
        const dateCreated = res.data.map((res, index) => {
          const date = new Date(res.dateCreated);
          return date;
        });
        for (let index = 0; index < res.data.length; index++) {
          res.data[index].dateCreated = dateCreated[index];
        }
        this.setState({
          posts: res.data,
          loaded: true,
        });
      } else {
        console.log(res.data.error);
        this.setState({
          alert: {
            status: true,
            severity: "error",
            title: "Somethings went wrong",
          },
        });
      }
    });
  };

  handlePostPageClick = () => {
    setTimeout(() => {
      this.props.history.push("/submit");
    }, 1000);
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

  render() {
    const search = this.state.searchSubTag;
    const mainTagList = this.state.mainTag;
    const subTagList = this.state.subTag;
    const color = grey[300];
    if (!this.state.loaded) {
      return <LoadingPage></LoadingPage>;
    } else {
      return (
        <div
          style={{
            backgroundImage: `url(${MainBackground})`,
            minHeight: "100vh",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
          }}
        >
          <AppBar position="fixed" {...this.props}></AppBar>
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ marginTop: "70px" }}
            direction="row"
          >
            <Grid item xs={12} lg={10}>
              <Grid container>
                <Grid container item xs={12} lg={9} justify="center">
                  <Paper
                    square
                    style={{ backgroundColor: color, padding: "15px" }}
                  >
                    <div>
                      <Grid
                        container
                        direction="column"
                        spacing={4}
                        justify="center"
                      >
                        <Grid item>
                          <div>
                            <Grid
                              container
                              justify="space-between"
                              spacing={4}
                              alignItems="stretch"
                            >
                              <Grid item xs={6} style={{ height: "100%" }}>
                                <Paper
                                  square
                                  style={{ height: "100%", padding: "15px" }}
                                >
                                  <Typography variant="h6">Notice:</Typography>
                                  <Typography variant="body2">
                                    {Notice}
                                  </Typography>
                                </Paper>
                              </Grid>
                              <Grid item xs={6}>
                                <Paper square style={{ height: "100%" }}>
                                  <div style={{ width: "100%" }}>
                                    <Grid
                                      container
                                      alignItems="center"
                                      style={{ width: "100%", height: "100%" }}
                                    >
                                      <Grid item>
                                        <Avatar
                                          src={this.props.userInfo.avatar}
                                          style={{ margin: "15px" }}
                                        ></Avatar>
                                      </Grid>
                                      <Grid
                                        item
                                        xs={12}
                                        md={8}
                                        style={{ margin: "15px" }}
                                      >
                                        <TextField
                                          variant="outlined"
                                          margin="none"
                                          fullWidth
                                          id="postInput"
                                          label="Type to Post Something..."
                                          name="post"
                                          type="text"
                                          placeholder="Post"
                                          autoComplete="off"
                                          onClick={this.handlePostPageClick}
                                        ></TextField>
                                      </Grid>
                                    </Grid>
                                  </div>
                                </Paper>
                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                        <Grid item>
                          <Paper square style={{ padding: "15px" }}>
                            <Typography variant="h6">
                              Pinned Thread :
                            </Typography>
                            <Typography variant="h6">Hot Thread :</Typography>
                            <Grid container justify="space-between">
                              <Typography variant="h6">Thread :</Typography>
                              <Button
                                color="default"
                                startIcon={<SortIcon />}
                                style={{ textTransform: "none" }}
                              >
                                <Typography>Sorted By</Typography>
                              </Button>
                            </Grid>
                            <div>
                              <Grid container direction="column">
                                <PostList
                                  {...this.props}
                                  posts={this.state.posts}
                                ></PostList>
                              </Grid>
                            </div>
                          </Paper>
                        </Grid>
                      </Grid>
                    </div>
                  </Paper>
                </Grid>
                <Grid container item xs={0} lg={3} direction="column">
                  <Grid item>
                    <Paper
                      square
                      style={{
                        width: "300px",
                        height: "100%",
                        position: "fixed",
                        padding: "15px",
                        overflow: "auto",
                      }}
                    >
                      <Grid container direction="column" spacing={2}>
                        <Grid item>
                          <Typography
                            variant="h6"
                            style={{ marginTop: "10px" }}
                          >
                            Main Tags:
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Autocomplete
                            style={{ backgroundColor: "white" }}
                            onChange={(event, value) => {
                              this.setState({ mainTag: value }, () => {
                                console.log(typeof this.state.mainTag);
                                this.postRequest();
                              });
                            }}
                            openOnFocus
                            multiple
                            id="Main-Tag-Autocomplete"
                            options={mainTag}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                label="Main Tag"
                                placeholder="Type to search..."
                              />
                            )}
                          />
                        </Grid>
                        <Grid item>
                          <Divider />
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="h6"
                            style={{ marginTop: "10px" }}
                          >
                            Sub Tags:
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Autocomplete
                            style={{ backgroundColor: "white" }}
                            onChange={(event, value) => {
                              this.setState({ subTag: value }, () => {
                                console.log("log");
                                this.postRequest();
                              });
                            }}
                            openOnFocus
                            multiple
                            limitTags={8}
                            id="Sub-Tag-Autocomplete"
                            options={subTag}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                label="Sub Tag"
                                placeholder="Type to search..."
                              />
                            )}
                          />
                        </Grid>
                        <Grid item>
                          <Divider />
                        </Grid>
                        <Grid item>
                          <div style={{margin: "50px"}}>
                            <img
                              src={NavBackGround}
                              style={{ maxWidth: "100%", opacity: "80%" }}
                            />
                          </div>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
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
        </div>
      );
    }
  }
}
