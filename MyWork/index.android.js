/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';

import Login from './components/Login';
import Projects from './components/Projects';
import Tasks from './components/Tasks';

class MyWork extends Component {
  constructor(props) {
		super(props);
    this.state = {loggedIn: false, project: null};
	}
  render() {
    if (this.state.loggedIn) {
      return (<Tasks />);
    }
    return (
      <Login onLogin={this.onLogin.bind(this)} />
    );
  }
  onLogin() {
    this.setState({loggedIn: true});
  }
}

AppRegistry.registerComponent('MyWork', () => MyWork);
