var fs = require('fs');
var path = require('path');
var outputFilename = path.join(__dirname, '/leaderboard/scores.json');

module.exports.update = function update(username) {
    var obj;
    fs.readFile(outputFilename, 'utf8', function (err, data) {
      if (err)  throw err;
      obj = JSON.parse(data);
      if(obj.leaderboard[username]) {
        var theScore = obj.leaderboard[username];
        obj.leaderboard[username] = theScore + 1;
        writeFile(obj);
      } else {
        obj.leaderboard[username] = 1;
        writeFile(obj);
      }
    });
};

module.exports.read = function read(callback) {
    var scoreString = '';
    fs.readFile(outputFilename, 'utf8', function (err, data) {
        if (err)  callback(err);
        var obj = JSON.parse(data);

        for (var key in obj.leaderboard) {
            var scores = obj.leaderboard[key];
            scoreString += key + ' ' + scores + '\n';
        }

        callback(null, scoreString);

    });
};

function writeFile(obj) {
    fs.writeFile(outputFilename, JSON.stringify(obj, null, 4), function (err) {
        if (err) throw err;
    });
}
