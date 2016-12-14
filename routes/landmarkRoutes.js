var express = require('express');

var routes = function(Landmark) {
    var landmarkRouter = express.Router();
    landmarkRouter.route('/')
        .post(function(req, res) {
            var landmark = new Landmark(req.body);

            landmark.save(function(err) {
                if (err) {
                    var errorMessage = err;
                    var message0 = "Missing: ";
                    if (errorMessage.errors.Name) message0 += "Name,";
                    if (errorMessage.errors.Description) message0 += "Description,";
                    if (errorMessage.errors.Type) message0 += "Type,";
                    if (errorMessage.errors.Lat) message0 += "Lat,";
                    if (errorMessage.errors.Long) message0 += "Long,";
                    if (errorMessage.errors.Country) message0 += "Country,";
                    if (errorMessage.errors.ImageURLBig) message0 += "ImageURLBig,";

                    var jsonfail = {
                        "awnser": "Failed to create json",
                        "message": message0
                    };
                    return res.status(406).json(jsonfail);
                } else {
                    var message = "id: " + landmark._id;
                    var json = {
                        "awnser": "Successfully created landmark",
                        "message": message
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
