const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var Account = require('./models/account');

// TODO: add google login
// TODO: add facebook login

module.exports = function(app) {
    function isAuthenticated(req, res, next) {
        if (req.user) {
            return next();
        }

        res.render('login', {
            info: "Please login"
        })
    }

    app.get('/', function(req, res) {
        console.log('user: ' + req.user);
        res.render('index', {
            user: req.user
        });
    });

    app.get('/register', function(req, res) {
        res.render('register', {});
    });

    app.post('/register', function(req, res) {
        Account.register(new Account({
                username: req.body.username
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

    app.get('/login', function(req, res) {
        res.render('login', {
            user: req.user
        });
    });

    app.post('/login', passport.authenticate('local'), function(req, res) {
        res.redirect('/');
    })

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/ping', isAuthenticated, function(req, res) {
        res.send("pong!", 200);
    })

    //route to authenticate users
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
}
