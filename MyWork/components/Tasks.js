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
  PanResponder,
  ActivityIndicator
} from 'react-native';

import Swipeout from 'react-native-swipeout';
import BaseStyles from '../styles/BaseStyles';
import CredentialStore from '../data/CredentialStore';
import VstsDataService from '../data/VstsDataService';

class Tasks extends Component {
  constructor(props) {
    super(props);
    styles = Object.assign(styles, BaseStyles);
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => true,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2});
    this.state = {tasks: null, activeTask: null, dataSource: ds.cloneWithRowsAndSections([]), showActivity: false};
  }
  convertTaskArrayToMap(tasks) {
    var taskMap = {};
    tasks.forEach(function(task) {
      if (!taskMap[task.fields["System.AreaPath"]]) {
        // Create an entry in the map for the project if it hasn't yet been created
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
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>My Tasks</Text>
        </View>
        <View style={styles.bodyContainer}>
          <ListView style={styles.taskList}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)} 
            renderSectionHeader={this.renderSectionHeader.bind(this)}
          />
          <ActivityIndicator animating={this.state.showActivity} size="large" style={styles.loader} />
        </View>
      </View>
    );
  }
  renderSectionHeader(sectionData, area) {
    return (
      <View>
        <View style={styles.taskSection}>
          <Text style={styles.taskSectionText}>{area}</Text>
        </View>
      </View>
    );
  }
  renderRow(rowData, sectionID, rowID) {
    var buttons = [ { text: 'Done', backgroundColor: '#57AA7D', onPress: this.rowClosePress.bind(this) } ]
    var circle = <View style={styles.activeCircle} />
    if (rowData.fields["System.State"] != "Active")
      circle = <View style={styles.inactiveCircle} />
      
    return (
      <Swipeout 
        right={buttons}
        close={!rowData.active} 
        rowID={rowID} 
        sectionID={sectionID} 
        onOpen={(sectionID, rowID) => this.handleSwipeout(sectionID, rowID) }>
        <View style={styles.taskRow}>
          {circle}
          <Text style={styles.taskRowText}>{rowData.fields["System.Title"]}}</Text>
        </View>
      </Swipeout>
    );
  }
  pressRow(rowData, sectionID, rowID) {
    // do nothing for now
  }
  async rowClosePress() {
    if (this.state.showActivity) return;

    this.setState({showActivity: true});
    var creds = await CredentialStore.getCreds();
		if (!creds) return;
		var data = new VstsDataService(creds);
    data.closeTask(this.state.activeTask.id, (result, err) => {
      this.setState({showActivity: false});
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

var styles = StyleSheet.create({
  taskList: {
    flex: 1,
    alignSelf: 'stretch',
    paddingTop: 0
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
    fontSize: 16
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
});

export default Tasks;