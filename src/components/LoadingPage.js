import React from 'react'
import {
    Backdrop,
    CircularProgress
} from "@material-ui/core"

export default class LoadingPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Backdrop open={1}>
                <CircularProgress></CircularProgress>
            </Backdrop>
        )
    }
}