const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth2');
var config = require('./oauthCredentials.js')
var Account = require('./models/account');

// TODO: add password change route
// TODO: make sure users don't register with empty password

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
    })

    //renders logout page
    app.get('/logout', function(req, res) {
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

    // TODO: Edit facebookLogin
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
                        username: profile.displayName,
                        socialLoginId: profile.id,
                        created: Date.now(),
                        authenticationMethod: "Facebook"
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

    // TODO: Edit googleLogin
    // passport.use(new GoogleStrategy({
    //         clientID: config.google.clientID,
    //         clientSecret: config.google.clientSecret,
    //         callbackURL: config.google.callbackUrl,
    //         passReqToCallback: true
    //     },
    //     function(request, accessToken, refreshToken, profile, done) {
    //         User.findOne({oauthID: profile.id}, function (err, user) {
    //             if (err) {
    //                 console.log(err);
    //             }
    //             if (!err && user !== null) {
    //                 done(null, user);
    //             }else {
    //                 user = new User({
    //                     oauthID: profile.id,
    //                     name: profile.displayName,
    //                     created: Date.now(),
    //                     authentication: "Google"
    //                 });
    //                 user.save(function (err) {
    //                     if(err){
    //                         console.log(err);
    //                     }else {
    //                         console.log("saving user");
    //                         done(null, user);
    //                     }
    //                 })
    //             }
    //         })
    //     }
    // ));

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
}
