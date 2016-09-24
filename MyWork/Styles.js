'use strict';

import React, { StyleSheet } from 'react-native';

// TODO: I wonder if there is a way to extend StyleSheet class instead,
// similiar to how component is extended for views
var Styles = StyleSheet.create({
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
    //fontFamily: 'Thonburi',
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
	},
  projectList: {
    alignSelf: 'stretch',
    paddingTop: 20
  },
  taskList: {
    flex: 1,
    alignSelf: 'stretch',
    paddingTop: 0
  },
  row: {
    padding: 10,
    alignSelf: 'center',
  },
  taskRow: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#F5FCFF'
  },
  taskSection: {
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
    padding: 5,
    paddingTop: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  taskSectionText: {
    color: '#004a8b',
    flex: 1, 
    flexDirection: 'column',
    //fontFamily: 'Thonburi',
    fontSize: 16
  },
  rowText: {
    color: '#004a8b',
    flex: 1, 
    flexDirection: 'column',
  },
  taskRowText: {
    color: '#555',
    flex: 1, 
    flexDirection: 'column',
    paddingLeft: 5,
  },
  taskRowDoneButton: {
    backgroundColor: '#57AA7D'
  },
  activeCircle: {
    width: 12,
    height: 12,
    borderRadius: 100/2,
    backgroundColor: '#9ECE08',
    flexDirection: 'column',
    marginTop: 5
  },
  inactiveCircle: {
    width: 12,
    height: 12,
    borderRadius: 100/2,
    backgroundColor: '#bbb',
    flexDirection: 'column',
    marginTop: 5
  },
  loader: {
  }
});

export default Styles;