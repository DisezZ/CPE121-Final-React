import React from 'react'
import Cookie from 'js-cookie'
import PostList from '../components/PostsList'
import PostForm from '../components/PostForm'
import {
    Button
} from '@material-ui/core'

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    onLogoutButtonPressed = async () => {
        await Cookie.remove('token')
        window.location.reload()
    }

    render() {
        return (
            <div>
                <Button variant='contained' onClick={this.onLogoutButtonPressed} >
                    Log out
                </Button>
                <PostForm></PostForm>
                <PostList></PostList>
            </div>
        )
    }
}