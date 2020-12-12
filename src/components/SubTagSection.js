import React from "react";
import { subTag } from "../tags.json";
import MainTagButton from "./MainTagButton";
import SubTagButton from "./SubTagButton";
import SubTagCheckBox from "./SubTagCheckBox";
import { Grid, Hidden, Typography, Paper, TextField } from "@material-ui/core";
import { indigo, grey } from "@material-ui/core/colors";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSearch = () => {
    const { subTagList, search } = this.props;
    var filteredIndex = [];
    const filtered = subTag.filter((tag, index) => {
      return tag.toLowerCase().includes(search.toLowerCase());
    });
    subTag.forEach((tag, index) => {
      var check = -1;
      filtered.forEach((filter) => {
        if (tag === filter) {
          check = index;
        }
      });
      if (check > -1) {
        filteredIndex.push(1);
      } else {
        filteredIndex.push(0);
      }
    });
    return filteredIndex.map((i, index) => {
      if (i === 1) {
        return (
          <SubTagCheckBox {...this.props} index={index}>
            {subTag[index]}
          </SubTagCheckBox>
        );
      }
    });
  };

  handleUnSearch = () => {
    const { subTagList, search } = this.props;
    return subTagList.map((tag, index) => {
      if (tag === true) {
        return (
          <SubTagButton {...this.props} index={index} key={index}>
            {subTag[index]}
          </SubTagButton>
        );
      }
    });
  };

  render() {
    var render;
    if (this.props.search === "") {
      render = (
        <Grid container justify="center" spacing={1}>
          {this.handleUnSearch()}
        </Grid>
      );
    } else {
      render = (
        <Paper style={{ overflow: "auto", maxHeight: "30vh" }}>
          {this.handleSearch()}
        </Paper>
      );
    }
    return render;
  }
}
{
  /*const { subTagList } = this.props;
    return (
      <Grid container justify="center">
        {subTagList.map((tag, index) => {
          console.log(tag);
          const color = tag === false ? "blue" : "pink";
          if (this.props.search === "") {
            return (
              <SubTagButton {...this.props} index={index} key={index}>
                {subTag[index]}
              </SubTagButton>
            );
          } else {
            return (
              <SubTagCheckBox {...this.props} index={index} key={index}>
                {subTag[index]}
              </SubTagCheckBox>
            );
          }
        })}
      </Grid>
    ); */
}
