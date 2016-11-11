var path = require('path');
var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Logger = require('morgan');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var errorHandler = require('errorhandler');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.set('port', process.env.PORT || 1337);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', { layout: false});
app.use(Logger('dev'));
app.use(methodOverride());
app.use(cookieParser('ilovechocolate'));
app.use(session({ secret: 'ilovechocolate', resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


var enviroment = process.env.NODE_ENV || 'development';
if (enviroment == 'development') {
    app.use(errorHandler({dumpExceptions: true, showStack: true}))
}else if (enviroment == 'production') {
    app.use(errorHandler());
}

var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

mongoose.connect('mongodb://localhost:27017/Test2');

require('./routes')(app);

app.listen(app.get('port'), function () {
    console.log("Express server listening on port: " + app.get('port'));
});
