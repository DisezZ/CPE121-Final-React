import React from "react";
import AppBar from "../components/AppBar";
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
                    spacing="2"
                    alignItems="center"
                    justify="space-between"
                  >
                    <Grid item>
                      <Typography component="h1" variant="h5">
                        Created Post :
                      </Typography>
                    </Grid>
                    <Grid item>
                      <div>
                        <Grid container alignItems="center">
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
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs={8}>
                              <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="userInput"
                                label="Email Address"
                                name="email"
                                type="string"
                                autoComplete="off"
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <Button>MainTag</Button>
                            </Grid>
                            <Grid item xs={2}>
                              <Button>SubTag</Button>
                            </Grid>
                          </Grid>
                        </div>
                      </Grid>
                      <Grid item>
                        <TextField
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
                        <Paper></Paper>
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
