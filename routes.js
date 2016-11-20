const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth2');
var config = require('./oauthCredentials.js')
var Account = require('./models/account');
var express = require('express');
const bcrypt = require('bcrypt-nodejs');
const async = require('async');
const crypto = require('crypto');
const passportLocalMongooseEmail = require('passport-local-mongoose-email');
const nodemailer = require('nodemailer');
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

    //renders register
    app.get('/register', function(req, res) {
        res.render('register', {});
    });
    app.get('/changePassword', function(req, res){
        res.render('changePassword', {})
    });
    //ADD PASSWORD CHANGE ROUTE
    app.post('/changePassword', function(req, res, next) {
        async.waterfall([
            function(done) {
                crypto.randomBytes(20, function(err, buf) {
                    var token = buf.toString('hex');
                    done(err, token);
                });
            },
            function(token, done) {
                Account.findOne({ email: req.body.email }, function(err, user) {
                    if (!user) {
                        req.flash('error', 'No account with that email address exists.');
                        return res.redirect('/changePassword');
                    }

                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                    user.save(function(err) {
                        done(err, token, user);
                    });
                });
            },
            function(token, user, done) {
                var smtpTransport = nodemailer.createTransport('SMTP', {
                    service: 'SendGrid',
                    auth: {
                        user: 'DarthSwedo',
                        pass: '123suckadick'
                    }
                });
                var mailOptions = {
                    to: user.email,
                    from: 'passwordreset@demo.com',
                    subject: 'Node.js Password Reset',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
                smtpTransport.sendMail(mailOptions, function(err) {
                    req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                    done(err, 'done');
                });
            }
        ], function(err) {
            if (err) return next(err);
            res.redirect('/changePassword');
        });
    });
    app.get('/reset/:token', function(req, res) {
        Account.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
            if (!user) {
                req.flash('error', 'Password reset token is invalid or has expired.');
                return res.redirect('/changePassword');
            }
            res.render('reset', {
                user: req.user
            });
        });
    });
    app.post('/reset/:token', function(req, res) {
        async.waterfall([
            function(done) {
                Account.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
                    if (!user) {
                        req.flash('error', 'Password reset token is invalid or has expired.');
                        return res.redirect('back');
                    }

                    user.setPassword(req.body.password,function(error, password){
                    if(error){
                        res.render('error');
                    }
                    });
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpires = undefined;

                    user.save(function(err) {
                        req.logIn(user, function(err) {
                            done(err, user);
                        });
                    });
                });
            },
            function(user, done) {
                var smtpTransport = nodemailer.createTransport('SMTP', {
                    service: 'SendGrid',
                    auth: {
                        user: 'DarthSwedo',
                        pass: '123suckadick'
                    }
                });
                var mailOptions = {
                    to: user.email,
                    from: 'olivetreeswithapples@pears.com',
                    subject: 'Your password has been changed',
                    text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
                };
                smtpTransport.sendMail(mailOptions, function(err) {
                    req.flash('success', 'Success! Your password has been changed.');
                    done(err);
                });
            }
        ], function(err) {
            res.redirect('/');
        });
    });
    //handles post on register
    app.post('/register', function(req, res) {
        Account.register(new Account({
                username: req.body.username,
                email: req.body.email,
                authenticationMethod: 'Local',
            }),
            req.body.password,
            function(err, account) {
                if (err) {
                    console.log("error: " + err);
                    return res.render('register', {
                        info: "Sorry. That username is already taken"
                    });
                }
                passport.authenticate('local')(req, res, function() {
                    res.redirect('/');
                });
            });
    });

    //renders login page
    app.get('/login', function(req, res) {
        var errors = req.flash('error');
        res.render('login', {
            user: req.user,
            error: errors
        });
    });
    //handles post of login
    // app.post('/login', passport.authenticate('local'
    // , {successRedirect :'/',
    //         failureRedirect:'/login',
    //     failureFlash: 'Invalid password'}));
    // // ), function(req, res) {
    // //     res.redirect('/');
    // // });
    app.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

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
        user.token = "";
        user.token = token;

        res.json({
            user: req.user.username,
            success: true,
            message: 'Enjoy your token',
            token: token,
            tokenCreationDate: Date.now(),
            tokenExpireDate: tokenCreationDate + 30
        });
        user.tokenCreationDate = Date.now();
        user.tokenExpireDate = tokenCreationDate + 30;
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
