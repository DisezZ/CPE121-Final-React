import React from "react";
import Cookie from "js-cookie";
import {
  AppBar,
  Typography,
  Box,
  Button,
  Grid,
  Hidden,
  Menu,
  MenuItem,
  Grow,
  Popper,
  Avatar,
  ClickAwayListener,
  Paper,
  MenuList,
  Toolbar,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { lightBlue } from "@material-ui/core/colors";
import CPEImage from "../image/AlternativeLogo.png";

export default class TabApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: null,
    };
  }

  handleLogOutButtonClick = async () => {
    await Cookie.remove("token");
    window.location.reload();
  };

  handleProfileButtonClick = () => {
    this.props.history.push(`/user/${this.props.userInfo.username}`);
  };

  handleCPEButtonClick = () => {
    window.location.reload();
  };

  handleProfileMenuClick = async (event) => {
    await this.setState(
      {
        menu: this.state.menu ? null : event.currentTarget,
      },
      () => {
        console.log(this.state.menu);
      }
    );
  };

  handleProfileMenuClose = async () => {
    await this.setState({
      menu: null,
    });
  };

  handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      this.setState({
        menu: null,
      });
    }
  };

  render() {
    const { avatar, username } = this.props.userInfo;
    return (
      <div>
        <AppBar
          position={this.props.position}
          style={{
            color: "black",
            backgroundColor: "white",
            height: "70px",
          }}
        >
          <Toolbar>
            <Grid
              container
              justify="center"
              direction="column"
              alignItems="center"
            >
              <Grid item xs={12} lg={10} style={{ width: "100%" }}>
                <div>
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    direction="row"
                  >
                    <img
                      src={CPEImage}
                      style={{ maxHeight: "70px" }}
                      onClick={this.handleCPEButtonClick}
                    />
                    <Grid item>
                      <div>
                        <Button
                          aria-controls="simple-menu"
                          aria-haspopup="true"
                          style={{ borderRadius: 20, textTransform: "none" }}
                          variant="text"
                          color="secondary"
                          startIcon={<Avatar src={avatar}></Avatar>}
                          onClick={this.handleProfileMenuClick}
                        >
                          {username}
                        </Button>
                        <Hidden lgUp>
                          <Button>Tags</Button>
                        </Hidden>
                        <Menu
                          id="simple-menu"
                          anchorEl={this.state.menu}
                          keepMounted
                          open={Boolean(this.state.menu)}
                          onClose={this.handleProfileMenuClose}
                          getContentAnchorEl={null}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                        >
                          <MenuItem onClick={this.handleProfileButtonClick}>
                            Profile
                          </MenuItem>
                          <MenuItem>My account</MenuItem>
                          <MenuItem onClick={this.handleLogOutButtonClick}>
                            Logout
                          </MenuItem>
                        </Menu>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

{
  /*
  <Grid item>
                <img
                  src={CPEImage}
                  style={{ maxHeight: "70px" }}
                  onClick={this.handleCPEButtonClick}
                />
              </Grid>
              <Grid>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  style={{ borderRadius: 20, textTransform: "none" }}
                  variant="text"
                  color="secondary"
                  startIcon={<Avatar src={avatar}></Avatar>}
                  onClick={this.handleProfileMenuClick}
                >
                  {username}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={this.state.menu}
                  keepMounted
                  open={Boolean(this.state.menu)}
                  onClose={this.handleProfileMenuClose}
                  getContentAnchorEl={null}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                >
                  <MenuItem onClick={this.handleProfileButtonClick}>
                    Profile
                  </MenuItem>
                  <MenuItem>My account</MenuItem>
                  <MenuItem onClick={this.handleLogOutButtonClick}>
                    Logout
                  </MenuItem>
                </Menu>
              </Grid>*/
}
