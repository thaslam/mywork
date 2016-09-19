'use strict';

import React from 'react';
import BasicHttpClient from './BasicHttpClient';

class VstsDataService {
  constructor(credentials) {
    this.creds = credentials;
  }

  // TODO: Refactor to user BasicHttpClient
  getProjectsDotNet(callback) {
    fetch('http://localhost:5000/api/v1').then((response) => {
      return response.json();
    }).then((results) => {
      console.log("getProjects()\n" + results);
      callback(results);
    });
  }
  // TODO: Refactor to user BasicHttpClient
  getTasksDotNet(projectName, callback) {
    fetch('http://localhost:5000/api/v1/' + projectName).then((response) => {
      return response.json();
    }).then((results) => {
      console.log("getTasks()\n" + results);
      callback(results);
    });
  }
  checkAccess(callback) {
    var client = new BasicHttpClient(this.creds.username, this.creds.password);
    client.getHttpRequest(
      "https://" + this.creds.domain + ".visualstudio.com/_apis/projects?api-version=1.0",
      callback);
  }
  getTasks(callback) {
    var client = new BasicHttpClient(this.creds.username, this.creds.password);
    var content = 
      "{\"query\": " +
      "\"Select [System.Id], [System.Title], [System.State] " +
      "From WorkItems Where [System.WorkItemType] = 'Task' AND [State] <> 'Closed' AND [State] <> 'Removed' And [Assigned To] = @Me " +
      "order by [Microsoft.VSTS.Common.Priority] asc, [System.CreatedDate] desc\"}";

    client.postHttpRequest(
      "https://" + this.creds.domain + ".visualstudio.com/DefaultCollection/_apis/wit/wiql?api-version=1.0", 
      content, (results) => { this.getTaskDetails(results, callback) });
  }
  getTaskDetails(taskResults, callback)
  {
    var client = new BasicHttpClient(this.creds.username, this.creds.password);
    var ids = "ids=";
    var count = 1;

    for (var task of taskResults.workItems) {
      ids += task.id;
      if (count > 200) break;
      if (count < taskResults.workItems.length)
          ids += ','

      count++;
    }

    client.getHttpRequest(
      "https://" + this.creds.domain + ".visualstudio.com/DefaultCollection/_apis/wit/workitems?" + ids + "&api-version=1.0", 
      callback);
  }
}

export default VstsDataService;