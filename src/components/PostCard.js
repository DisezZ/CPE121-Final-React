import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Button, CardActionArea, Container } from "@material-ui/core";
import ModeCommentIcon from "@material-ui/icons/ModeComment";
import Link from "@material-ui/core/Link";

export default class PostCard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { post } = this.props
        const monthName = [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC",
          ];
          const dateCreated = `${post.dateCreated.getDate()} ${
            monthName[post.dateCreated.getMonth()]
          } ${post.dateCreated.getFullYear()}`;
        return (
            <div></div>
        )   
    }
}