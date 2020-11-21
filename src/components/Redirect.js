import React from 'react'

export default class Redirect extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        this.props.history.push(this.props.path)
        return (
            <div>
                Loading
            </div>
        ) 
    }
}