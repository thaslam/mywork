'use strict';

import React from 'react';

class DataService {
  constructor() {
  }
  getProjects(callback) {
    // TODO set state.
    fetch('http://localhost:5000/api/v1').then((response) => {
      return response.json();
    }).then((results) => {
      console.log("getProjects()\n" + results);
      callback(results);
    });
  }
  getTasks(projectName, callback) {
    // TODO set state.
    fetch('http://localhost:5000/api/v1/' + projectName).then((response) => {
      return response.json();
    }).then((results) => {
      console.log("getTasks()\n" + results);
      callback(results);
    });
  }
}

export default (new DataService());