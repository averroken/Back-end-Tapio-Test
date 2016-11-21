const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth2');
// var config = require('./oauthCredentials.js')
var config = require('./oauthCredentialsHeroku.js');
var Account = require('./models/account');
var express = require('express');
var testRoutes = express.Router();

// TODO: add password change route
// TODO: make sure users don't register with empty password
// TODO: token verieferen en routes uitbreiden (Brian)

module.exports = function(app) {
    //checks (with request parameter) if user is logged in
    function isAuthenticated(req, res, next) {
        if (req.user) {
            return next();
        }

        res.render('login', {
            info: "Please login"
        })
    }

    //renders the homepage
    app.get('/', function(req, res) {
        console.log('user: ' + req.user);
        res.render('index', {
            user: req.user
        });
    });

    app.get('/googlec06c185a15513c28.html', function (req, res) {
        res.sendFile('./public/googlec06c185a15513c28.html');
    });

    //renders register
    app.get('/register', function(req, res) {
        res.render('register', {});
    });

    //handles post on register
    app.post('/register', function(req, res) {
        Account.register(new Account({
                username: req.body.username,
                authenticationMethod: 'Local',
            }),
            req.body.password,
            function(err, account) {
                if (err) {
                    console.log("error: " + err);
                    return res.render('register', {
                        info: "Sorry. That username is already taken"
                    })
                }

                passport.authenticate('local')(req, res, function() {
                    res.redirect('/');
                });
            });
    });

    //renders login page
    app.get('/login', function(req, res) {
        res.render('login', {
            user: req.user
        });
    });

    //handles post of login
    app.post('/login', passport.authenticate('local'), function(req, res) {
        res.redirect('/');
    });

    //handles post of Android login
    app.post('/android/login', passport.authenticate('local'), function(req, res) {
        var username = (req.user.socialUsername === 'null') ? req.user.username :req.user.socialUsername;
        var token = (req.user.token === "null") ? false : req.user.token;
        var json = {
            "_id" : req.user._id,
            "authenticationMethod": req.user.authenticationMethod,
            "username": username,
            "token": token
        }
        res.status(200).json({"user": json});
    });

    //renders logout page
    app.get('/logout', function(req, res) {
        if (req.user.authenticationMethod === "Facebook") {
            console.log('https://www.facebook.com/logout.php?next=127.0.0.1:1337/logout&access_token=' + req.user.facebokToken);
        }
        req.logout();
        res.redirect('/');
    });

    //simple test page to check if user is logged in
    app.get('/ping', isAuthenticated, function(req, res) {
        res.send("pong!", 200);
    })

    //route to generate token for logged in users
    // TODO: Edit token saving to delete old value
    app.get('/authenticate', isAuthenticated, function(req, res) {
        var user = new Account(req.user);
        var token = jwt.sign(user, 'ilovechocolate', {
            expiresIn: 1440
        });
        user.token = token;

        res.json({
            user: req.user.username,
            success: true,
            message: 'Enjoy your token',
            token: token
        });

        user.save();
    });

    // Passport Strategies
    passport.use(new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            Account.findOne({
                socialLoginId: profile.id
            }, function(err, user) {
                if (err) {
                    console.log(err);
                }
                if (!err && user !== null) {
                    done(null, user);
                } else {
                    account = new Account({
                        username: "" + profile.id,
                        socialUsername: profile.displayName,
                        socialLoginId: profile.id,
                        created: Date.now(),
                        authenticationMethod: "Facebook",
                        facebokToken: accessToken
                    });
                    account.save(function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("saving user");
                            done(null, user);
                        }
                    })
                }
            })
        }
    ));

    passport.use(new GoogleStrategy({
            clientID: config.google.clientID,
            clientSecret: config.google.clientSecret,
            callbackURL: config.google.callbackURL,
            passReqToCallback: true
        },
        function(request, accessToken, refreshToken, profile, done) {
            Account.findOne({
                socialLoginId: profile.id
            }, function(err, user) {
                if (err) {
                    console.log(err);
                }
                if (!err && user !== null) {
                    done(null, user);
                } else {
                    account = new Account({
                        username: "" + profile.id,
                        socialUsername: profile.displayName,
                        socialLoginId: profile.id,
                        created: Date.now(),
                        authenticationMethod: "Google"
                    });
                    account.save(function(err) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("saving user");
                            done(null, user);
                        }
                    })
                }
            })
        }
    ));

    app.get('/auth/facebook',
        passport.authenticate('facebook'),
        function(req, res) {});

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            failureRedirect: '/'
        }),
        function(req, res) {
            res.redirect('/');
        });

    app.get('/auth/google',
        passport.authenticate('google', {
            scope: [
                'https://www.googleapis.com/auth/plus.login'
            ]
        })
    );

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/'
        }),
        function(req, res) {
            res.redirect('/');
        });


    testRoutes.use(function(req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if (token) {
            jwt.verify(token, 'ilovechocolate', function(err, decoded) {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Failed to authenticate token'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                success: 'false',
                message: 'No token provided'
            });
        }
    });

    testRoutes.get('/tokenTest', function(req, res) {
        console.log('user: ' + req.user);
        res.render('token', { });
    });

    app.use('/api', testRoutes);

    app.use(function (req, res, next) {
        res.status(404);
        res.render('error', {});
    })
}
