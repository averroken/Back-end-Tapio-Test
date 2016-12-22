const jwt = require('jsonwebtoken');
var express = require('express');
var testRoutes = express.Router();

testRoutes.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, 'ilovechocolate', function(err, decoded) {
            if (err) {
                res.status(403);
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
        res.render('403', {info: "No token provided"});

        //  .send({
        //     success: 'false',
        //     message: 'No token provided'
        // });
    }
});

/**
@api {get} api/tokenTest TokenTest
@apiName TestToken
@apiGroup Token
@apiDescription A route to simply test if the given token is correct.

@apiSuccess message Congratulations your token works

@apiError No_token No <code>token</code> provided. <code>token</code> is required
@apiError Wrong_token Failed to authenticate <code>token</code>.
**/
testRoutes.get('/tokenTest', function(req, res) {
    console.log('user: ' + req.user);
    res.render('token', { });
});

/**
@api {get} api/android/tokenTest TokenTest (Android)
@apiName TestToken (Android)
@apiGroup Token
@apiDescription A route to simply test if the given token is correct.

@apiSuccess message Congratulations your token works

@apiSuccessExample Example success response:
{
    message: 'Congratulations, your token works'
}

@apiError No_token No <code>token</code> provided. <code>token</code> is required
@apiError Wrong_token Failed to authenticate <code>token</code>.
**/
testRoutes.get('/android/tokenTest', function(req, res) {
    console.log('user: ' + req.user);
    res.json({"message":"Congratulations, your token works"});
});

testRoutes.get('/tracer', function(req, res) {
    res.render('tracer', { });
});

module.exports = testRoutes;
