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

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
})

passport.use(new FacebookStrategy({
    clientID: '100697627081768',
    clientSecret: '7db636cbc4fc5a51af01b6160fdc4efa',
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));



// global config
var app = express();
app.set('port', process.env.PORT || 1337);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// env config
app.configure('development', function() {
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

app.configure('production', function() {
    app.use(express.errorHandler());
});

// mongo config
var MONGOLAB_URI = "add_your_mongolab_uri_here"
var mongo = process.env.MONGOLAB_URI || 'mongodb://localhost/node-bootstrap3-template'
mongoose.connect(mongo);

// mongo model
// var Model_Name = require('add_your_models_here');

// routes
app.get('/', routes.index);
app.get('/ping', routes.ping);

// run server
app.listen(app.get('port'), function() {
    console.log('\nExpress server listening on port ' + app.get('port'));
});
