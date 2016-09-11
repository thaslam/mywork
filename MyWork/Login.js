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
			<View style={styles.container}>
				<Text style={styles.header}>Hello World</Text>
				<TextInput style={styles.input} placeholder="Username" />
				<TextInput style={styles.input} placeholder="Token Password" />
			</View>
		);
	}
};

var styles = StyleSheet.create({
	container: {
		backgroundColor: '#F5FCFF',
		flex: 1,
		paddingTop: 40,
		alignItems: 'center',
		padding: 4
	},
	logo: {
		width: 66,
		height: 55
	},
	header: {
		fontSize: 30,
		marginTop: 10
	},
	input: {
		height: 50,
		marginTop: 10,
		padding: 4
	}
});

export default Login;
//module.exports = Login;