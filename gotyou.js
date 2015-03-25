var request = require('request');

module.exports = function (req, res, next) {
    var botPayload = {};
    botPayload.username = 'dicebot';
    botPayload.icon_emoji = ':game_die:';

    botPayload.text = 'ola amigo';

    // send dice roll
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
