import React from "react";
import { Grid, Button, Typography, Hidden } from "@material-ui/core";
import Images from "../image/Component11–1@2x.png";
import {
  orange,
  blue,
  grey
} from "@material-ui/core/colors"

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSigninButtonPressed = () => {
    this.props.history.push("/signup");
  };

  render() {
    return (
      <div>
        <Grid container>
          <Grid item>
            <Grid container alignItems="stretch">
              <Grid item style={{ marginTop: "10vh" }}>
                <div
                  style={{
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    width: "100vw",
                    backgroundColor: "rgba(256 , 256, 256, 0.4)",
                  }}
                >
                  <div style={{ paddingLeft: "10vw", display: "inline-block" }}>
                    <Typography variant="h3" style={{ fontWeight: "bolder", color: "#F15624" }}>
                      To The New World,
                    </Typography>
                    <Typography variant="h3" style={{ fontWeight: "bolder", color: "#4A60AC" }}>
                      The Best CPE Community
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid item>
                <div
                  style={{
                    paddingLeft: "10vw",
                    paddingRight: "30px",
                    paddingTop: "50px",
                    width: "45vw",
                  }}
                >
                  <Typography variant="body1" style={{ fontWeight: "bold", color: grey[800] }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vestibulum quis luctus sapien. Phasellus commodo quam ut
                    lacus vehicula scelerisque. Vivamus velit urna, luctus non
                    egestas et, porta nec nibh. Ut semper tortor sit amet leo
                    pharetra eleifend. Etiam lobortis semper nibh sit amet
                    laoreet. Integer eget ante magna. Mauris tortor ligula,
                    elementum at ultrices at, scelerisque id nisl. Donec posuere
                    augue ut neque malesuada, in volutpat elit feugiat.
                    Pellentesque bibendum metus at scelerisque aliquet.
                    Curabitur eu scelerisque justo.
                  </Typography>
                </div>
              </Grid>
              <Grid item>
                <div
                  style={{
                    paddingLeft: "10vw",
                    paddingRight: "30px",
                    paddingTop: "50px",
                    width: "45vw",
                  }}
                >
                  <Grid container justify="center">
                    <Grid item>
                      <Button
                        variant="outlined"
                        style={{
                          borderRadius: "20vw",
                          color: "white",
                          backgroundColor: "#F15624",
                          minWidth: "15vw",
                          minHeight: "10vh",
                          textTransform: "none"
                        }}
                        onClick={this.handleSigninButtonPressed}
                      >
                        <Typography variant="h5">
                          Get Started
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <div style={{ width: "100%", height: "100%" }}>
              <Grid container>
                <Grid item>
                  <Hidden smDown>
                    <div>
                      <img
                        src={Images}
                        style={{
                          left: "60vw",
                          bottom: "0px",
                          position: "absolute",
                          height: "400px",
                        }}
                      />
                    </div>
                  </Hidden>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

{
  /**
<Button
              onClick={this.onSigninButtonPressed}
              variant="contained"
              style={{
                borderRadius: 20,
                backgroundColor: orange[800],
                color: "white",
                marginTop: '75vh'
              }}
            >
              <Typography variant="h5">Sign Up</Typography>
            </Button> */
}
