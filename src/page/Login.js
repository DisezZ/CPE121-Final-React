import React from "react";
import LoginForm from "../components/LoginForm";
import { Grid } from "@material-ui/core";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xl={6} xs={12} >
            <LoginForm {...this.props} />
          </Grid>
        </Grid>
      </div>
    );
  }
}
