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

import Swipeout from 'react-native-swipeout';
import Styles from './Styles';
import CredentialStore from './CredentialStore';
import VstsDataService from './VstsDataService';

class Tasks extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => true,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2});
    this.state = {tasks: null, activeTask: null, dataSource: ds.cloneWithRowsAndSections([])};
  }
  convertTaskArrayToMap(tasks) {
    var taskMap = {}; // Create the blank map
    tasks.forEach(function(task) {
      if (!taskMap[task.fields["System.AreaPath"]]) {
        // Create an entry in the map for the category if it hasn't yet been created
        taskMap[task.fields["System.AreaPath"]] = [];
      }
      taskMap[task.fields["System.AreaPath"]].push(task);
    });    
    return taskMap;
  }
  componentDidMount() {
    this.fetchTasks();
  }
  async fetchTasks() {
    var creds = await CredentialStore.getCreds();
		if (!creds) return;
		var data = new VstsDataService(creds);
    data.getTasks((results, err) => {
      this.setState({tasks: this.convertTaskArrayToMap(results.value)});
      this.updateDataSource(this.state.tasks);
    });
  }
  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.headerContainer}>
          <Text style={Styles.header}>My Tasks</Text>
        </View>
        <View style={Styles.bodyContainer}>
          <ListView style={Styles.taskList}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)} 
            renderSectionHeader={this.renderSectionHeader.bind(this)}
          />
        </View>
      </View>
    );
  }
  renderSectionHeader(sectionData, area) {
    return (
      <View>
        <View style={Styles.taskSection}>
          <Text style={Styles.taskSectionText}>{area}</Text>
        </View>
      </View>
    );
  }
  renderRow(rowData, sectionID, rowID) {
    var buttons = [ { text: 'Done', backgroundColor: '#57AA7D', onPress: this.rowClosePress.bind(this) } ]
    var circle = <View style={Styles.activeCircle} />
    if (rowData.fields["System.State"] != "Active")
      circle = <View style={Styles.inactiveCircle} />
      
    return (
      <Swipeout 
        right={buttons}
        close={!rowData.active} 
        rowID={rowID} 
        sectionID={sectionID} 
        onOpen={(sectionID, rowID) => this.handleSwipeout(sectionID, rowID) }>
        <View style={Styles.taskRow}>
          {circle}
          <Text style={Styles.taskRowText}>{rowData.fields["System.Title"]}}</Text>
        </View>
      </Swipeout>
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
  async rowClosePress() {
    var creds = await CredentialStore.getCreds();
		if (!creds) return;
		var data = new VstsDataService(creds);
    data.closeTask(this.state.activeTask.id, (result, err) => {
      if (!err) {
        this.fetchTasks();
      }
    })
  }
  handleSwipeout(sectionID, rowID) {
    for (var i = 0; i < this.state.tasks[sectionID].length; i++) {
      if (i != rowID) this.state.tasks[sectionID][i].active = false;
      else {
        this.state.tasks[sectionID][i].active = true;
        this.state.activeTask = this.state.tasks[sectionID][i];
      }
    }
    this.updateDataSource(this.state.tasks);
  }
  updateDataSource(data) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(data),
    });
  }
};

export default Tasks;