import React from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import CPEImage from "../image/PrimaryLogo-eng@3x.png";
import { orange } from "@material-ui/core/colors";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  onSigninButtonPressed = () => {
    this.props.history.push("/signup");
  };

  render() {
    return (
      <div>
        <img src={CPEImage} style={{ minWidth: "100vw", marginTop: 5 }} />
        <Grid container justify='center' >
          <Grid item>
            <Button
              onClick={this.onSigninButtonPressed}
              variant="contained"
              style={{
                borderRadius: 20,
                backgroundColor: orange[800],
                color: "white",
              }}
            >
              <Typography variant="h5">Sign In</Typography>
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
