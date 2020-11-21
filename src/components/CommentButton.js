import React from "react";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Collapse from '@material-ui/core/Collapse'
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"

export default class CommentButton extends React.Component {
  constructor(props) {
    super(props);
  }
  
  handleClick = async () => {
    this.props.handleCommentClick()
  }

  handleIconColor = () => {
    const { status } = this.props;
    if (status) {
      return (
        <Tooltip title="comment">
          <Button onClick={this.handleClick}>
            <ModeCommentIcon style={{ color: "orange" }} />
          </Button>
        </Tooltip>
      );
    } else {
        return (
            <Tooltip title="comment">
              <Button onClick={this.handleClick}>
                <ModeCommentIcon style={{ color: "black" }} />
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
