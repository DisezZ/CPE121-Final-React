import React from "react";
import Cookie from "js-cookie";
import Axios from "axios";
import { BaseURL } from "../defaults.json";
import Post from "../components/Post";
import PostForm from "../components/PostForm";
import TagsList from "../components/TagsList"
import AppBar from "../components/AppBar";
import { Button, Paper, Grid, Drawer } from "@material-ui/core";
import { mainTag, subTag } from "../tags.json";

export default class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.postRequest();
  }

  postRequest = async () => {
    const token = Cookie.get("token");
    let Res = {}
    console.log(this.props.match.params.id)
    const data = {
      token: token,
      id: this.props.match.params.id
    };
    //console.log(data)
    await Axios.post(BaseURL + "/posted/", data).then((res) => {
      //console.log(res.data)
      Res = res.data
    });
    console.log(Res)
    return Res
  };

  render() {
    const { post, comment} = this.postRequest()
    return (
      <div style={{ backgroundColor: "blueviolet", minHeight: "100vh" }} >
        <AppBar></AppBar>
      </div>
    );
  }
}
