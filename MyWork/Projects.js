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
import Styles from './Styles';
import Data from './VstsDataService';

class Projects extends Component {
  constructor(props) {
    super(props);

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
      <View style={Styles.container}>
        <Image style={Styles.logo} resizeMode={Image.resizeMode.contain} source={require('image!selectivelogo')} />
        <Text style={Styles.header}>My Projects</Text>
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
          <View style={Styles.row}>
            <Text style={Styles.rowText}>{rowData.name}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  pressRow(rowData, sectionID, rowID) {
    if (this.props.onProjectSelected)
			this.props.onProjectSelected(rowData);
    /*
    this._pressData[rowID] = !this._pressData[rowID];
    this.setState({dataSource: this.state.dataSource.cloneWithRows(
      this._genRows(this._pressData)
    )});
    */
  }
};

export default Projects;