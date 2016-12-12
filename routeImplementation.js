const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var Account = require('./models/account');
var Landmark = require('./models/landmarkModel');
var express = require('express');
var testRoutes = require('./routes/testRoutes.js');
var rootRoutes = require('./routes/rootRoutes.js');
// var testRoutes = express.Router();

// TODO: add password change route
// TODO: make sure users don't register with empty password
// TODO: token verieferen en routes uitbreiden (Brian)
var landmarkRoutes = require('./routes/landmarkRoutes')(Landmark);

module.exports = function(app) {
    app.use('/api', testRoutes);
    app.use('/api/landmarks', landmarkRoutes);
    require('./routes/rootRoutes')(app);
    require('./routes/passportStrategies')(app);

    app.use(function(req, res, next) {
        res.status(404);
        res.render('404', {});
    });

    app.use(function(req, res, next) {
        res.status(403);
        res.render('403', {});
    });
};
