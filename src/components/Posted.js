import React from "react";
import CommentList from '../components/CommentList'
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Avatar,
  Typography,
  Link,
  CardActions
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import { indigo } from "@material-ui/core/colors";

export default class Posted extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { post, comment } = this.props;
    //console.log(post.avatar);
    const color = indigo[300];
    return (
      <div>
        <Card
          style={{
            maxWidth: "90vw",
            width: "1200px",
            marginTop: "10px",
            minWidth: "200px",
            backgroundColor: color,
          }}
        >
          <CardHeader
            avatar={<Avatar src={post.avatar}></Avatar>}
            title={
              <Typography
                variant="h5"
                component="h5"
                style={{ color: "black" }}
              >
                {post.topic}
              </Typography>
            }
            subheader={
              <Typography component="h6" style={{ color: "black" }}>
                <Link href={`/user/${post.authorName}`} >{`@${post.authorName}`}</Link>
                {`\t${post.dateCreated}`}
              </Typography>
            }
            action={
              <IconButton>
                <MoreVertIcon></MoreVertIcon>
              </IconButton>
            }
          ></CardHeader>
          <CardContent>
              {post.content}
          </CardContent>
        </Card>
        <CommentList comments={comment} ></CommentList>
      </div>
    );
  }
}
