import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Button, ButtonBase, CardActionArea, Container } from "@material-ui/core";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import {Link} from '@material-ui/core';
import { Link as RouterLink}  from 'react-router-dom'
import { URL } from "../defaults.json";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { indigo, grey } from "@material-ui/core/colors";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import UpvoteButton from "./UpvoteButton";
import CommentCollapse from "./CommentCollapse";

const monthName = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: false,
      upvote: false,
      favorite: false,
    };
  }

  handleFavoriteClick = async () => {
    await this.setState({ favorite: !this.state.favorite });
  };

  handleCommentClick = async () => {
    await this.setState({ comment: !this.state.comment });
  };

  handleUpvoteClick = async () => {
    await this.setState({ upvote: !this.state.upvote });
  };

  render() {
    const { comment, favorite, upvote } = this.state;
    const { post } = this.props;
    //console.log(Date.parse(post.dateCreated))
    const color = indigo[300];
    //console.log(post)
    const dateCreated = `${post.dateCreated.getDate()} ${
      monthName[post.dateCreated.getMonth()]
    } ${post.dateCreated.getFullYear()}`;
    return (
      <Container maxWidth="md" style={{ minWidth: "300px" }}>
        <Card
          style={{
            maxWidth: "750px",
            marginTop: "10px",
            minWidth: "200px",
            backgroundColor: color,
          }}
        >
          <Link component={RouterLink} to={`/user/${post.authorName}/post/${post._id}`} underline='none' >
            <Container style={{padding: '0'}}>
            <CardHeader
              avatar={<Avatar src={post.avatar}></Avatar>}
              title={
                <Typography variant="h5" component="h5" style={{color: 'black'}} >
                  {post.topic}
                </Typography>
              }
              subheader={
                <Typography component='h6' style={{color:'black'}} >
                  {`@${post.authorName}`}
                  {`\t${dateCreated}`}
                </Typography>
              }
              action={
                <IconButton>
                  <MoreVertIcon></MoreVertIcon>
                </IconButton>
              }
            ></CardHeader>
            <CardContent>
              <Typography style={{color:'black'}} >{`${post.content.slice(0, 465)}`}</Typography>
            </CardContent>
            </Container>
            </Link>
          <CardActions>
            <LikeButton
              status={favorite}
              handleFavoriteClick={this.handleFavoriteClick}
            />
            <CommentButton
              status={comment}
              handleCommentClick={this.handleCommentClick}
            />
            <UpvoteButton
              status={upvote}
              handleUpvoteClick={this.handleUpvoteClick}
            />
          </CardActions>
          <CommentCollapse status={comment}></CommentCollapse>
        </Card>
      </Container>
    );
  }
}
