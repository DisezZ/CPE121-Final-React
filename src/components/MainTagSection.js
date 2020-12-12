import React from 'react'
import { mainTag } from "../tags.json"
import MainTagButton from "./MainTagButton"
import {
  Grid, Paper, Button
} from "@material-ui/core"
import Main from '../page/Main';

export default class MainTagSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { mainTagList } = this.props
    return (
      <Grid container spacing={2}>
        {
          mainTagList.map((tag, index) => {
            console.log(tag)
            const color = tag === false?"blue":"pink"
            return (
              <MainTagButton
                {...this.props}
                index={index}
                key={index}
              >
                {mainTag[index]}
              </MainTagButton>
            )
          })
        }
      </Grid>
    )
  }
}