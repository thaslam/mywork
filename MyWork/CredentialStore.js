
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

// TODO: add encryption support for data at rest
class CredentialStore {
  constructor() {
  }
  async clearCreds() {
    this.setCreds(null);
  }
  async getCreds(){
    var value = await AsyncStorage.getItem('@SuperStore:creds');
    return !value ? null : JSON.parse(value);
  }
  async setCreds(value) {
    if (value == null)
      await AsyncStorage.removeItem('@SuperStore:creds');
    else
      await AsyncStorage.setItem('@SuperStore:creds', JSON.stringify(value));
  }
}

export default (new CredentialStore());