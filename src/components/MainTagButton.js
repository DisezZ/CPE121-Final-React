import React from "react";
import { mainTag } from "../tags.json";
import { Grid, Paper, Button, Typography } from "@material-ui/core";
import { blue, indigo, grey } from "@material-ui/core/colors";

export default class MainTagSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //status: false
    };
  }

  handleButtonClick = () => {
    const { index } = this.props;
    this.props.handleMainTagStatus(index);
  };

  render() {
    const { key, index, children } = this.props;
    const color =
      this.props.mainTagList[index] === false ? blue[100] : indigo[300];
    return (
      <Grid item xs={6}>
        <Button
          key={key}
          onClick={this.handleButtonClick}
          style={{ backgroundColor: `${color}`, borderRadius: "20px", width: "100%", textTransform: "none" }}
        >
          <Typography>{children}</Typography>
        </Button>
      </Grid>
    );
  }
}
