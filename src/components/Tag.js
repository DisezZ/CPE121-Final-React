import React from "react";
import { Button, Grid } from "@material-ui/core";

export default class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
    };
  }

  handleTagClick = () => {
    this.setState({
      status: !this.state.status,
    });
  };

  render() {
    if (this.state.status) {
      return (
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleTagClick}
            style={{
              width: "100%",
              borderRadius: "20px",
              textTransform: "none",
            }}
          >
            {this.props.tag}
          </Button>
        </Grid>
      );
    } else {
      return (
        <Grid item xs={6}>
          <Button
            variant="contained"
            onClick={this.handleTagClick}
            style={{
              backgroundColor: "white",
              width: "100%",
              borderRadius: "20px",
              textTransform: "none",
            }}
          >
            {this.props.tag}
          </Button>
        </Grid>
      );
    }
  }
}
