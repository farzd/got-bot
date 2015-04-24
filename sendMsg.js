var config = require('./config');
var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var score = require('./scores');

function draftMessage(username, gotten, theScores) {
    var botPayload = {
        username: 'gotbot',
        icon_emoji: ':point_right:'
    };

    if (username) {
        botPayload.text = '*' + username + '* says that *' + gotten + '* has been got';
    } else if(theScores){
        botPayload.text = theScores;
    } else {
        botPayload.text = '*' + gotten + '* does not exist';
    }

    return JSON.stringify(botPayload);
}

function postMessage(username, gotten, theScores, res, next) {
    request.getAsync({
        uri: config.POST_MSG_URL,
        method: 'POST',
        body: draftMessage(username, gotten, theScores)
    }).then(function (result) {
        return res.status(200).end();
    }).catch(function (e) {
        return next(e);
    });
}

module.exports = function (req, res, next, userlist) {
    var username = req.body.user_name;
    var gotten = req.body.text;

    if (userlist.indexOf(gotten) != -1) {
        score.update(gotten).then(function () {
            postMessage(username, gotten, null, res, next);
        }).catch(next);
    } else if (gotten === 'leaderboard') {
        score.read().then(function (theScores) {
            postMessage(null, null, theScores, res, next);
        }).catch(next);
    } else {
        postMessage(null, gotten, null, res, next);
    }

};
