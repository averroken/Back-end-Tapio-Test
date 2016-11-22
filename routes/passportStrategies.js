const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const FacebookTokenStrategy = require('passport-facebook-token');
const GoogleStrategy = require('passport-google-oauth2');
var config = require('../oauthCredentials.js');
var Account = require('../models/account');

module.exports = function(app) {
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

    passport.use(new FacebookTokenStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret
    }, function(accessToken, refreshToken, profile, done) {
        Account.findOne({
            socialLoginId: profile.id
        }, function(err, user) {
            if (err) {
                console.log("first error: " + err);
            }
            if (!err && user !== null) {
                done(null, user);
            }else {
                account = new Account({
                    username: "" + profile.id,
                    socialUsername: profile.displayName,
                    socialLoginId: profile.id,
                    created: Date.now(),
                    authenticationMethod: "Facebook-token",
                    facebokToken: accessToken
                });
                account.save(function (err) {
                    if (err) {
                        console.log("second error: " + err);
                    }else {
                        console.log("saving user");
                        done(null, user);
                    }
                })
            }
        })
    }))

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

    app.get('/auth/facebook/token',
        passport.authenticate('facebook-token'),
        function(req, res) {
            res.send(req.user ? 200 : 400);
        }
    )

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
};
