import React from "react";
import SignupForm from "../components/SignupForm";
import {
    Grid,
    Paper
} from '@material-ui/core'
import MainBackground from "../image/Web1920–6@2x.png";
import CPEBackground from "../image/Web1920–1@2x.png"

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{
        backgroundImage: `url(${MainBackground})`,
        minHeight: "100vh",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={12}>
            <img src={CPEBackground} style={{height: "30vh"}} />
          </Grid>
          <Grid item xl={6} xs={12}  >
            <Paper style={{padding: "30px", borderRadius: "30px", border: "4px outset"}}>
              <SignupForm {...this.props} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
