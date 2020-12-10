import React from "react";
import Cookie from "js-cookie";
import Axios from "axios";
import { BaseURL } from "../defaults.json";
import Post from "../components/Post";
import PostForm from "../components/PostForm";
import TagsList from "../components/TagsList"
import AppBar from "../components/AppBar";
import Posted from '../components/Posted'
import LoadingPage from "../components/LoadingPage"
import { Button, Paper, Grid, Drawer } from "@material-ui/core";
import { mainTag, subTag } from "../tags.json";

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
      comment: []
    };
  }

  componentDidMount() {
    this.postRequest();
  }

  postRequest = async () => {
    const token = Cookie.get("token");
    let Res = {}
    //console.log(this.props.match.params.id)
    const data = {
      token: token,
      id: this.props.match.params.id
    };
    //console.log(data)
    await Axios.post(BaseURL + "/posted/", data).then(async (res) => {
      var date = new Date(res.data.post.dateCreated);
      var dateCreated = `${date.getDate()} ${
        monthName[date.getMonth()]
      } ${date.getFullYear()}`;
      res.data.post.dateCreated = dateCreated
      dateCreated = res.data.comment.map((data, index) => {
        date = new Date(data.dateCreated)
        return date;
      })
      dateCreated.forEach((date, index) => {
        res.data.comment[index].dateCreated = `${date.getDate()} ${
          monthName[date.getMonth()]
        } ${date.getFullYear()}`;
      })
      this.setState({
        post: res.data.post,
        comment: res.data.comment,
        loaded: true
      })
    });
  };

  render() {
    if(!this.state.loaded) {
      return (
        <LoadingPage></LoadingPage>
      )
    } else {
      return (
        <div style={{ backgroundColor: "blueviolet", minHeight: "100vh" }} >
          <AppBar {...this.props} ></AppBar>
          <Grid container justify="center" style={{ paddingTop: "10vh" }} >
            <Posted post={this.state.post} comment={this.state.comment} ></Posted>
          </Grid>
        </div>
      );
    }
  }
}
