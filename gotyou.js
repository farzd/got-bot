var request = require('request');
var userlist = require('./userlist');

module.exports = function (req, res, next) {
    var listOfUsers;

    userlist.getUsers(function(next, res) {
       var result = JSON.parse(res);
       listOfUsers = result.members.map(function (mem) {
            return mem.name;
        });
    });

    var botPayload = {};
    var userName = req.body.user_name;
    var gotten = req.body.text;
    botPayload.username = 'gotbot';
    botPayload.icon_emoji = ':point_right:';

    if (userlist.indexOf(userName)) {
        botPayload.text = '*' + userName + '* says that *' + gotten + '* has been got';
    } else {
        botPayload.text = '*' + userName + 'does not exist';
    }

    send(botPayload, function (error, status, body) {
      if (error) {
        return next(error);
      } else if (status !== 200) {
        // inform user that our Incoming WebHook failed
        return next(new Error('Incoming WebHook: ' + status + ' ' + body));
      } else {
        return res.status(200).end();
      }
    });
};


function send (payload, callback) {
  var uri = 'https://hooks.slack.com/services/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';

  request({
    uri: uri,
    method: 'POST',
    body: JSON.stringify(payload)
  }, function (error, response, body) {
    if (error) {
      return callback(error);
    }

    callback(null, response.statusCode, body);
  });
}