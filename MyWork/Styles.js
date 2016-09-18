'use strict';

import React, { StyleSheet } from 'react-native';

// TODO: I wonder if there is a way to extend StyleSheet class instead,
// similiar to how component is extended for views
var Styles = StyleSheet.create({
	container: {
		backgroundColor: '#F5FCFF',
		flex: 1,
		paddingTop: 20,
		alignItems: 'center',
		padding: 4
	},
	logo: {
    width: 100
	},
	header: {
		paddingTop: 0,
		fontSize: 16,
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
		alignSelf: 'center',
		marginTop: 10,
		justifyContent: 'center',
    borderRadius: 3,
    paddingLeft: 40,
    paddingRight: 40,
    bottom: 0
	},
	buttonText: {
		fontSize: 22,
		color: '#FFF',
		alignSelf: 'center'
	},
  projectList: {
    alignSelf: 'stretch',
    paddingTop: 20
  },
  taskList: {
    alignSelf: 'stretch',
    paddingTop: 0
  },
  row: {
    padding: 10,
    alignSelf: 'center',
  },
  taskRow: {
    padding: 10,
    flexDirection: 'row'
  },
  taskSection: {
    flexDirection: 'row',
    backgroundColor: '#dbeaf9',
    padding: 5
  },
  sectionRowText: {
    color: '#004a8b',
    flex: 1, 
    flexDirection: 'column',
    fontWeight: 'bold',
    fontFamily: 'ChalkboardSE-Light'
  },
  rowText: {
    color: '#004a8b',
    flex: 1, 
    flexDirection: 'column'
  },
  taskRowText: {
    color: '#555',
    flex: 1, 
    flexDirection: 'column',
    paddingLeft: 5,
    fontFamily: 'ChalkboardSE-Light'
  },
  activeCircle: {
    width: 12,
    height: 12,
    borderRadius: 100/2,
    backgroundColor: 'green',
    flexDirection: 'column',
  },
  inactiveCircle: {
    width: 12,
    height: 12,
    borderRadius: 100/2,
    backgroundColor: 'grey',
    flexDirection: 'column',
  }
});

export default Styles;