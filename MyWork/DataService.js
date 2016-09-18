'use strict';

import React from 'react';

class DataService {
  constructor() {
  }
  getProjects() {
    // TODO set state.
    fetch('http://localhost:5000/api/v1').then((response) => {
      return response.json();
    }).then((results) => {
      console.log("getProjects()\n" + results);
    });
  }
  getTasks(projectName) {
    // TODO set state.
    fetch('http://localhost:5000/api/v1/' + projectName).then((data) => {
      return data.json();
    });
  }
}

export default (new DataService());