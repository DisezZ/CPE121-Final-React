import React from 'react'
import { mainTag, subTag }  from '../tags.json'
import Tag from './Tag'
import {
    Grid
} from '@material-ui/core'

export default class TagsList extends React.Component {
    constructor(props) {
        super(props)
        this.state ={}
    }

    render() {
        return (
            <Grid item>
                {
                    mainTag.map((data, i) => {
                        return <Tag key={i} tag={data} />
                    })
                }
            </Grid>
        )
    }
}