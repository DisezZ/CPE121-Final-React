import React from "react";
import {
  Grid,
  Avatar,
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Card,
  CardHeader,
} from "@material-ui/core";
import indigo from "@material-ui/core/colors/indigo";

export default class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const color = indigo[300];
    return (
      <div>
        <Container>
          <Grid container justify="center">
            <Grid item>
              <Card
                style={{
                  maxWidth: "90vh",
                  width: "200px",
                  marginTop: "10px",
                  minWidth: "200px",
                  backgroundColor: color,
                }}
              >
                <CardHeader avatar={<Avatar></Avatar>}></CardHeader>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                ></TextField>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}
