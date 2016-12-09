const passport = require('passport');
const jwt = require('jsonwebtoken');
var Account = require('../models/account');

module.exports = function(app) {
    //handles post of Android login
    app.post('/android/login', passport.authenticate('local'), function(req, res) {
        var token = req.user.token
        var username = (req.user.socialUsername === 'null') ? req.user.username : req.user.socialUsername;
        if (token === "null") {
            var user = new Account(req.user);
            token = jwt.sign(user, 'ilovechocolate', {
                expiresIn: 1440
            });
            user.token = token;
            user.save();
        }
        var json = {
            "_id": req.user._id,
            "authenticationMethod": req.user.authenticationMethod,
            "username": username,
            "token": token
        }
        console.log("json:" + json);
        res.status(200).send(json);
    });
}
