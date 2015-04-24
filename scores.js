var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var config = require('./config');
var outputFilename = path.join(__dirname, config.SCORE_DIR);

function update(username) {
    fs.readFileAsync(outputFilename, 'utf8').then(JSON.parse).then(function (result) {
      if(result.leaderboard[username]) {
        var theScore = result.leaderboard[username];
        result.leaderboard[username] = theScore + 1;
        writeFile(result);
      } else {
        result.leaderboard[username] = 1;
        writeFile(result);
      }
    }).catch(SyntaxError, function(e) {
        console.error("invalid json in file");
    }).catch(function(e) {
        console.error("unable to read file");
    });
}

function read() {
    var scoreString = ':fire::fire::fire: *Leaderboard* :fire::fire::fire:\n\n';
    return fs.readFileAsync(outputFilename, 'utf8').then(JSON.parse).then(function (result) {
        for (var key in result.leaderboard) {
            var scores = result.leaderboard[key];
            var name = key.toUpperCase();
            scoreString += '*' + name + '* -- ' + scores + ' \n';
        }

        return scoreString;
    }).catch(SyntaxError, function(e) {
        console.error("invalid json in file");
    }).catch(function(e) {
        console.error("unable to read file");
    });
}

function writeFile(obj) {
    fs.writeFileAsync(outputFilename, JSON.stringify(obj, null, 4)).catch(function(e) {
        console.error("unable to read file");
    });
}


module.exports = {
    read: read,
    update: update
};
