'use strict';

import React, { StyleSheet } from 'react-native';

// TODO: I wonder if there is a way to extend StyleSheet class instead,
// similiar to how component is extended for views
var Styles = StyleSheet.create({
	container: {
		backgroundColor: '#F5FCFF',
		flex: 1,
		paddingTop: 40,
		alignItems: 'center',
		padding: 4
	},
	logo: {
	},
	header: {
		paddingTop: 16,
		fontSize: 24,
		marginTop: 10,
		color: '#004a8b'
	},
	input: {
		height: 50,
		marginTop: 10,
		padding: 4
	},
	button: {
		height: 50,
		backgroundColor: '#004a8b',
		alignSelf: 'stretch',
		marginTop: 10,
		justifyContent: 'center'
	},
	buttonText: {
		fontSize: 22,
		color: '#FFF',
		alignSelf: 'center'
	}
});

export default Styles;