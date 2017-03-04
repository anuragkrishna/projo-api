/*jshint esversion: 6 */

import express from 'express';
import path from 'path';
import cookieParser from  'cookie-parser';
import bodyParser from 'body-parser';

import index from './routes/index';
import users from './routes/users';
import p_route from './routes/p_route';
import auth from './routes/auth';


var app = express();
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use('/', index);
app.use('/api', p_route);
app.use('/api/auth', auth);

export default app;
