'use strict';

//var React = require('react-native');

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight
} from 'react-native';
import Styles from './Styles';
import Data from './DataService';

/*
reference, eventually will need to build http requests
curl -u {username}:{token} https://music-pilot.visualstudio.com/DefaultCollection/_apis/projects/api-version=2.0 
*/
class Login extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<View style={Styles.container}>
				<Image style={Styles.logo} source={require('image!selectivelogo')} />
				<Text style={Styles.header}>Your Work</Text>
				<TextInput style={Styles.input} placeholder="Username" />
				<TextInput style={Styles.input} placeholder="Token Password" />
				<TouchableHighlight onPress={this.onLoginPressed.bind(this)} style={Styles.button}>
					<Text style={Styles.buttonText}>Log In</Text>
				</TouchableHighlight>
		</View>
		);
	}
	onLoginPressed() {
    alert(Data);
  }
};

export default Login;
//module.exports = Login;