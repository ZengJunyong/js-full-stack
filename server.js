var express = require('express');
var app = express();
var debug = require('debug')('server');

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    debug('Example app listening on port 3000!');
});
