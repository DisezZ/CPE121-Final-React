import React from "react";
import Cookie from "js-cookie";
import Axios from "axios";
import { BaseURL } from "../defaults.json";
import PostList from "../components/PostsList";
import PostForm from "../components/PostForm";
import TagsList from "../components/TagsList"
import AppBar from "../components/AppBar";
import { Button, Paper, Grid, Drawer } from "@material-ui/core";
import { mainTag, subTag } from "../tags.json";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      });
      //console.log("Hello")
    });
    //console.log(this.state.posts)
  };

  render() {
    return (
      <div style={{ backgroundColor: "blueviolet", minHeight: "100vh" }}>
        <AppBar></AppBar>
        <Grid container justify="center" style={{ paddingTop: "10vh" }}>
          <Grid item >
            <PostList posts={this.state.posts}></PostList>
          </Grid>
          <Grid container item lg={2} justify="center" alignItems="flex-start" direction="row" style={{marginLeft:'5vw'}}>
            <Paper style={{height: '100vh'}}>
            <TagsList></TagsList>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
