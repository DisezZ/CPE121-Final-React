import React from "react";
import {
  CardContent,
  Collapse,
  Typography,
  TextField,
  Button,
  Grid,
  Divider
} from "@material-ui/core";

export default class CommentCollapse extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSendButton

  render() {
    const { status } = this.props;
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
          />
          <Grid container direction="row-reverse" spacing='3' style={{marginTop:'10px'}}>
            <Grid item>
              <Button variant="contained" color="primary">
                Send
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary">
                Cancel
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    );
  }
}
