//dependecies
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var express = require('express');

//models
var Account = require('./models/account');
var Landmark = require('./models/landmarkModel');

//routeFiles
var testRoutes = require('./routes/testRoutes.js');
var rootRoutes = require('./routes/rootRoutes.js');
var landmarkRoutes = require('./Routes/landmarkRoutes')(Landmark);

module.exports = function(app) {
    app.use('/api', testRoutes); //WARNING ADDED TOKEN VALIDATION
    app.use('/api/landmarks', landmarkRoutes);
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
