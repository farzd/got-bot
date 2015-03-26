var fs = require('fs');
var path = require('path');
var outputFilename = path.join(__dirname, '/leaderboard/scores.json');

module.exports.update = function update(username) {
    fs.readFile(outputFilename, 'utf8', function (err, data) {
        console.log('in read file')
      if (err)  throw err;
      var obj = JSON.parse(data);
      if(obj.leaderboard[username]) {
        console.log('found user', username)
        var theScore = obj.leaderboard[username];
        obj.leaderboard[username] = theScore + 1;
        writeFile(obj);
      } else {
        console.log('not found user')
        obj.leaderboard[username] = 1;
        writeFile(obj);
      }
    });
};

module.exports.read = function read(callback) {
    console.log('read leaderboard')
    var scoreString = '';
    fs.readFile(outputFilename, 'utf8', function (err, data) {
        if (err)  callback(err);
        var obj = JSON.parse(data);

        for (var key in obj.leaderboard) {
            var scores = obj.leaderboard[key];
            scoreString += key + ' ' + scores + '\n';
        }

    console.log('read', scoreString);
        callback(null, scoreString);

    });
};

function writeFile(obj) {
    console.log('writing file')
    fs.writeFile(outputFilename, JSON.stringify(obj, null, 4), function (err) {
        if (err) {
            console.log(err);
            throw err;
        };
    });
}
