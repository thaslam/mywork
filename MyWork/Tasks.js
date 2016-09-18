'use strict';

import React, { Component } from 'react';
import { 
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  ListView,
  TouchableHighlight,
  PanResponder
} from 'react-native';

import Styles from './Styles';
import Data from './DataService';

class Tasks extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 != row2});
    this.state = {dataSource: ds.cloneWithRows([])};
  }
  componentDidMount() {
    this.fetchTasks();
  }
  fetchTasks() {
    // TODO: Wire to selected project
    Data.getTasks("Agency Dashboard", (data) => {
        this.setState({dataSource: this.state.dataSource.cloneWithRows(data.value)});
    });
  }
  render() {
    return (
      <View style={Styles.container}>
        <Image style={Styles.logo} resizeMode={Image.resizeMode.contain} source={require('image!selectivelogo')} />
        <Text style={Styles.header}>My Tasks</Text>
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
      <View>
        <View style={Styles.row}>
          <Text style={Styles.rowText}>{rowData.fields["System.Title"]}</Text>
        </View>
      </View>
    );
  }
  pressRow(rowData, sectionID, rowID) {
    /*
    this._pressData[rowID] = !this._pressData[rowID];
    this.setState({dataSource: this.state.dataSource.cloneWithRows(
      this._genRows(this._pressData)
    )});
    */
  }
};

export default Tasks;