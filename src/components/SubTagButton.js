import React from "react";
import { subTag } from "../tags.json";
import { Grid, Paper, Button, Typography } from "@material-ui/core";
import { blue, indigo, grey } from "@material-ui/core/colors";

export default class SubTagSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleButtonClick = () => {
    const { index } = this.props;
    this.props.handleSubTagStatus(index);
  };

  render() {
    const { key, index, children } = this.props;
    const status = this.props.subTagList[index]
    const color = status? indigo[300] : blue[100];
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
