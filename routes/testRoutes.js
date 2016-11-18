const jwt = require('jsonwebtoken');
var express = require('express');
var testRoutes = express.Router();

testRoutes.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, 'ilovechocolate', function(err, decoded) {
            if (err) {
                res.status(403)
                // return res.json({
                //     success: false,
                //     message: 'Failed to authenticate token'
                // });
                return res.render('403', {info: "Failed to authenticate token"});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(403);
        res.render('403', {info: "No token provided"})

        //  .send({
        //     success: 'false',
        //     message: 'No token provided'
        // });
    }
});

testRoutes.get('/tokenTest', function(req, res) {
    console.log('user: ' + req.user);
    res.render('token', { });
});

testRoutes.get('/tracer', function(req, res) {
    res.render('tracer', { });
});

module.exports = testRoutes;
