import React from "react";
import Comment from "./Comment";
import Axios from "axios";
import Cookie from "js-cookie";
import { BaseURL } from "../defaults.json";
import { Typography, Grid, Paper, Card } from "@material-ui/core";

export default class PostsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const comments = this.props.comments;
    //console.log(comments)
    return (
      <Grid container spacing={2} direction="column" alignItems="stretch" >
          {comments.map((comment, i) => {
            return <Comment index={i} key={i} comment={comment} />;
          })}
        </Grid>
    );
  }
}
