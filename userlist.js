var request = require('request');

module.exports.getUsers = function getUsers(callback) {
    requestUsers(function (error, status, body) {
      if (error) {
        callback(error);
      }  else {
        callback(null, body);
      }
    });
};

function requestUsers (callback) {
   request({
    uri: 'https://slack.com/api/users.list',
    method: 'GET',
    qs: {token:'xoxp-2392086267-2392090237-4188901173-6d789a'}
  }, function (error, response, body) {
    if (error) {
      return callback(error);
    }
    callback(null, response.statusCode, body);
  });

}
