import React from "react";
import { Typography, Grid, Button, TextField, Paper } from "@material-ui/core";
import { Members } from "../defaults.json";

export default class AboutUs extends React.Component {
  renderMembers = (member) => {
    return Members.map((member, index) => {
      const works = member.works.map((work) => {
        return <Typography style={{ color: "white" }}>{`--- ${work}`}</Typography>;
      });
      return (
        <div>
          <Typography variant="h6" style={{ fontWeight: "bolder", color: "white" }}>{`#${
            index + 1
          }`}</Typography>
          <Typography style={{ color: "white" }}>{`Name: ${member.firstName} ${member.lastName}`}</Typography>
          <Typography style={{ color: "white" }}>Duties :</Typography>
          {works}
        </div>
      );
    });
  };
  render() {
    const renderedMember = this.renderMembers();
    return (
      <div>
        <Grid container direction="column">
          <Grid item>
            <div>
              <Grid container justify="center" style={{ paddingTop: "10vh" }}>
                <Grid item xs={10}>
                  <div>
                    <Grid container direction="column">
                      <Grid item>
                        <div>
                          <Grid container justify="center">
                            <Grid item>
                              <Paper
                                style={{
                                  padding: "20px",
                                  borderRadius: "40px",
                                  backgroundColor: "rgba(128 , 168, 217, 0.6)",
                                }}
                              >
                                <Typography
                                  variant="h5"
                                  style={{
                                    textAlign: "center",
                                    color: "white",
                                  }}
                                >
                                  Team Members :
                                </Typography>
                              </Paper>
                            </Grid>
                          </Grid>
                        </div>
                      </Grid>
                      <Grid item>
                        <div>
                          <Grid container justify="flex-start">
                            <Grid item>
                              <Paper
                                style={{
                                  padding: "20px",
                                  borderRadius: "40px",
                                  width: "30vw",
                                  backgroundColor: "rgba(128 , 168, 217, 0.6)",
                                }}
                              >
                                <Typography
                                  style={{ color: "white" }}
                                >
                                  Teacher Assistant :
                                </Typography>
                                <Typography
                                  style={{ color: "white" }}
                                >
                                  Name: Taninnuch Lamjiak (P’Sai)
                                </Typography>
                              </Paper>
                            </Grid>
                          </Grid>
                        </div>
                      </Grid>
                      <Grid item>
                        <div>
                          <Grid container justify="flex-end">
                            <Grid item>
                              <Paper
                                style={{
                                  padding: "20px",
                                  borderRadius: "40px",
                                  width: "30vw",
                                  backgroundColor: "rgba(128 , 168, 217, 0.6)",
                                }}
                              >
                                {renderedMember[0]}
                              </Paper>
                            </Grid>
                          </Grid>
                        </div>
                      </Grid>
                      <Grid item>
                        <div>
                          <Grid container justify="flex-start">
                            <Grid item>
                              <Paper
                                style={{
                                  padding: "20px",
                                  borderRadius: "40px",
                                  width: "30vw",
                                  backgroundColor: "rgba(128 , 168, 217, 0.6)",
                                }}
                              >
                                {renderedMember[1]}
                              </Paper>
                            </Grid>
                          </Grid>
                        </div>
                      </Grid>
                      <Grid item>
                        <div>
                          <Grid container justify="flex-end">
                            <Grid item>
                              <Paper
                                style={{
                                  padding: "20px",
                                  borderRadius: "40px",
                                  width: "30vw",
                                  backgroundColor: "rgba(128 , 168, 217, 0.6)",
                                }}
                              >
                                {renderedMember[2]}
                              </Paper>
                            </Grid>
                          </Grid>
                        </div>
                      </Grid>
                      <Grid item>
                        <div>
                          <Grid container justify="flex-start">
                            <Grid item>
                              <Paper
                                style={{
                                  padding: "20px",
                                  paddingBottom: 0,
                                  borderRadius: "40px",
                                  width: "30vw",
                                  backgroundColor: "rgba(128 , 168, 217, 0.6)",
                                }}
                              >
                                {renderedMember[3]}
                              </Paper>
                            </Grid>
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
      </div>
    );
  }
}
