import React from "react";
import CommentList from "../components/CommentList";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Avatar,
  Typography,
  Link,
  CardActions,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import { grey } from "@material-ui/core/colors";

export default class Posted extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const color = grey[200];
    var subTag = this.state.subTag;
    var borderTop;
    const borderLBR = "1px solid";
    const { comment, favorite, upvote } = this.state;
    const { post, index } = this.props;
    if (index === 0) {
      borderTop = borderLBR;
    } else {
      borderTop = "0px";
    }
    return (
      <Grid
            container
            alignItems="center"
            justify="space-evenly"
          >
            <Grid item xs={2} md={1} style={{}}>
              <div>
                <Grid container direction="column" alignItems="center">
                  <Avatar alt="src" src={post.avatar} />
                </Grid>
              </div>
            </Grid>
            <Grid item xs={9} md={7}>
              <div>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="flex-start"
                >
                  <Grid item>
                    <Typography>{post.topic}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{`#${post.mainTag} |${subTag}`}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{`Post by ${post.authorName}`}</Typography>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={3} md={1}>
              <div>
                <Grid container direction="column" alignItems="center">
                  <Typography>Voted</Typography>
                  <Typography>{post.upvoted.length}</Typography>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={3} md={1}>
              <div>
                <Grid container direction="column" alignItems="center">
                  <Typography>Replied</Typography>
                  <Typography>{post.comment.length}</Typography>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={3} md={2}>
              <div>
                <Grid container direction="column" alignItems="center">
                  <Typography>{`${post.dateCreated.getDate()}/${post.dateCreated.getMonth()}/${post.dateCreated.getFullYear()}`}</Typography>
                  <Typography>{`${
                    post.dateCreated.getHours() < 10
                      ? `0${post.dateCreated.getHours()}`
                      : post.dateCreated.getHours()
                  }:${
                    post.dateCreated.getMinutes() < 10
                      ? `0${post.dateCreated.getMinutes()}`
                      : post.dateCreated.getMinutes()
                  }`}</Typography>
                </Grid>
              </div>
            </Grid>
          </Grid>
    );
  }
}
