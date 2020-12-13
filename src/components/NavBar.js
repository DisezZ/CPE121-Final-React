import React from "react";
import MainTagSection from "./MainTagSection";
import SubTagSection from "./SubTagSection"
import { Grid, Hidden, Typography, Paper, TextField } from "@material-ui/core";
import { indigo, grey } from "@material-ui/core/colors";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSearchType = async (event) => {
    await this.props.handleSearchType(event);
  };

  render() {
    const color = grey[300];
    return (
      <Hidden mdDown>
        <Paper
          square
          style={{
            width: "300px",
            height: "100%",
            position: "fixed",
            padding: "15px",
            overflow: "auto"
          }}
        >
          <Grid container direction="column">
            <Typography variant="h4" style={{ marginTop:"15px" }}>Main Tags :</Typography>
            <Paper
              square
              variant="outlined"
              style={{
                padding: "15px",
                marginTop:"15px",
                backgroundColor: color,
                border: 0,
              }}
            >
              <Grid container spacing={1}>
                <MainTagSection {...this.props} />
              </Grid>
            </Paper>
            <Typography style={{ marginTop:"15px" }}>Sub Tags :</Typography>
            <Paper
              square
              variant="outlined"
              style={{
                padding: "15px",
                marginTop:"15px",
                backgroundColor: color,
                border: 0,
                height: "40vh",
                overflow: "auto"
              }}
            >
              <Grid
                container
                direction="column"
                alignItems="stretch"
                justify="center"
              >
                <Grid item>
                  <TextField
                    variant="outlined"
                    margin="none"
                    fullWidth
                    id="subTagSearched"
                    label="Type to Find Sub Tags..."
                    name="subTag"
                    type="text"
                    placeholder="Sub Tags"
                    onChange={this.handleSearchType}
                    autoComplete="off"
                    defaultValue=""
                  ></TextField>
                </Grid>
                <Grid item style={{marginTop:"15px"}}>
                    <SubTagSection {...this.props} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Paper>
      </Hidden>
    );
  }
}
