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
            justify="flex-start"
          >
            <Grid item xs={1} style={{}}>
              <div>
                <Grid container direction="column" alignItems="center">
                  <Avatar alt="src" src={post.avatar} />
                </Grid>
              </div>
            </Grid>
            <Grid item xs={11}>
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
                    <Typography>{`#${post.mainTag} |${post.subTag.map((tag) => {return ` #${tag}`})}`}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{`Post by ${post.authorName}`}</Typography>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
    );
  }
}
