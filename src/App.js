import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { connect } from 'react-redux'
import Login from './components/login/login'
import './App.scss';
import DashBoard from './components/dashboard/dashboard'
/**
 * App client Library
 */
class App extends React.Component {
  /**
   * 
   * @param {*} e 
   */
  logout(e) {
    this.props.dispatch({ type: "onLoginSuccess", target: false })
    if (this.props.history)
      this.props.history.push('/');
  }
  componentDidMount() {
    this.getData("http://localhost:4000/candidates", "Candidates")
    this.getData("http://localhost:4000/applications", "Application")
    this.getData("http://localhost:4000/questions", "Question")
  }
  getData = (url, str) => {
    let data = []
    fetch(url, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

    })
      .then(res => {

        return res.json()
      })
      .then((response, error) => {
        data = response
        console.log(response)
        this.props.dispatch({ type: str, target: response })
      })
      .catch(error => {
        console.log("Something went wrong " + error);
      });



  }
  render() {


    return (
      <div className="App">
        <header className="App-header">
          <div><h3>Job Application App</h3></div>
          {Boolean(this.props.isLoginSuccess) ? <div className="logout-navigation-link" onClick={e => this.logout()}>Logout</div> : null}
        </header>
        <Router >
          <Switch>
            <Route exact path="/" strict component={Login} />
            <Route path="/dashboard" render={() => <DashBoard />}></Route>,
          </Switch>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoginSuccess: state.isLoginSuccess,
  }
}

export default connect(mapStateToProps)(App);
