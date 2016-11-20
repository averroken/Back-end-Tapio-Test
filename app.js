//dependecies
const express = require('express');
const path = require('path');
const morgan = require('morgan'); //logger
const errorHandler = require('errorhandler');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const methodOverride = require('method-override');
const expressSession = require('express-session');

var app = express();
app.set('port', process.env.PORT || 1337);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {layout: false});
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());
app.use(cookieParser('ilovechocolate'));
app.use(expressSession({
    secret: 'ilovechocolate',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(app.router);
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

// mongoose.connect('mongodb://localhost:27017/TestV2');
mongoose.connect(process.env.MONGODB_URI)

require('./routes')(app);

app.listen(app.get('port'),function () {
    console.log('facebook: ' + process.env.FACEBOOK_CLIENT_ID);
    console.log('Express server listening on port: ' + app.get('port'));
})
