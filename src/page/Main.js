import React from 'react'
import Cookie from 'js-cookie'
import PostList from '../components/PostsList'
import PostForm from '../components/PostForm'
import AppBar from '../components/AppBar'
import {
    Button
} from '@material-ui/core'

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <AppBar></AppBar>
                <PostList></PostList>
            </div>
        )
    }
}