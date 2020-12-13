import React from "react";
import Cookie from "js-cookie";
import TabApp from "../components/TabApp";
import { Grid, Button } from "@material-ui/core";
import MainBackground from "../image/Web1920–6@2x.png";

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSigninButtonPressed = () => {
    this.props.history.push("/signup");
  };

  render() {
    return (
      <div
        style={{
          width: "100vw",
          minHeight: "100vh",
          backgroundImage: `url(${MainBackground})`,
          backgroundAttachment: "fixed",
          backgroundSize: "100%",
        }}
      >
        <TabApp {...this.props}></TabApp>
      </div>
    );
  }
}
