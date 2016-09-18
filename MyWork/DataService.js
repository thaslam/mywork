'use strict';

import React from 'react';

class DataService {
  constructor() {
  }
  getProjects() {
    // TODO set state.
    fetch('http://localhost:5000/api/v1').then((data) => {
      return data.json();
    });
  }
}

export default DataService;