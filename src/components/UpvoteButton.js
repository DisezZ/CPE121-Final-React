import React from "react";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

export default class UpvoteButton extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = async () => {
      await this.props.handleUpvoteClick()
  }

  handleIconColor = () => {
    const { status } = this.props;
    if (status) {
      return (
        <Tooltip title="upvote">
          <Button onClick={this.handleClick}>
            <ArrowUpwardIcon style={{ color: "orange" }} />
          </Button>
        </Tooltip>
      );
    } else {
        return (
            <Tooltip title="upvote">
              <Button onClick={this.handleClick}>
                <ArrowUpwardIcon style={{ color: "black" }} />
              </Button>
            </Tooltip>
          );
    }
  };

  render() {
    const { children } = this.props;
    return (
      <div>
        {this.handleIconColor()}
      </div>
    );
  }
}
