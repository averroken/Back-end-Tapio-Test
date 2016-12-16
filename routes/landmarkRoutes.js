var express = require('express');
var wc = require('which-country');
//Image upload
var fs = require('fs');
var Landmark = require('../models/landmarkModel');
var multer = require('multer');
var upload = multer(
    {
        limits: {
            fieldNameSize: 999999999,
            fieldSize: 999999999
        },
        dest: 'uploads/' }
);
app.post('/upload', upload.any(), function (req, res) {
    var landmarkId = req.params.landmarkId;
    if(landmarkId) {
        Landmark.findOne({
            _id: landmarkId
        }, function (err, landmark) {

            console.log("file: " + req.files);

            var tmp_path = req.files[0].path;

            var target_path = 'uploads/' + req.files[0].originalname;

            var src = fs.createReadStream(tmp_path);
            var dest = fs.createWriteStream(target_path);
            src.pipe(dest);
            src.on('end', function () {
                res.send("ok: " + target_path);
            });
            src.on('error', function (err) {
                res.send({error: "upload failed"});
            });
            landmark.Image = target_path;
            res.status(201).send(landmark);
        });
    } else {
        res.status(500);
        console.log("There is no landmarkId given");
    }
});

var routes = function (Landmark) {
    var landmarkRouter = express.Router();
    landmarkRouter.route('/')
        .post(upload.any(),function (req, res) {
            var tmp_path = req.files[0].path;

            var target_path = 'uploads/' + req.files[0].originalname;
            var landmark = new Landmark(req.body);
            console.log('File name: ' + target_path);
            console.log('Landmark: ' + landmark.Name);
            var src = fs.createReadStream(tmp_path);
            var dest = fs.createWriteStream(target_path);
            src.pipe(dest);
            var lon = landmark.Long;
            var lat = landmark.Lat;
            landmark.Image = target_path;
            landmark.Country = wc([lon, lat]);
            console.log("Landmark is: " + landmark.country + "Lon : " + lon + "Lat : " + lat);
            landmark.save();
            res.status(201).send(landmark);
        })
        .get(function (req, res) {

            var query = {};

            Landmark.find(query, function (err, landmarks) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json({"landmarks" : landmarks});
            });
        });

    landmarkRouter.route('/test')
        .get(function (req, res) {

            // var query = Landmark.find({})
            //     //.select('-name')
            //     .select('-type')
            //     .select('-description')
            //     .select('-visits')
            //     .select('-likes');
            //
            // Landmark.find(query, function(err,landmarks){
            //     if(err)
            //         res.status(500).send(err);
            //     else
            //         res.json(landmarks);
            // });

            Landmark.find({}, {"long": 1, "lat": 1}, function (err, landmarks) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json({"landmarks" : landmarks});
            });
        });

    landmarkRouter.use('/:landmarkId', function (req, res, next) {
        Landmark.findById(req.params.landmarkId, function (err, landmark) {
            if (err)
                res.status(500).send(err);
            else if (landmark) {
                req.landmark = landmark;
                next();
            }
            else {
                res.status(404).send('no landmark found');
            }
        });
    });
    landmarkRouter.route('/:landmarkId')
        .get(function (req, res) {
            res.json(req.landmark);
        });

    return landmarkRouter;

};

module.exports = routes;
