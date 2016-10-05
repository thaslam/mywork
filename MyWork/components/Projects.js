'use strict';

import React, { Component } from 'react';
import { 
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';
import BaseStyles from '../styles/BaseStyles';
import Data from '../data/VstsDataService';

class Projects extends Component {
  constructor(props) {
    super(props);
    styles = Object.assign(styles, BaseStyles);
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 != row2});
    this.state = {dataSource: ds.cloneWithRows([])};
  }
  componentDidMount() {
    this.fetchProjects();
  }
  fetchProjects() {
    Data.getProjects((data, err) => {
        this.setState({dataSource: this.state.dataSource.cloneWithRows(data.value)});
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} resizeMode={Image.resizeMode.contain} source={require('image!selectivelogo')} />
        <Text style={styles.header}>My Projects</Text>
        <ListView style={Styles.projectList}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} 
          enableEmptySections
        />
      </View>
    );
  }
  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight underlayColor='#dbeaf9' onPress={this.pressRow.bind(this)}>
        <View>
          <View style={styles.row}>
            <Text style={styles.rowText}>{rowData.name}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  pressRow(rowData, sectionID, rowID) {
    if (this.props.onProjectSelected)
			this.props.onProjectSelected(rowData);
  }
};

var styles = StyleSheet.create({
  projectList: {
    alignSelf: 'stretch',
    paddingTop: 20
  },
  row: {
    padding: 10,
    alignSelf: 'center',
  },
  rowText: {
    color: '#004a8b',
    flex: 1, 
    flexDirection: 'column',
  }
});

export default Projects;