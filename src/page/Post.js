import React from "react";
import Cookie from "js-cookie";
import Axios from "axios";
import { BaseURL } from "../defaults.json";
import Post from "../components/Post";
import PostForm from "../components/PostForm";
import AppBar from "../components/AppBar";
import Posted from "../components/Posted";
import LoadingPage from "../components/LoadingPage";
import CommentButton from "../components/CommentButton";
import UpvoteButton from "../components/UpvoteButton";
import CommentList from "../components/CommentList";
import {
  Button,
  Paper,
  Grid,
  Drawer,
  Typography,
  Divider,
  TextField,
  Avatar,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { mainTag, subTag } from "../tags.json";
import { grey, blue, orange } from "@material-ui/core/colors";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import MainBackground from "../image/Web1920–6@2x.png";

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

export default class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      post: {},
      comments: {},
      commented: false,
      upvoted: false,
      anonymous: false,
      commentTypeArea: "",
    };
  }

  componentDidMount() {
    this.postRequest();
  }

  postRequest = async () => {
    const token = Cookie.get("token");
    let Res = {};
    //console.log(this.props.match.params.id)
    const data = {
      token: token,
      id: this.props.match.params.id,
    };
    await Axios.post(BaseURL + "/posted/", data).then((res) => {
      var dateCreated = new Date(res.data.post.dateCreated);
      res.data.post.dateCreated = dateCreated;
      var newDate = [];
      res.data.comment.forEach((data, index) => {
        dateCreated = new Date(data.dateCreated);
        newDate.push(dateCreated);
      });
      res.data.comment.dateCreated = newDate;
      console.log(newDate);
      this.setState(
        {
          post: res.data.post,
          comments: res.data.comment,
          loaded: true,
        },
        () => {
          console.log(10);
          this.state.post.upvoted.map((ID) => {
            if (ID.userID === this.props.userInfo._id) {
              //console.log("find")
              this.setState({
                upvoted: true,
              });
            }
          });
        }
      );
    });
  };

  handleUpvoteClick = async () => {
    const { post } = this.state;
    const token = Cookie.get("token");
    const to = post._id;
    var data = {
      token: token,
      to: to,
      action: "upvote",
    };
    Axios.post(BaseURL + "/postAction/", data).then(async (res) => {
      if (res.data.value) {
        if (this.state.upvoted) {
          var index = -1;
          var item = this.state.post.upvoted.filter((vote) => {
            return vote.userID !== this.props.userInfo._id;
          });
          var temp = this.state.post;
          temp.upvoted = item;
          await this.setState(
            {
              post: temp,
            },
            () => console.log(this.state.post.upvoted)
          );
        } else {
          var temp = this.state.post;
          await temp.upvoted.push({
            userID: this.props.userInfo._id,
            username: this.props.userInfo.username,
          });
          await this.setState({
            post: temp,
          });
        }
        this.setState({ upvoted: !this.state.upvoted });
      }
    });
  };

  handleCheckBoxClick = () => {
    this.setState({
      anonymous: !this.state.anonymous,
    });
  };

  handleReplyButtonSendClick = () => {
    if (this.state.commentTypeArea !== "") {
      this.handleCommentRequest();
    } else {
      alert("Need to Type before replying somethings...");
    }
  };

  handleReplyButtonClearClick = async (stop) => {
    await this.setState(
      {
        commentTypeArea: "",
      },
      () => {
        document.getElementById("Reply").value = "";
      }
    );
  };

  handleSearchType = (event) => {
    this.setState({
      commentTypeArea: event.target.value,
    });
  };

  handleCommentRequest = () => {
    const token = Cookie.get("token");
    const data = {
      to: this.state.post._id,
      token: token,
      content: document.getElementById("Reply").value,
      anonymous: this.state.anonymous,
    };
    Axios.post(BaseURL + "/comment/", data).then((res) => {
      if (res.data.value) {
        this.postRequest();
        this.handleReplyButtonClearClick();
      } else {
        alert("Seem something might went wrongs");
      }
    });
  };

  handleCommentButtonClick = async () => {
    await document
      .getElementById("Reply-Section")
      .scrollIntoView({ behavior: "smooth" });
  };

  handleSwap = () => {
    this.setState({ anonymous: !this.state.anonymous });
  };

  render() {
    const colorBlue = blue[600];
    const colorOrange = orange[900];
    const color = grey[300];
    const { post, comments } = this.state;
    const { userInfo } = this.props;
    if (!this.state.loaded) {
      return <LoadingPage></LoadingPage>;
    } else {
      return (
        <div
          style={{
            backgroundImage: `url(${MainBackground})`,
            minHeight: "100vh",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
          }}
        >
          <AppBar position="fixed" {...this.props}></AppBar>
          <Grid
            container
            direction="row"
            justify="center"
            style={{ marginTop: "70px" }}
          >
            <Grid item xs={12} lg={10}>
              <Paper square style={{ backgroundColor: color, padding: "15px" }}>
                <div>
                  <Grid
                    container
                    direction="column"
                    alignItems="stretch"
                    spacing={2}
                  >
                    <Grid item>
                      <Paper square style={{ height: "100%", padding: "15px" }}>
                        <Grid item>
                          <Typography
                            variant="h6"
                            style={{ fontWeight: "bold" }}
                          >
                            Posts :
                          </Typography>
                        </Grid>
                        <Grid container style={{ padding: "15px" }}>
                          <Grid
                            container
                            direction="column"
                            alignItems="stretch"
                            style={{
                              outline: "1px solid",
                              //marginTop: "15px",
                            }}
                            spacing={1}
                          >
                            <Grid item>
                              <Posted
                                {...this.props}
                                post={post}
                                index={0}
                              ></Posted>
                            </Grid>
                            <Grid item>
                              <Paper
                                square
                                variant="outlined"
                                style={{ padding: "15px" }}
                              >
                                <Typography>{post.content}</Typography>
                              </Paper>
                            </Grid>
                            <Grid item>
                              <div>
                                <Grid container spacing={2}>
                                  <Grid item>
                                    <div>
                                      <Grid direction="column" container>
                                        <Grid item>
                                          <div>
                                            <Grid container alignItems="center">
                                              <Grid item>
                                                <UpvoteButton
                                                  status={this.state.upvoted}
                                                  handleUpvoteClick={
                                                    this.handleUpvoteClick
                                                  }
                                                ></UpvoteButton>
                                              </Grid>
                                              <Grid item>
                                                <Typography variant="body2">{`${post.upvoted.length} Upvoted`}</Typography>
                                              </Grid>
                                            </Grid>
                                          </div>
                                        </Grid>
                                      </Grid>
                                    </div>
                                  </Grid>
                                  <Grid item>
                                    <div>
                                      <Grid direction="column" container>
                                        <Grid item>
                                          <div>
                                            <Grid container alignItems="center">
                                              <Grid item>
                                                <CommentButton
                                                  handleCommentClick={
                                                    this
                                                      .handleCommentButtonClick
                                                  }
                                                ></CommentButton>
                                              </Grid>
                                              <Grid item>
                                                <Typography variant="body2">{`${post.comment.length} Replies`}</Typography>
                                              </Grid>
                                            </Grid>
                                          </div>
                                        </Grid>
                                      </Grid>
                                    </div>
                                  </Grid>
                                </Grid>
                              </div>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                    <Grid item id="Reply-Section">
                      <Paper square style={{ padding: "15px", height: "100%" }} id="paper">
                        <Grid
                          container
                          direction="column"
                          alignItems="stretch"
                          spacing={2}
                        >
                          <Grid container item id="top-section">
                            <Grid
                              direction="row"
                              container
                              justify="space-between"
                            >
                              <Grid item xs={5}>
                                <Typography
                                  variant="h6"
                                  style={{ fontWeight: "bold" }}
                                >
                                  Reply :
                                </Typography>
                              </Grid>
                              <Grid item xs={5}>
                                <div>
                                  <Grid
                                    direction="column"
                                    container
                                    spacing={2}
                                    justify="center"
                                    alignItems="flex-end"
                                  >
                                    <Grid item>
                                      <div>
                                        <Grid
                                          container
                                          justify="flex-end"
                                          alignItems="center"
                                          spacing={1}
                                        >
                                          <Grid item>
                                            <Typography
                                              style={{ fontWeight: "bold" }}
                                            >
                                              As :
                                            </Typography>
                                          </Grid>
                                          <Grid item>
                                            <Avatar
                                              src={
                                                this.state.anonymous
                                                  ? `${Math.floor(
                                                      Math.random() * 1000000
                                                    )
                                                      .toString(36)
                                                      .substring(7)}`
                                                  : userInfo.avatar
                                              }
                                            ></Avatar>
                                          </Grid>
                                          <Grid item>
                                            <Typography>
                                              {this.state.anonymous
                                                ? "Anonymous"
                                                : userInfo.username}
                                            </Typography>
                                          </Grid>
                                          <Grid item>
                                            <Button onClick={this.handleSwap}>
                                              <SwapHorizIcon />
                                            </Button>
                                          </Grid>
                                        </Grid>
                                      </div>
                                    </Grid>
                                  </Grid>
                                </div>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item id="type-section">
                            <div>
                              <TextField
                                variant="outlined"
                                margin="none"
                                multiline
                                fullWidth
                                id="Reply"
                                label="Type to Reply to This Post..."
                                name="Reply"
                                type="text"
                                placeholder="Reply"
                                onChange={this.handleSearchType}
                                autoComplete="off"
                                defaultValue=""
                              ></TextField>
                            </div>
                          </Grid>
                          <Grid item>
                            <Grid container justify="flex-end" spacing={2}>
                              <Grid item>
                                <Button
                                  onClick={this.handleReplyButtonClearClick}
                                  style={{
                                    backgroundColor: colorOrange,
                                    borderRadius: "20px",
                                    color: "white",
                                  }}
                                >
                                  Clear
                                </Button>
                              </Grid>
                              <Grid item>
                                <Button
                                  onClick={this.handleReplyButtonSendClick}
                                  style={{
                                    backgroundColor: colorBlue,
                                    borderRadius: "20px",
                                    color: "white",
                                  }}
                                >
                                  Reply Now
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                    <Grid item>
                      <CommentList comments={comments}></CommentList>
                    </Grid>
                  </Grid>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      );
    }
  }
}
