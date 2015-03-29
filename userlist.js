var Promise = require("bluebird");
var request = Promise.promisifyAll(require("request"));

var listOfUsers;
var requestParams = {
    url: 'https://slack.com/api/users.list',
    qs: {
        token: 'xoxp-2392086267-2392090237-4188901173-6d789a'
    }
};

module.exports = function getUsers() {
    if (listOfUsers) {
          console.log('return variable already set');
         return Promise.resolve(listOfUsers);
    }
    return request.getAsync(requestParams).spread(function (err, res) {
        console.log('calling request');
        var result = JSON.parse(res);
        listOfUsers = result.members.map(function (user) {
            return user.name;
        });
        return listOfUsers;
    });
};
