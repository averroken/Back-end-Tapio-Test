//dependecies
const express = require('express');
const path = require('path');
//Added for changepassword

//---------------------------------------
const morgan = require('morgan'); //logger
const errorHandler = require('errorhandler');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const methodOverride = require('method-override');
const expressSession = require('express-session');
const flash = require('connect-flash');
var Landmark = require('./models/landmarkModel');
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
app.use(flash());

var enviroment = process.env.NODE_ENV || 'development';
if (enviroment == 'development') {
    app.use(errorHandler({dumpExceptions: true, showStack: true}));
}else if (enviroment == 'production') {
    app.use(errorHandler());
}

var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

landmarkRoutes = require('./Routes/landmarkRoutes')(Landmark);

//solving deprecated warning
// --> http://stackoverflow.com/questions/38138445/node3341-deprecationwarning-mongoose-mpromise
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/master1');
// mongoose.connect(process.env.MONGODB_URI);

app.use('/api/landmarks', landmarkRoutes);

require('./routeImplementation')(app);

app.listen(app.get('port'),function () {
    console.log('facebook: ' + process.env.FACEBOOK_CLIENT_ID);
    console.log('Express server listening on port: ' + app.get('port'));
});
