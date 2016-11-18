const passport = require('passport');
const bodyParser = require('body-parser');

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


};
