import buffer from 'buffer';
import CredentialStore from './CredentialStore';

class BasicHttpClient {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
  encodeBase64(text) {
    var b = new buffer.Buffer(text);
    return b.toString('base64');
  }
  createHttpHeadersWithBasicAuth()
  {
    var encodedAuth = this.encodeBase64(this.username + ":" + this.password);
    return { 
        'Authorization' : 'Basic' + encodedAuth,
        'Content-Type': 'application/json', 
    };
  }
  getHttpRequest(url, callback) {
    fetch(url,
    {
      headers: this.createHttpHeadersWithBasicAuth()
    })
    .then((response) => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +  response.status);  
        callback(null, response.status);
      }
      return response.json();
    }).then((results) => {
      console.log(url + "   " + results);
      callback(results);
    });
  }
  postHttpRequest(url, content, callback) {
    fetch(url, 
    {
      headers: this.createHttpHeadersWithBasicAuth(),
      method: "POST",
      body: content,
    })
    .then((response) => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +  response.status);  
        callback(null, response.status);
      }
      return response.json();})
    .then((results) => {
      console.log(url + "   " + results);
      callback(results);
    });
  }
  patchHttpRequest(url, content, callback) {
    var headers = this.createHttpHeadersWithBasicAuth();
    headers['Content-Type'] = 'application/json-patch+json';
    fetch(url, 
    {
      headers: headers,
      method: "PATCH",
      body: content,
    })
    .then((response) => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +  response.status);  
        callback(null, response.status);
      }
      return response.json();})
    .then((results) => {
      console.log(url + "   " + results);
      callback(results);
    });
  }
}

export default BasicHttpClient;