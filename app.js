// dependencies
var fs = require('fs');
var http = require('http');
var express = require('express');
var routes = require('./routes');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./oauth.js');
var FacebookStrategy = require('passport-facebook').Strategy;
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// mongo config
var mongo = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/TestV3'
mongoose.connect(mongo);

// mongo model
// var Model_Name = require('add_your_models_here');
var User = mongoose.model('User', {
    oauthID: Number,
    name: String,
    created: Date
});


passport.serializeUser(function(user, done) {
    console.log('serializeUser: ' + user._id);
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        console.log(user);
        if (!err) {
            done(null,user);
        }else {
            done(err, null);
        }
    })
})

passport.use(new FacebookStrategy({
        clientID: config.facebook.clientId,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackUrl
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOne({oauthID: profile.id}, function (err, user) {
            if(err){
                console.log(err);
            }
            if(!err && user !== null){
                done(null, user);
            }else {
                user = new User({
                    oauthID: profile.id,
                    name: profile.dispalyName,
                    created: Date.now()
                });
                user.save(function (err) {
                    if (err) {
                        console.log(err);
                    }else {
                        console.log("saving user");
                        done(null, user);
                    }
                })
            }
        })
    }
));


// global config
var app = express();
app.set('port', process.env.PORT || 1337);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());
app.use(session({
    secret: 'ilovechocolate',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// env config
var enviroment = process.env.NODE_ENV || 'development';
if (enviroment == 'development') {
    app.use(errorHandler({
        dumpExceptions: true,
        showStack: true
    }))
} else if (enviroment == 'production') {
    app.use(errorHandler());
}

// routes
app.get('/', routes.index);
app.get('/ping', routes.ping);
app.get('/account', ensureAuthenticated, function(req, res) {
    User.findById(req.session.passport.user, function (err, user) {
        if (err) {
            console.log(err);
        }else {
            res.render('account', {user: user});
        }
    })
});

app.get('/', function(req, res) {
    res.render('login', {
        user: req.user
    });
});

app.get('/auth/facebook',
    passport.authenticate('facebook'),
    function(req, res) {});

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/'
    }),
    function(req, res) {
        res.redirect('/account');
});


app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
})

// run server
app.listen(app.get('port'), function() {
    console.log('\nExpress server listening on port ' + app.get('port'));
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
