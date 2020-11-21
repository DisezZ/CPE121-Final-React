import React from "react";
import Post from "./Post";
import Axios from "axios";
import { BaseURL } from "../defaults.json";
import { Typography, Grid } from "@material-ui/core";

export default class PostsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    Axios.get(BaseURL + "/posts").then((res) => {
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
    });
  }

  render() {
    const { posts } = this.state;
    return (
      <Grid>
        {posts.map((post, index) => {
          return <Post post={post} />;
        })}
      </Grid>
    );
  }
}
