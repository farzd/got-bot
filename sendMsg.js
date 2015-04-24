var config = require('./config');
var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));

function draftMessage(username, gotten) {
    var botPayload = {
        username: 'gotbot',
        icon_emoji: ':point_right:'
    };

    if (username) {
        botPayload.text = '*' + username + '* says that *' + gotten + '* has been got';
    } else {
        botPayload.text = '*' + gotten + '* does not exist';
    }

    return JSON.stringify(botPayload);
}

function postMessage(username, gotten, res, next) {
    request.getAsync({
        uri: config.POST_MSG_URL,
        method: 'POST',
        body: draftMessage(username, gotten)
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
        postMessage(username, gotten, res, next);
    } else if (gotten === 'leaderboard') {
        scores.read(function (err, theScores) {
            if (err) {
                return next('reading error', err);
            }
            postMessage(theScores, res, next);
        });
    } else {
        postMessage(null, gotten, res, next);
    }

};
