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

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      posts: [],
      filter: {
        mainTag: [],
        subTag: [],
      },
      mainTag: mainTag.map(() => {
        return false;
      }),
      subTag: subTag.map(() => {
        return false;
      }),
      searchSubTag: "",
    };
  }

  componentDidMount() {
    this.postRequest();
  }

  handleMainTagStatus = (index) => {
    var items = this.state.mainTag
    items[index] = !items[index]
    this.setState({
      mainTag: items
    },() => {
      console.log(this.state.mainTag)
    })
  };

  handleSubTagStatus = (index) => {
    var items = this.state.subTag
    items[index] = !items[index]
    this.setState({
      subTag: items
    },() => {
      console.log(this.state.subTag)
    })
  };

  handleSubTagSearchType = (event) => {
    this.setState({
      searchSubTag: event.target.value,
    }, () => {
      //console.log(this.state.searchSubTag)
    });
  };

  handleSubTagSearchToBlank = () => {
    this.setState({
      searchSubTag: "",
    });
  }

  postRequest = async () => {
    const token = Cookie.get("token");
    const data = {
      token: token,
      filter: this.state.filter,
    };
    //console.log(data)
    await Axios.post(BaseURL + "/posts/", data).then((res) => {
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
    });
  };

  handlePostPageClick = () => {
    setTimeout(() => {
      this.props.history.push("/submit");
    }, 1000);
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
            backgroundColor: "lightblue",
            minHeight: "100vh",
            flexGrow: 1,
          }}
        >
          <AppBar {...this.props}></AppBar>
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
                                <Paper square style={{ height: "100%", padding: "15px" }}>
                                  <Typography variant="h6">Notice:</Typography>
                                  <Typography>{Notice}</Typography>
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
                            <Typography>Pinned Thread :</Typography>
                            <Typography>Hot Thread :</Typography>
                            <Grid container justify="space-between">
                              <Typography>Thread :</Typography>
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
                    <NavBar
                      search={search}
                      mainTagList={mainTagList}
                      subTagList={subTagList}
                      handleSearchType={this.handleSubTagSearchType}
                      handleMainTagStatus={this.handleMainTagStatus}
                      handleSubTagStatus={this.handleSubTagStatus}
                      handleSearchToBlank={this.handleSubTagSearchToBlank}
                    ></NavBar>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      );
    }
  }
}

{
  /*<Grid item>
                <PostList posts={this.state.posts} {...this.props}></PostList>
              </Grid>*/
}

{
  /*<TagsList></TagsList>/*/
}
