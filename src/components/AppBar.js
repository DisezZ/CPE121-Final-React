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
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { lightBlue } from "@material-ui/core/colors";
import CPEImage from "../image/AlternativeLogo.png"

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
    this.props.history.push(`/user/${this.props.userInfo.username}`)
  }

  handleCPEButtonClick = () => {
    window.location.reload();
  };

  handleProfileMenuClick = async (event) => {
    await this.setState({
      menu: this.state.menu ? null : event.currentTarget,
    });
    console.log(this.state.menu);
  };

  handleProfileMenuClose = () => {
    this.setState({
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
    const { avatar, username } = this.props.userInfo
    return (
      <div>
        <AppBar
          position="fixed"
          style={{ color: "black", backgroundColor: "white" }}
        >
          <Grid
            container
            justify="space-around"
            alignItems="center"
            direction="row"
          >
            <Grid>
              <img
                src={CPEImage}
                style={{ maxHeight: "9vh" }}
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
                startIcon={<Avatar src={avatar} ></Avatar>}
                onClick={this.handleProfileMenuClick}
              >
                {username}
              </Button>
              <Popper
                id={Boolean(this.state.menu) ? "simple-popper" : undefined}
                open={Boolean(this.state.menu)}
                anchorEl={this.state.menu}
                role={undefined}
                transition
                disablePortal
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleProfileMenuClose}>
                    <MenuList
                      style={{ color: "black", background: '' }}
                      autoFocusItem={Boolean(this.state.menu)}
                      id="menu-list-grow"
                      onKeyDown={this.handleListKeyDown}
                    >
                      <MenuItem onClick={this.handleProfileButtonClick}>
                        Profile
                      </MenuItem>
                      <MenuItem onClick={this.handleProfileMenuClose}>
                        My account
                      </MenuItem>
                      <MenuItem onClick={this.handleLogOutButtonClick}>
                        Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Popper>
            </Grid>
          </Grid>
        </AppBar>
      </div>
    );
  }
}
