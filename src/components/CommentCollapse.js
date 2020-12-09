import React from "react";
import Axios from 'axios'
import Cookie from 'js-cookie'
import { BaseURL } from '../defaults.json'
import {
  CardContent,
  Collapse,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";

export default class CommentCollapse extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      anonymous: false,
      content: null
    }
  }

  handleAnonymousCheckBoxClick = () => {
    this.setState({
      anonymous: !this.state.anonymous
    })
  };

  onTypeComment = (event) => {
    //console.log(event.target.value)
    this.setState({
      content: event.target.value
    })
  }

  handleSendButtonClick = () => {
    const token = Cookie.get("token")
    const data = {
      token: token,
      to: this.props.to,
      content: this.state.content,
      anonymous: this.state.anonymous
    }
    console.log(document.getElementById("comment").value)
    Axios.post(BaseURL + '/comment', data).then((res) => {
      console.log(res)
    })
  }

  handleCancelButtonClick = () => {
    this.props.cancle()
  }

  render() {
    const { status, to } = this.props;
    return (
      <Collapse in={status}>
        <Divider />
        <CardContent>
          <Typography>Comment</Typography>
          <TextField
            id="comment"
            label="Comment here..."
            variant="filled"
            multiline
            fullWidth
            onChange={this.onTypeComment}
          />
          <Grid
            container
            direction="row-reverse"
            spacing={3}
            style={{ marginTop: "10px" }}
          >
            <Grid item>
              <Button variant="contained" color="primary" onClick={this.handleSendButtonClick}>
                Send
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={this.handleCancelButtonClick}>
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.anonymous}
                    onChange={this.handleAnonymousCheckBoxClick}
                    name="checkedAnonymous"
                    color="primary"
                  />
                }
                label="Anonymous"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    );
  }
}
