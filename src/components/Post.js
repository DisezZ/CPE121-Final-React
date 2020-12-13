import React from "react";
import Axios from "axios";
import Cookie from "js-cookie";
import { BaseURL } from "../defaults.json";
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
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
  Button,
  ButtonBase,
  CardActionArea,
  Container,
  Grid,
  Paper,
} from "@material-ui/core";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import { Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
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
      subTag: "",
    };
  }

  componentDidMount() {
    const { post, userInfo } = this.props;
    const { liked, upvoted, subTag } = post;
    liked.forEach((likedBy) => {
      if (likedBy.userID === userInfo._id) {
        this.setState({ favorite: true });
      }
    });
    upvoted.forEach((upvotedBy) => {
      if (upvotedBy.userID === userInfo._id) {
        this.setState({ upvote: true });
      }
    });
    subTag.map((tag) => {
      this.setState({
        subTag: (this.state.subTag += ` #${tag}`),
      });
    });
  }

  handleFavoriteClick = async () => {
    const { post } = this.props;
    const token = Cookie.get("token");
    const to = post._id;
    var data = {
      token: token,
      to: to,
      action: "like",
    };
    Axios.post(BaseURL + "/postAction/", data).then((res) => {
      if (res.data.value) {
        this.setState({ favorite: !this.state.favorite });
      }
    });
  };

  handleCommentClick = async () => {
    await this.setState({ comment: !this.state.comment });
  };

  handleUpvoteClick = async () => {
    const { post } = this.props;
    const token = Cookie.get("token");
    const to = post._id;
    var data = {
      token: token,
      to: to,
      action: "upvote",
    };
    Axios.post(BaseURL + "/postAction/", data).then(async (res) => {
      if (res.data.value) {
        await this.setState({ upvote: !this.state.upvote });
      }
    });
  };

  render() {
    const color = grey[200];
    var subTag = this.state.subTag;
    var borderTop;
    const borderLBR = "1px solid";
    const { comment, favorite, upvote } = this.state;
    const { post, index } = this.props;
    const dateCreated = `${post.dateCreated.getDate()} ${
      monthName[post.dateCreated.getMonth()]
    } ${post.dateCreated.getFullYear()}`;
    if (index === 0) {
      borderTop = borderLBR;
    } else {
      borderTop = "0px";
    }
    return (
      <Grid item xs={12}>
        <Button
          href={`/user/${post.authorName}/post/${post._id}`}
          variant="outlined"
          style={{
            width: "100%",
            textTransform: "none",
            backgroundColor: color,
            borderBottom: borderLBR,
            borderTop: borderTop,
            borderLeft: borderLBR,
            borderRight: borderLBR,
            borderRadius: 0,
          }}
        >
          <Grid
            container
            spacing={2}
            alignItems="center"
            justify="space-evenly"
            style={{ padding: "15px" }}
          >
            <Grid item xs={2} md={1}>
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
                    <Typography variant="h6" style={{fontWeight: "bold"}}>{post.topic}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">{`#${post.mainTag} ||${subTag}`}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">{`Post by ${post.authorName}`}</Typography>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={3} md={1}>
              <div>
                <Grid container direction="column" alignItems="center">
                  <Typography variant="body2" style={{fontWeight: "bold"}}>Voted</Typography>
                  <Typography variant="body2" >{post.upvoted.length}</Typography>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={3} md={1}>
              <div>
                <Grid container direction="column" alignItems="center">
                  <Typography variant="body2" style={{fontWeight: "bold"}}>Replied</Typography>
                  <Typography variant="body2">{post.comment.length}</Typography>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={3} md={2}>
              <div>
                <Grid container direction="column" alignItems="center">
                  <Typography>{`${post.dateCreated.getDate()}/${post.dateCreated.getMonth()}/${post.dateCreated.getFullYear()}`}</Typography>
                  <Typography variant="body2">{`${
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
        </Button>
      </Grid>
    );
  }
}

{
  /*
  <Paper square variant="outlined" style={{ borderBottom: borderLBR, borderTop: borderTop, borderLeft: borderLBR, borderRight: borderLBR }}>
        <Card style={{border: 0, borderRadius: 0}}>
          <Link
            component={RouterLink}
            to={`/user/${post.authorName}/post/${post._id}`}
            underline="none"
          >
            <Container style={{ padding: "0" }}>
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
                <Typography style={{ color: "black" }}>{`${post.content.slice(
                  0,
                  465
                )}`}</Typography>
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
          <CommentCollapse status={comment} to={post._id}></CommentCollapse>
        </Card>
      </Paper>*/
}
