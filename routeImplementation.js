//dependecies
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var express = require('express');

//models
var Account = require('./models/account');
var Landmark = require('./models/landmarkModel');
var express = require('express');
var testRoutes = require('./routes/testRoutes.js');
var uploadRoutes = require('./routes/uploadRoutes.js');
var rootRoutes = require('./routes/rootRoutes.js');
var landmarkRoutes = require('./routes/landmarkRoutes')(Landmark);
var accountRoutes = require('./routes/accountRoutes')(Account, Landmark);

module.exports = function(app) {
    require('./routes/uploadRoutes')(app);
    app.use('/api', testRoutes);
    app.use('/api/landmarks', landmarkRoutes);
    app.use('/api/account', accountRoutes);
    require('./routes/rootRoutes')(app);
    require('./routes/passportStrategies')(app);
    require('./routes/androidRoutes')(app);


    app.use(function(req, res, next) {
        res.status(404);
        res.render('404', {});
    });

    app.use(function(req, res, next) {
        res.status(403);
        res.render('403', {});
    });
};
