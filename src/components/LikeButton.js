import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

export default class LikeButton extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = async () => {
    await this.props.handleFavoriteClick();
  };

  handleIconColor = () => {
    const { status } = this.props;
    if (status) {
      return (
        <Tooltip title="favorite">
          <Button onClick={this.handleClick}>
            <FavoriteIcon style={{ color: "orange" }} />
          </Button>
        </Tooltip>
      );
    } else {
        return (
            <Tooltip title="favorite">
              <Button onClick={this.handleClick}>
                <FavoriteIcon style={{ color: "black" }} />
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

/*<Tooltip title="favorite">
          <Button onClick={this.handleClick}>{children}</Button>
        </Tooltip>*/
