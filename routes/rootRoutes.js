const passport = require('passport');
const bodyParser = require('body-parser');
var Account = require('../models/account');
const jwt = require('jsonwebtoken');
const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

module.exports = function (app) {
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
    app.get('/', function (req, res) {
        // console.log('user: ' + req.user);
        res.render('index', {
            user: req.user
        });
    });

    app.get('/googlec06c185a15513c28.html', function (req, res) {
        res.sendFile('./public/googlec06c185a15513c28.html');
    });

    //renders register
    app.get('/register', function (req, res) {
        res.render('register', {});
    });

    // TODO: add @apiParamExample
    /**
     @api {post} register Register
     @apiName Register
     @apiGroup Default
     @apiDescription Route to register users (both on web and android).

     @apiParam {string} username The <code>name</code> the user wants to use
     @apiParam {string} email The <code>email</code> the user wants to use
     @apiParam {string} password The <code>password</code> the user wants to use

     @apiSuccess redirect The user is redirected to the index ('/') page

     @apiError username_taken The user is redirected to the register ('/') page, and gets a message that says the username is already taken
     **/
    //handles post on register
    app.post('/register', function (req, res) {
        Account.register(new Account({
                username: req.body.username,
                email: req.body.email,
                authenticationMethod: 'Local'
            }),
            req.body.password,
            function (err, account) {
                if (err) {
                    console.log("error: " + err);
                    return res.render('register', {
                        info: "Sorry. That username is already taken"
                    })
                }

                passport.authenticate('local')(req, res, function () {
                    res.redirect('/');
                });

                var sign = {
                    "username": account.username
                }
                var date = new Date();
                var month = date.getMonth();
                date.setMonth(month + 3);
                var refreshToken;
                var token;
                token = jwt.sign(sign, 'ilovechocolate', {
                    expiresIn: 1440
                });
                refreshToken = jwt.sign(sign, 'refreshToken', {
                    expiresIn: date.getSeconds()
                });
                console.log("Refreshtoken is: " + refreshToken);
                account.refreshToken = refreshToken;
                account.token = token;
                account.save();
            });
    });

/**
 @api {get} login Login (get)
 @apiName Login
 @apiGroup Default
 @apiDescription Route to render login page (only on web).
 **/
//renders login page
app.get('/login', function (req, res) {
    res.render('login', {
        user: req.user
    });
});

/**
 @api {post} login Login
 @apiName Login (post)
 @apiGroup Default
 @apiDescription Route to login users (only on web).

 @apiSuccess redirect The user is redirected to the index ('/') page, where the user can see his <code>token</code>

 **/
//handles post of login
app.post('/login', passport.authenticate('local'), function (req, res) {
    res.redirect('/');
})

/**
 @api {get} logout Logout
 @apiName Logout
 @apiGroup Default
 @apiDescription Route to render logout page (only on web).
 **/

//renders logout page
app.get('/logout', function (req, res) {
    if (req.user.authenticationMethod === "Facebook") {
        console.log('https://www.facebook.com/logout.php?next=127.0.0.1:1337/logout&access_token=' + req.user.facebokToken);
    }
    req.logout();
    res.redirect('/');
});

//simple test page to check if user is logged in
app.get('/ping', isAuthenticated, function (req, res) {
    res.send("pong!", 200);
})

/**
 @api {get} authenticate Authenticate
 @apiName Authenticate
 @apiGroup Default
 @apiDescription Route to generate a <code>token</code> for the logged in user.

 @apiSuccess redirect The user is redirected to the index ('/') page, where it shows the new <code>token</code>

 **/
//route to generate token for logged in users
app.get('/authenticate', isAuthenticated, function (req, res) {
    var user = new Account(req.user);
    var json = {
        "username": user.username
    }
    var token = jwt.sign(json, 'ilovechocolate', {
        expiresIn: 1440
    });
    user.token = token;

    // res.json({
    //     user: req.user.username,
    //     success: true,
    //     message: 'Enjoy your token',
    //     token: token
    // });

    res.redirect('/');

    user.save();
});

/**
 @api {get} changePassword Change Password (get)
 @apiName changePassword
 @apiGroup Password
 @apiDescription Route to render change password page (only on web).
 **/
app.get('/changePassword', function (req, res) {
    var errors = req.flash('error');
    res.render('changePassword', {
        error: errors
    });
});

/**
 @api {post} changePassword Change Password
 @apiName changePassword_post
 @apiGroup Password
 @apiDescription Route to handle the change password post (only on web).

 @apiParam {string} email The <code>email</code> that the user used to register his account

 @apiSuccess message A message containing <code>"An email has been sent to your address."</code> will be shown.

 @apiError Email_not_found No account with that <code>email</code> address exists.
 **/
//ADD PASSWORD CHANGE ROUTE
app.post('/changePassword', function (req, res, next) {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function (token, done) {
            Account.findOne({
                email: req.body.email
            }, function (err, user) {
                if (!user) {
                    req.flash('error', 'No account with that email address exists.');
                    return res.redirect('/changePassword');
                }
                req.flash('error', 'An email has been sent to your address');
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function (err) {
                    done(err, token, user);
                });
            });
        },
        function (token, user, done) {
            var smtpTransport = nodemailer.createTransport('SMTP', {
                service: 'SendGrid',
                auth: {
                    user: 'DarthSwedo',
                    pass: '123azerty'
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'noreply@Tapio.com',
                subject: 'Tapio Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                done(err, 'done');
            });
        }
    ], function (err) {
        if (err) return next(err);
        res.redirect('/changePassword');
    });
});

/**
 @api {get} reset/:token Reset Password (get)
 @apiName resetpassword_get
 @apiGroup Password
 @apiDescription Route to render the password reset page (only on web) if the token is correct.

 @apiParam {string} token The <code>token</code> that the user recieved in the email

 @apiError invalid_token The following message will be shown: <code>"Password reset token is invalid or has expired"</code>
 **/
app.get('/reset/:token', function (req, res) {
    Account.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
            $gt: Date.now()
        }
    }, function (err, user) {
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/changePassword');
        }
        res.render('reset', {
            user: req.user
        });
    });
});

/**
 @api {post} reset/:token Reset Password
 @apiName resetpassword
 @apiGroup Password
 @apiDescription Route to handle the password reset post (only on web).

 @apiParam {string} token The <code>token</code> that the user received in the email

 @apiSuccess message The following message will be shown: <code>"Success! Your password has been changed."</code>

 @apiError invalid_token The following message will be shown: <code>"Password reset token is invalid or has expired"</code>
 **/
app.post('/reset/:token', function (req, res) {
    async.waterfall([
        function (done) {
            Account.findOne({
                resetPasswordToken: req.params.token,
                resetPasswordExpires: {
                    $gt: Date.now()
                }
            }, function (err, user) {
                if (!user) {
                    req.flash('error', 'Password reset token is invalid or has expired.');
                    return res.redirect('back');
                }

                user.setPassword(req.body.password, function (error) {
                    if (error) {
                        res.render('error');
                    } else {
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;

                        user.save(function (err) {
                            req.logIn(user, function (err) {
                                done(err, user);
                            });
                        });
                    }
                });

            });
        },
        function (user, done) {
            var smtpTransport = nodemailer.createTransport('SMTP', {
                service: 'SendGrid',
                auth: {
                    user: 'DarthSwedo',
                    pass: '123azerty'
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'noreply@Tapio.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function (err) {
                req.flash('success', 'Success! Your password has been changed.');
                done(err);
            });
        }
    ], function (err) {
        res.redirect('/');
    });
});
/**
 @api {post} refreshtoken/:refreshToken Refresh Token
 @apiName refreshToken
 @apiGroup Password
 @apiDescription Route to handle the password reset post (only on web).

 @apiParam {string} token The <code>token</code> that the user received in the email
 */
app.get('/refreshToken', function (req, res) {
    var refreshToken = req.body.refreshToken || req.query.refreshToken;
    console.log("Refreshtoken is : " + refreshToken);
    if (refreshToken) {
        Account.findOne({
            refreshToken: refreshToken
        }, function (err, user) {
            if (err) {
                console.log(err);
            } else {
                if (user) {
                    var sign = {
                        "username": user.username
                    }
                    var date = new Date();
                    var month = date.getMonth();
                    date.setMonth(month + 3);
                    var refreshToken = jwt.sign(sign, 'refreshToken', {
                        expiresIn: date.getSeconds()
                    });
                    var token = jwt.sign(sign, 'ilovechocolate', {
                        expiresIn: 1440
                    });
                    user.token = token;
                    user.refreshToken = refreshToken;
                    user.refreshTokenExpires = date;
                    user.save();
                    var json = {
                        "refreshToken": refreshToken,
                        "token": token
                    };
                    console.log("json:" + json);
                    res.status(201).send(json);
                } else {
                    var json = {
                        "error": "The refreshtoken does not exist"
                    }
                    res.status(201).send(json);
                }
            }
        })
    } else {
        var json = {
            "error": "No refreshtoken given"
        }
        res.status(201).send(json);
    }
});
}
;
