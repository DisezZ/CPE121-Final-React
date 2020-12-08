import React from "react";
import Cookie from 'js-cookie'
import TabApp from "../components/TabApp";
import {
  Grid, Button
} from "@material-ui/core";
import CPEBackground from '../components/PrimaryLogo-eng@3x.png'

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSigninButtonPressed = () => {
    this.props.history.push("/signup");
  }

  render() {
    return (
      <div style={{minHeight: "100vh"}}>
        <TabApp {...this.props}></TabApp>
      </div>
    );
  }
}
