import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Container,
  Link
} from "@material-ui/core";
import green from '@material-ui/core/colors/green'

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { index, comment } = this.props;
    const color = green[300]
    return (
      <Grid item style={{marginLeft: '100px'}} >
        <Card
          style={{
            maxWidth: "60vw",
            width: "650px",
            marginTop: "10px",
            minWidth: "200px",
            backgroundColor: color,
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
