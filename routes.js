const passport = require('passport');
const bodyParser = require('body-parser');
var Account = require('./models/account');

module.exports = function(app) {
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
                    return res.render('register', {info: "Sorry. That username is already taken"})
                }

                passport.authenticate('local')(req,res,function () {
                    res.redirect('/');
                });
            });
    });

    app.get('/login', function (req,res) {
        res.render('login', {user: req.user});
    });

    app.post('/login', passport.authenticate('local'), function (req, res) {
        res.redirect('/');
    })

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/ping', function (req, res) {
        res.send("pong!", 200);
    })
};
