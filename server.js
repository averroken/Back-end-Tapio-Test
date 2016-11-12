//getting required packages
const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
var apiRoutes = express.Router();

const jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./app/models/user');


//configuration
var port = process.env.PORT || 4000;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

//bodyparser needed for reading JSON from post
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(morgan('dev'));


//basicroute
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// TODO: delete setup route
app.get('/setup', function(req, res) {
    var nick = new User({
        name: 'Brian Masschaele',
        password: 'password',
        admin: true
    });

    nick.save(function(err) {
        if (err) {
            throw err;
        }

        console.log('User saved');
        res.json({
            success: true
        });
    })
})

//route to authenticate users
apiRoutes.post('/authenticate', function(req, res) {
    console.log('authenticate');
    User.findOne({
        name: req.body.name
    }, function(err, user) {
        if (err) {
            throw err;
        }

        if (!user) {
            res.json({
                success: false,
                message: 'authentication failed. User not found'
            });
        } else if (user) {
            if (user.password != req.body.password) {
                res.json({
                    success: false,
                    message: 'authentication failed. Wrong password'
                });
            } else {
                var token = jwt.sign(user, app.get('superSecret'), {
                    expiresIn: 1440
                });

                res.json({
                    success: true,
                    message: 'Enjoy your token',
                    token: token
                })
            }
        }
    });
});

apiRoutes.use(function (req, res, next) {
    var token= req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token'});
            }else {
                req.decoded = decoded;
                next();
            }
        });
    }else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
})

//api routes
apiRoutes.get('/', function(req, res) {
    res.json({
        message: 'Welcome to the coolest API on earth'
    });
});

apiRoutes.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        res.json({
            users: users
        })
    })
})

app.use('/api', apiRoutes);

//server start
app.listen(port, function() {
    console.log("Server listening on: " + port);
})
