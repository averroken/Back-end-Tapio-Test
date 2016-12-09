var express = require('express');

var routes = function(Landmark) {
    var landmarkRouter = express.Router();
    landmarkRouter.route('/')
        .post(function(req, res) {
            var landmark = new Landmark(req.body);

            landmark.save(function(err) {
                if (err) {
                    var test = err;
                    var json = {
                        "awnser": "Failed to create json",
                        "message": test.errors
                    };
                    return res.status(406).json(json);
                } else {
                    var json = {
                        "awnser": "Successfully created landmark",
                        "message": {
                          "id" : landmark._id 
                        }
                    };
                    res.status(201).json(json);
                }
            });
        })
        .get(function(req, res) {

            var query = {};

            Landmark.find(query, function(err, landmarks) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json({
                        "landmarks": landmarks
                    });
            });
        });

    landmarkRouter.route('/test')
        .get(function(req, res) {
            Landmark.find({}, {
                "Long": 1,
                "Lat": 1
            }, function(err, landmarks) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json({
                        "landmarks": landmarks
                    });
            });
        });

    landmarkRouter.route('/filterlocatie')
        .get(function(req, res) {
            var query = {};

            if (req.query.Country) {
                if (req.query.Country) query.Country = req.query.Country;
            }

            Landmark.find(query, function(err, landmarks) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json({
                        "landmarks": landmarks
                    });
            });
        });

    landmarkRouter.route('/filterlocatieshort')
        .get(function(req, res) {

            var query = {};

            if (req.query.Country) {
                if (req.query.Country) query.Country = req.query.Country;
            }

            Landmark.find(query, {
                "Long": 1,
                "Lat": 1
            }, function(err, landmarks) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json({
                        "landmarks": landmarks
                    });
            });
        });

    landmarkRouter.use('/:landmarkId', function(req, res, next) {
        Landmark.findById(req.params.landmarkId, function(err, landmark) {
            if (err)
                res.status(500).send(err);
            else if (landmark) {
                req.landmark = landmark;
                next();
            } else {
                res.status(404).send('no landmark found');
            }
        });
    });

    landmarkRouter.route('/:landmarkId/addlike')
        .patch(function(req, res) {
            if (req.body._id)
                delete req.body._id;

            req.landmark.Likes = req.landmark.Likes + 1;

            req.landmark.save(function(err) {
                if (err)
                    return res.status(406).send("You can't like this landmark !!!");
                else {
                    return res.status(201).send("Congratulations, you are liker number: " + req.landmark.Likes.toString());
                }
            });
        });

    landmarkRouter.route('/:landmarkId/deletelike')
        .patch(function(req, res) {
            if (req.body._id)
                delete req.body._id;

            req.landmark.Likes = req.landmark.Likes - 1;

            req.landmark.save(function(err) {
                if (err)
                    return res.status(406).send("You can't like this landmark !!!");
                else {
                    return res.status(201).send("Congratulations, you are liker number: " + req.landmark.Likes.toString());
                }
            });
        });

    landmarkRouter.route('/:landmarkId')
        .get(function(req, res) {
            res.json(req.landmark);
        });
    /*.patch(function(req,res){
        if(req.body._id)
            delete req.body._id;

        req.landmark.Likes = req.landmark.Likes+1;

        req.landmark.save(function(err){
            if(err)
                return res.status(406).send("You can't like this landmark !!!");
            else{
                return res.status(201).send("Congratulations, you are liker number: " + req.landmark.Likes.toString());
            }
        });
    });*/
    return landmarkRouter;
};

module.exports = routes;
