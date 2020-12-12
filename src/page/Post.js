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
import { grey } from "@material-ui/core/colors";

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
      comments: [],
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
      const dateCreated = new Date(res.data.post.dateCreated);
      res.data.post.dateCreated = dateCreated;
      this.setState({
        post: res.data.post,
        comments: res.data.comment,
        loaded: true,
      });
    });
  };

  render() {
    const color = grey[300];
    const { post, comments } = this.state;
    console.log(comments);
    const { userInfo } = this.props;
    console.log(post);
    if (!this.state.loaded) {
      return <LoadingPage></LoadingPage>;
    } else {
      return (
        <div style={{ backgroundColor: "lightblue", minHeight: "90vh" }}>
          <AppBar {...this.props}></AppBar>
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
                    spacing={4}
                  >
                    <Grid item>
                      <Paper square style={{ height: "100%", padding: "15px" }}>
                        <Typography>Posts :</Typography>
                        <Grid
                          container
                          direction="column"
                          alignItems="stretch"
                          style={{
                            padding: "15px",
                            outline: "1px solid",
                            //marginTop: "15px",
                          }}
                        >
                          <Posted
                            {...this.props}
                            post={post}
                            index={0}
                          ></Posted>
                          <Divider
                            style={{ marginTop: "15px", marginBottom: "15px" }}
                          />
                          <Typography>{post.content}</Typography>
                          <Divider
                            style={{ marginTop: "15px", marginBottom: "15px" }}
                          />
                          <Typography>Info Section</Typography>
                          <Grid container spacing={2}>
                            <Grid item>
                              <div>
                                <Grid direction="column" container>
                                  <Grid item>
                                    <div>
                                      <Grid container alignItems="center">
                                        <Grid item>
                                          <UpvoteButton></UpvoteButton>
                                        </Grid>
                                        <Grid item>
                                          <Typography>{`${post.upvoted.length} Upvoted`}</Typography>
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
                                          <CommentButton></CommentButton>
                                        </Grid>
                                        <Grid item>
                                          <Typography>{`${post.comment.length} Replies`}</Typography>
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
                    <Grid item>
                      <Paper square style={{ padding: "15px" }}>
                        <Grid container direction="column" alignItems="stretch">
                          <Grid item>
                            <div>
                              <Grid container justify="space-between">
                                <Grid item xs={5}>
                                  <Typography>Reply :</Typography>
                                </Grid>
                                <Grid item xs={5}>
                                  <div>
                                    <Grid
                                      container
                                      spacing={2}
                                      justify="flex-end"
                                      alignItems="center"
                                    >
                                      <Grid item>
                                        <Typography>Reply As :</Typography>
                                      </Grid>
                                      <Grid item>
                                        <Avatar src={userInfo.avatar}></Avatar>
                                      </Grid>
                                      <Grid item>
                                        <Typography>
                                          {userInfo.username}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </div>
                                </Grid>
                              </Grid>
                            </div>
                          </Grid>
                          <Grid item>
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
                            <Grid container justify="flex-end">
                              <Grid item>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={false}
                                      onChange={this.handleCheckBoxClick}
                                      name={`checkedAnonymous`}
                                    />
                                  }
                                  label="Anonymous?"
                                />
                              </Grid>
                              <Grid item>
                                <Button>Clear</Button>
                              </Grid>
                              <Grid item>
                                <Button>Reply Now</Button>
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
