import React from "react";
import Cookie from "js-cookie";
import Axios from "axios";
import { BaseURL, Notice } from "../defaults.json";
import PostList from "../components/PostsList";
import LoadingPage from "../components/LoadingPage";
import TagsList from "../components/TagsList";
import AppBar from "../components/AppBar";
import {
  Button,
  Paper,
  Grid,
  Drawer,
  Hidden,
  Typography,
  GridList,
} from "@material-ui/core";
import { mainTag, subTag } from "../tags.json";
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
    };
  }

  componentDidMount() {
    this.postRequest();
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
      //console.log("Hello")
    });
    console.log(this.state.posts);
  };

  render() {
    const color = grey[200];
    if (!this.state.loaded) {
      return <LoadingPage></LoadingPage>;
    } else {
      return (
        <div
          style={{
            backgroundColor: "lightblue",
            minHeight: "60vh",
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
                <Grid container item xs={12} lg={8}>
                  <Paper square style={{ backgroundColor: color, padding: "15px" }}>
                    <div>
                      <Grid
                        container
                        direction="column"
                        spacing={4}
                        justify="center"
                      >
                        <Grid item>
                          <div>
                            <Grid container justify="space-between" spacing={4}>
                              <Grid item xs={6}>
                                <Paper>
                                  <Typography>Notice:</Typography>
                                  <Typography>{Notice}</Typography>
                                </Paper>
                              </Grid>
                              <Grid item xs={6}>
                                <Paper>
                                  <Typography>Hello</Typography>
                                </Paper>
                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                        <Grid item>
                          <Paper style={{ padding: "15px" }}>
                            <Typography>Pinned Thread :</Typography>
                            <Typography>Hot Thread :</Typography>
                            <Typography>Thread :</Typography>
                            <PostList
                                {...this.props}
                                posts={this.state.posts}
                              ></PostList>
                          </Paper>
                        </Grid>
                      </Grid>
                    </div>
                  </Paper>
                </Grid>
                <Grid container item xs={0} lg={4} direction="column">
                  <Grid item >
                  <Hidden mdDown>
                    <Paper square style={{ width:"300px", height: "100%", position: "fixed" }}>
                      <Typography>Hello</Typography>
                    </Paper>
                  </Hidden>
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
