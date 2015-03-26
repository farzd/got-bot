var request = require('request');
var result;

module.exports.getUsers = function getUsers(callback) {
    requestUsers(function(err, status, res) {
       var result = JSON.parse(res);
       var listOfUsers = result.members.map(function (mem) {
            return mem.name;
        });
       callback(listOfUsers);
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
