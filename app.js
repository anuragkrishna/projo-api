import express from 'express';
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var users = require('./routes/users');
var p_route = require('./routes/p_route');

var Project = require('./models/project');
var Note = require('./models/note');
var Report = require('./models/report');

var app = express();
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use('/', index);
app.use('/api', p_route);

//DB Connection
var mongoDBUrl= 'mongodb://anurag:projo@ds145289.mlab.com:45289/projodb';
mongoose.connect(mongoDBUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app;
