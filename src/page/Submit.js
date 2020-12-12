import React from "react";
import AppBar from "../components/AppBar";
import NavBar from "../components/NavBar";
import {
  Grid,
  Paper,
  Checkbox,
  FormControlLabel,
  Avatar,
  Typography,
  Box,
  Container,
  TextField,
  Button,
  Link,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

export default class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {}

  render() {
    const color = grey[300];
    const { loaded } = this.props;
    return (
      <div style={{ backgroundColor: "lightblue", minHeight: "100vh" }}>
        <AppBar {...this.props}></AppBar>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={12} lg={10}>
            <Paper style={{ width: "60vw", padding: "15px" }}>
              <div style={{ backgroundColor: "white" }}>
                <div>
                  <Grid
                    container
                    direction="row"
                    spacing={3}
                    alignItems="center"
                    justify="space-between"
                  >
                    <Grid item xs={3}>
                      <Typography component="h1" variant="h5">
                        Created Post :
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <div>
                        <Grid container justify="flex-end" alignItems="center" spacing={1}>
                          <Grid item>
                            <Avatar></Avatar>
                          </Grid>
                          <Grid item>
                            <Typography>UserName on Anony</Typography>
                          </Grid>
                        </Grid>
                      </div>
                    </Grid>
                  </Grid>
                  <Paper style={{ backgroundColor: color, padding: "15px" }}>
                    <Grid container direction="column" alignItems="stretch">
                      <Grid item>
                        <div>
                          <Grid container spacing={2} alignItems="center" justify="center">
                            <Grid item xs={12} lg={8}>
                              <TextField
                                style={{ backgroundColor: "white", borderRadius: "20px", outline: "none" }}
                                variant="outlined"
                                margin="none"
                                required
                                fullWidth
                                id="userInput"
                                label="Email Address"
                                name="email"
                                type="string"
                                autoComplete="off"
                              />
                            </Grid>
                            <Grid item xs={4} lg={2}>
                              <Button style={{backgroundColor: "white", width: "100%", height: "100%"}}>MainTag</Button>
                            </Grid>
                            <Grid item xs={4} lg={2}>
                              <Button style={{backgroundColor: "white", width: "100%", height: "100%"}}>SubTag</Button>
                            </Grid>
                          </Grid>
                        </div>
                      </Grid>
                      <Grid item>
                        <TextField
                          style={{ backgroundColor: "white" }}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="userInput"
                          label="Email Address"
                          name="email"
                          type="string"
                          rows={8}
                          multiline
                          autoComplete="off"
                        />
                      </Grid>
                      <Grid item>
                        <Paper variant="outlined" style={{borderRadius: "20px", paddingLeft: "5px"}}>
                          <Grid container alignItems="center">
                            <Grid item xs={1}>
                              <Typography align="center">
                                Selected Tag :
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid container justify="flex-end" spacing={2}>
                        <Grid item xs={5} md={3} lg={2}>
                          <Button style={{backgroundColor: "white", width: "100%", height: "100%", borderRadius: "20px"}}>Clear</Button>
                        </Grid>
                        <Grid item xs={5} md={3} lg={2}>
                          <Button style={{backgroundColor: "white", width: "100%", height: "100%", borderRadius: "20px"}}>Post</Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
