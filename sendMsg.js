var config = require('./config');
var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));

function draftMessage(username, gotten) {
    if (username) {
        return '*' + username + '* says that *' + gotten + '* has been got';
    } else {
        return '*' + gotten + '* does not exist';
    }
}

function postMessage(message, res, next) {
    var botPayload = {
        username: 'gotbot',
        icon_emoji: ':point_right:',
        botPayload.text: message
    };

    request.getAsync({
        uri: config.POST_MSG_URL,
        method: 'POST',
        body: JSON.stringify(payload)
    }).then(function (result) {
        return res.status(200).end();
    }).catch(function (e) {
        return next(e);
    });
}

module.exports = function (req, userlist) {
    var username = req.body.user_name;
    var gotten = req.body.text;

    if (userlist.indexOf(gotten) != -1) {
        scores.update(gotten);
        postMessage(draftMessage(username, gotten), res, next);
    } else if (gotten === 'leaderboard') {
        scores.read(function (err, theScores) {
            if (err) {
                return next('reading error', err);
            }
            postMessage(theScores, res, next);
        });
    } else {
        postMessage(draftMessage(null, gotten), res, next);
    }

}