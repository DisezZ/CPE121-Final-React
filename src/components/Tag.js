import React from 'react'
import {
    Button
} from '@material-ui/core'

export default class Tag extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            status: false
        }
    }

    handleTagClick = () => {
        this.setState({
            status : !this.state.status
        })
    }

    render() {
        if (this.state.status) {
            return (
                <Button variant='contained' color='secondary' onClick={this.handleTagClick} style={{textTransform: "none"}}>
                    {this.props.tag}
                </Button>
            )
        } else {
            return (
                <Button variant='contained' color='primary' onClick={this.handleTagClick} style={{textTransform: "none"}}>
                    {this.props.tag}
                </Button>
            )
        }
    }
}