import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Axios from "axios";
import Cookie from "js-cookie";
import { BaseURL } from "./defaults.json";
import PostsList from "./components/PostsList";
import Welcome from "./page/Welcome";
import Submit from "./page/Submit";
import Redirect from "./components/Redirect";
import LoadingPage from "./components/LoadingPage";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Main from "./page/Main";
import Post from "./page/Post";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInStatus: undefined,
      userInfo: null,
    };
  }

  componentDidMount() {
    this.handleAuthCheck();
  }

  handleAuthCheck = async () => {
    const token = Cookie.get("token");
    //console.log(token)
    if (token) {
      await Axios.post(BaseURL + "/auth", { token: token }).then((res) => {
        if (res.data.error) {
          this.setState({ loggedInStatus: false });
        } else {
          this.setState({
            loggedInStatus: true,
            userInfo: res.data.userInfo,
          });
        }
      });
    } else {
      return this.setState({ loggedInStatus: false });
    }
  };

  handleAuth = (props) => {
    return (
      <div>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Main {...props} userInfo={this.state.userInfo}></Main>
              )}
            ></Route>
            <Route
              exact
              path="/login"
              render={(props) => <Redirect path="/" {...props}></Redirect>}
            ></Route>
            <Route
              exact
              path="/signup"
              render={(props) => <Redirect path="/" {...props}></Redirect>}
            ></Route>
            <Route
              exact
              path="/submit"
              render={(props) => (
                <Submit {...props} userInfo={this.state.userInfo}></Submit>
              )}
            ></Route>
            <Route exact path="/user/:username">
              <div>user</div>
            </Route>
            <Route
              exact
              path="/user/:username/post/:id"
              render={(props) => (
                <Post {...props} userInfo={this.state.userInfo}></Post>
              )}
            ></Route>
          </Switch>
        </Router>
      </div>
    );
  };

  handleUnAuth = (props) => {
    return (
      <div>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <Welcome {...props}></Welcome>}
            ></Route>
            <Route
              exact
              path="/login"
              render={(props) => <Login {...props}></Login>}
            ></Route>
            <Route
              exact
              path="/signup"
              render={(props) => <Signup {...props}></Signup>}
            >
            </Route>
            <Route
                exact
                path="/submit"
                render={(props) => <div>Not Submit</div>}
              ></Route>
            <Route exact path="/user/:username">
              <div>user</div>
            </Route>
            <Route exact path="/user/:username/post/:id">
              <div>user post</div>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  };

  render() {
    var rendered;
    if (this.state.loggedInStatus) {
      rendered = this.handleAuth();
    } else if (this.state.loggedInStatus === false) {
      rendered = this.handleUnAuth();
    } else if (this.state.loggedInStatus == undefined) {
      rendered = <LoadingPage></LoadingPage>;
    }
    return rendered;
  }
}

export default App;
