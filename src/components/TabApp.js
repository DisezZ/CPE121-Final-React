import React from "react";
import Home from "../components/Home";
import News from "../components/News";
import AboutUs from "../components/AboutUs";
import Help from "../components/Help";
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Button,
  Grid,
  Hidden,
  Menu,
  MenuItem,
  Collapse,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { lightBlue } from "@material-ui/core/colors";
import CPEImage from "../image/AlternativeLogo.png";

export default class TabApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabselected: 0,
    };
  }

  handleLogInButtonClick = () => {
    this.props.history.push("/login");
  };

  handleCPEButtonClick = () => {
    window.location.reload();
  };

  handleTabsChange = (event, newValue) => {
    this.setState({ tabselected: newValue });
  };

  handleTabsContent = (event, newValue) => {
    if (this.state.tabselected == 0) {
      return <Home {...this.props}></Home>;
    } else if (this.state.tabselected == 1) {
      return <AboutUs {...this.props}></AboutUs>;
    }
  };

  render() {
    const tabContent = this.handleTabsContent();
    return (
      <div>
        <AppBar
          position="static"
          style={{
            color: "black",
            backgroundColor: "white",
            maxHeight: "65px",
          }}
        >
          <Grid direction="column" alignItems="stretch">
            <Grid item>
              <div>
                <Grid container justify="center" alignItems="center">
                  <Grid item xs={12} md={9}>
                    <div>
                      <Grid
                        container
                        justify="space-between"
                        alignItems="center"
                      >
                        <Grid item xs={4} lg={2}>
                          <div>
                            <Grid container justify="center">
                              <div>
                                <img
                                  src={CPEImage}
                                  style={{ height: "65px" }}
                                  onClick={this.handleCPEButtonClick}
                                />
                              </div>
                            </Grid>
                          </div>
                        </Grid>
                        <Grid item xs={4} lg={8}>
                          <div>
                            <Tabs
                              value={this.state.tabselected}
                              onChange={this.handleTabsChange}
                              aria-label="simple tabs example"
                              centered
                              indicatorColor="primary"
                              variant="fullWidth"
                              style={{ height: "65px" }}
                            >
                              <Tab label="HOME" style={{ height: "65px" }} />
                              <Tab
                                label="ABOUT US"
                                style={{ height: "65px" }}
                              />
                            </Tabs>
                          </div>
                        </Grid>
                        <Grid item xs={6} lg={2}>
                          <div>
                            <Grid container justify="center">
                              <div>
                                <Button
                                  variant="outlined"
                                  onClick={this.handleLogInButtonClick}
                                  startIcon={<ExitToAppIcon />}
                                  style={{
                                    borderRadius: 20,
                                    color: lightBlue[400],
                                    borderColor: lightBlue[400],
                                    backgroundColor: "white",
                                    minWidth: "10vw",
                                    minHeight: "6vh",
                                  }}
                                >
                                  <Typography>Log In</Typography>
                                </Button>
                              </div>
                            </Grid>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </AppBar>
        {tabContent}
      </div>
    );
  }
}
{
  /**
<Grid
            container
            justify="space-around"
            alignItems="center"
            direction="row"
          >
            <Hidden smDown>
              <Grid>
                <img
                  src={CPEImage}
                  style={{ maxHeight: "9vh" }}
                  onClick={this.handleCPEButtonClick}
                />
              </Grid>
            </Hidden>
            <Tabs
              value={this.state.tabselected}
              onChange={this.handleTabsChange}
              aria-label="simple tabs example"
              style={{ minHeight: "10vh", minWidth: "60vw" }}
              centered
              indicatorColor="primary"
              variant="fullWidth"
            >
              <Tab label="HOME" style={{ minHeight: "10vh" }} />
              <Tab label="NEWS" style={{ minHeight: "10vh" }} />
              <Tab label="ABOUT US" style={{ minHeight: "10vh" }} />
              <Tab label="HELP" style={{ minHeight: "10vh" }} />
            </Tabs>
            <Button
              variant="outlined"
              onClick={this.handleLogInButtonClick}
              startIcon={<ExitToAppIcon />}
              style={{
                borderRadius: 20,
                color: lightBlue[400],
                borderColor: lightBlue[400],
                backgroundColor: "white",
                minWidth: "10vw",
                minHeight: "6vh",
              }}
            >
              <Typography>Log In</Typography>
            </Button>
          </Grid> */
}
