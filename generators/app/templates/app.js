'use strict';
const express = require('express');
// const favicon = require('serve-favicon');
const path = require('path');
const logger = require('./lib/logger');
const expressWinston = require('express-winston');
const dotenv = require('dotenv');
dotenv.load();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./lib/routes');
const app = express();
<%if(jwt){%>const extractJwt = require('./lib/routes/extract-jwt');<%}%>
<%if(jwt){%>const publicPath = require('./config/public');<%}%>

app.use(expressWinston.logger({
    winstonInstance: logger,
    expressFormat: true,
    colorize: false,
    meta: false,
    statusLevels: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));

const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://' + process.env.MONGODB_HOST + ':' + process.env.MONGODB_PORT + '/' + process.env.MONGODB_DB,  {useNewUrlParser: true})
    .then(() => {
        logger.info('success mongoose connection.');
    })
    .catch((error) => {
        logger.error('Error mongoose connection: ', error);
    });

<%if(jwt){%>app.use(publicPath.pathRegex, extractJwt);<%}%>
const buildHiroki = require('./build-hiroki');
const hirokiInstance = buildHiroki();
app.use('/api', hirokiInstance);

Object.keys(routes).forEach((key) => {
    app.use(routes[key]);
});

app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
    logger.error('handleError: ', err);
    if (res.headersSent) {
        next(err);
        return;
    }
    let error = {};
    error.status = err.status;
    if(req.app.get('env') === 'development') {
        error.message = err.message;
        error.stack = err.stack;
    }
    res.status(err.status || 500).json({
        error
    });
});

module.exports = app;