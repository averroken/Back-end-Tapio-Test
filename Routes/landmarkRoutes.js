var express = require('express');


var routes = function(Landmark){
    var landmarkRouter = express.Router();

    landmarkRouter.route('/')
        .post(function(req, res){
            var landmark = new Landmark(req.body);

            landmark.save();
            res.status(201).send(landmark);
        })
        .get(function(req,res){

            var query = {};

            Landmark.find(query, function(err,landmarks){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(landmarks);
            });
        });

    landmarkRouter.use('/:landmarkId', function(req,res,next){
        Landmark.findById(req.params.landmarkId, function(err,landmark){
            if(err)
                res.status(500).send(err);
            else if(landmark)
            {
                req.landmark = landmark;
                next();
            }
            else
            {
                res.status(404).send('no landmark found');
            }
        });
    });
    landmarkRouter.route('/:landmarkId')
        .get(function(req,res){

            res.json(req.landmark);

        });

    return landmarkRouter;
};

module.exports = routes;