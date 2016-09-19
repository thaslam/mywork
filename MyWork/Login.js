'use strict';

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
import VstsDataService from './VstsDataService';
import CredentialStore from './CredentialStore';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { domain: '', username: '', password: '' };
	}

	async componentDidMount() {
		var creds = await CredentialStore.getCreds();
		if (!creds) return;

		this.state.domain = creds.domain;
		this.state.username = creds.username;
		this.state.password = creds.password;
		this.forceUpdate();
	}
	render() {
		return (
			<View style={Styles.container}>
				<View style={Styles.headerContainer}>
					<Text style={Styles.header}>My Work</Text>
				</View>
				<View style={Styles.bodyContainer}>
					<Image style={Styles.logo} resizeMode={Image.resizeMode.contain} source={require('image!selectivelogo')} />
					<TextInput onChangeText={(text)=> this.setState({domain:text})} style={Styles.input} placeholder="Domain" value={this.state.domain} />
					<TextInput onChangeText={(text)=> this.setState({username:text})} style={Styles.input} placeholder="Username" value={this.state.username} />
					<TextInput onChangeText={(text)=> this.setState({password:text})} style={Styles.input} placeholder="Token Password" secureTextEntry={true} value={this.state.password} />
					<TouchableHighlight onPress={this.onLoginPressed.bind(this)} style={Styles.button}>
						<Text style={Styles.buttonText}>Log In</Text>
					</TouchableHighlight>
				</View>
		</View>
		);
	}
	onLoginPressed() {
		var creds = {
			domain: this.state.domain, 
			username: this.state.username, 
			password: this.state.password 
		};
		var data = new VstsDataService(creds);
		data.checkAccess((data, err) => {
			// notify any subscribers to onLogin
			if (!err) {
				// store the values captured so they don't need to be keyed in again'
				CredentialStore.setCreds(creds);
				if (this.props.onLogin) this.props.onLogin();
			}
			else
				alert(err);
    });
  }
};

export default Login;
//module.exports = Login;