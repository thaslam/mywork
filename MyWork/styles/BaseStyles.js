'use strict';

import React, { StyleSheet } from 'react-native';

var BaseStyles = StyleSheet.create({
	container: {
		backgroundColor: '#729bc7',
		flex: 1,
		paddingTop: 20,
		alignItems: 'center',
		padding: 0
	},
	logo: {
    width: 120,
    height: 50,
    marginTop: 50,
    alignSelf: 'center'
	},
	header: {
		paddingTop: 0,
		fontSize: 16,
		color: '#ffffff',
    alignSelf: 'center',
    paddingBottom: 4
	},
  headerContainer: {
    alignSelf: 'stretch',
    paddingTop: 10,
  },
  bodyContainer: {
    flex: 1,
    alignSelf: 'stretch',
    paddingTop: 10,
    backgroundColor: '#F5FCFF'
  },
  loader: {
  }
});

export default BaseStyles;