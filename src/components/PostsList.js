import React from "react";
import Post from "./Post";
import Axios from "axios";
import Cookie from "js-cookie"
import { BaseURL } from "../defaults.json";
import { Typography, Grid, Paper } from "@material-ui/core";

export default class PostsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  

  render() {
    const posts = this.props.posts;
    console.log(posts)
    return (
        posts.map((post, index) => {
          return <Post index={index} key={index} post={post} {...this.props} />;
        })
    );
  }
}
