var config = require('./config.json');
var Promise = require("bluebird");
var request = Promise.promisifyAll(require("request"));

var userList;
var requestParams = {
    url: config.GET_USER_URL,
    qs: {
        token: config.GET_USER_TOKEN
    }
};

module.exports = function () {
    if (userList) {
        return Promise.resolve(userList);
    }
    return request.getAsync(requestParams).then(function (json) {
        var result = JSON.parse(json[0].body);
        userList = result.members.map(function (user) {
            return user.name;
        });
        return userList;

    });
};
