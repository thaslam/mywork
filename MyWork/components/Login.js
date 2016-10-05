'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
	ActivityIndicator
} from 'react-native';
import BaseStyles from '../styles/BaseStyles';
import VstsDataService from '../data/VstsDataService';
import CredentialStore from '../data/CredentialStore';

class Login extends Component {
	constructor(props) {
		super(props);
		styles = Object.assign(styles, BaseStyles);
		this.state = { domain: '', username: '', password: '', showActivity: false };
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
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<Text style={styles.header}>My Work</Text>
				</View>
				<View style={styles.bodyContainer}>
					<Image style={styles.logo} resizeMode={Image.resizeMode.contain} source={require('../images/selectivelogo.png')} />
					<TextInput onChangeText={(text)=> this.setState({domain:text})} style={styles.input} placeholder="Domain" value={this.state.domain} />
					<TextInput onChangeText={(text)=> this.setState({username:text})} style={styles.input} placeholder="Username" value={this.state.username} />
					<TextInput onChangeText={(text)=> this.setState({password:text})} style={styles.input} placeholder="Token Password" secureTextEntry={true} value={this.state.password} />
					<TouchableHighlight onPress={this.onLoginPressed.bind(this)} style={styles.button}>
						<Text style={styles.buttonText}>Log In</Text>
					</TouchableHighlight>
					<ActivityIndicator animating={this.state.showActivity} size="large" style={styles.loader} />
				</View>
		</View>
		);
	}
	onLoginPressed() {
		if (this.state.showActivity) return;

		var creds = {
			domain: this.state.domain, 
			username: this.state.username, 
			password: this.state.password 
		};
		this.setState({showActivity: true});
		var data = new VstsDataService(creds);
		data.checkAccess((data, err) => {
			this.setState({showActivity: false});
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

var styles = StyleSheet.create({
	input: {
		height: 50,
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: 10,
		padding: 4,
    marginLeft: 10,
    marginRight: 10,
    borderColor: '#729bc7',
    borderWidth: StyleSheet.hairlineWidth
	},
	button: {
		height: 50,
		backgroundColor: '#004a8b',
		alignSelf: 'center',
		marginTop: 100,
		justifyContent: 'center',
    borderRadius: 3,
    paddingLeft: 40,
    paddingRight: 40,
    bottom: 0
	},
	buttonText: {
		fontSize: 22,
		color: '#FFF',
		alignSelf: 'center',
	}
});

export default Login;