var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var getUserList = require('./getUserList');
var sendMsg = require('./sendMsg');

var app = express();
var port = process.env.PORT || 3000;

// body parser middleware
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(port, function () {
    console.log('Slack bot listening on port ' + port);
});

// test route
app.get('/', function (req, res) {
    res.status(200).send('Hello world!');
});

app.post('/gotyou', function (req, res, next) {
    getUserList().then(function (userlist) {
        sendMsg(req, res, next, userlist);
    }).catch(next);
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(400).send(err.message);
});
