import React from "react";
import replyImage from "../image/mail-reply-480.png";
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Container,
  Link,
  Typography,
} from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import Bubble from "../image/Bubble.svg";

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { index, comment } = this.props;
    const color = green[300];
    return (
      <Grid item style={{ marginLeft: "100px" }}>
        <Card
          style={{
            width: "100%",
            marginTop: "10px",
            minWidth: "200px",
            backgroundColor: "white",
          }}
        >
          <CardHeader
            avatar={<Avatar src={comment.avatar} />}
            title={
              <Link href={`/user/${comment.authorName}`}>
                {`@${comment.authorName}`}
              </Link>
            }
            subheader={comment.dateCreated}
          ></CardHeader>
          <CardContent>{comment.content}</CardContent>
        </Card>
      </Grid>
    );
  }
}
