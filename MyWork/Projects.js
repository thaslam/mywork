'use strict';

import React, { Component } from 'react';
import { 
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import Styles from './Styles';

class Projects extends Component {
  constructor(props) {
    super(props);
  }
  get text() { return "Tom" }
  render() {
    return (
      <View style={Styles.container}>
        <Text style={Styles.header}>Your Projects</Text>
      </View>
    );
  }
};