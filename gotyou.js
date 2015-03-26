var request = require('request');
var userlist = require('./userlist');
var scores = require('./scores');

module.exports = function (req, res, next) {

    var listOfUsers;

    if(!listOfUsers) {
        userlist.getUsers(function (result) {
            listOfUsers = result;
             sendMessage();
        });
    } else {
        sendMessage();
    }

    function sendMessage() {
        var botPayload = {};
        var userName = req.body.user_name;
        var gotten =  req.body.text;
        botPayload.username = 'gotbot';
        botPayload.icon_emoji = ':point_right:';

        if (listOfUsers.indexOf(gotten) != -1) {
            scores.update(gotten);
            botPayload.text = '*' + userName + '* says that *' + gotten + '* has been got';
        } else if(gotten === 'leaderboard'){
            scores.read(function(err, theScores) {
                if (err) {
                    return next('reading error', err);
                }
                botPayload.text = theScores;
            });
        } else {
            botPayload.text = '*' + gotten + '* does not exist';
        }

        send(botPayload, function (error, status, body) {
            if (error) {
                return next(error);
            } else if (status !== 200) {
                return next(new Error('Incoming WebHook: ' + status + ' ' + body));
            } else {
                return res.status(200).end();
            }
        });
    }
};

function send (payload, callback) {
    console.log(payload);
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
