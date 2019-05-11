const request = require('request');
const config = require('../config.js');

let getReposByUsername = (name, callback) => {

  let options = {
    url: `https://api.github.com/users/${name}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (error, response, body) => {
    var recordInfo = {};
    if (error) {
      console.log('gRBUN:' + error);
    } else {
      var responseJSON = JSON.parse(response.body);
      var recordsArray = [];
      
      for ( var i = 0; i < 10; i++) {

        if (responseJSON[i] === undefined) {
          console.log('Error!');
          callback('Not a user name!', null);
        } else {
          recordInfo = {};
          recordInfo = {
            userName: responseJSON[i].owner.login,
            repos_URL: responseJSON[i].html_url,
            repo_name: responseJSON[i].name,
            repo_id: responseJSON[i].id,
            repo_desc: responseJSON[i].description,
            stargazers_count: responseJSON[i].stargazers_count
          }
          recordsArray.push(recordInfo);
        }  
      }
      callback(null, recordsArray);
    }
  });

};

module.exports.getReposByUsername = getReposByUsername;