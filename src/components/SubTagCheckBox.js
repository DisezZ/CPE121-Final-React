import React from "react";
import { subTag } from "../tags.json";
import { Grid, Paper, FormControlLabel, Checkbox } from "@material-ui/core";
import { blue, indigo, grey } from "@material-ui/core/colors";

export default class SubTagSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleCheckBoxClick = () => {
    const { index } = this.props;
    this.props.handleSubTagStatus(index);
    this.props.handleSearchToBlank()
    document.getElementById("subTagSearched").value = ""
  };

  render() {
    const { key, index, children } = this.props;
    const status = this.props.subTagList[index]
    const color = status? indigo[300] : blue[100];
    return (
      <Grid item xs={8}>
        <FormControlLabel
          control={
            <Checkbox
              checked={status}
              onChange={this.handleCheckBoxClick}
              name={`checked${index}`}
            />
          }
          label={children}
        />
      </Grid>
    );
  }
}
