import React from "react";
import SignupForm from "../components/SignupForm";
import {
    Grid
} from '@material-ui/core'

export default class Signup extends React.Component {
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
          <Grid item xl={6} xs={12}  >
            <SignupForm {...this.props} />
          </Grid>
        </Grid>
      </div>
    );
  }
}
