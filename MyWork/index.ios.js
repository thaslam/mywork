/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Login from './Login';
import Projects from './Projects';

//var Login = require('./Login');

class MyWork extends Component {
  constructor(props) {
		super(props);
    this.state = {loggedIn: false};
	}
  render() {
    if (this.state.loggedIn) {
      return (<Projects />);
    }
    return (
      <Login onLogin={this.onLogin.bind(this)} />
    );
  }
  onLogin() {
    this.setState({loggedIn: true});
  }
}

/*
<View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('MyWork', () => MyWork);
