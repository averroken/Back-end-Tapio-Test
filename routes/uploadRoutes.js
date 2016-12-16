var express = require('express');
var app = express();
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
module.exports = function (app) {
    app.post('/upload', upload.any(), function (req, res) {
        var landmarkId = req.params.landmarkId;
        console.log('LandmarkId given is: ' + landmarkId);
        if(landmarkId) {
            Landmark.findOne({
                _id: landmarkId
            }, function (err, landmark) {
                console.log('Landmark found is: ' + landmark.Name);
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
            res.status(404);
            console.log("There is no landmarkId given");
        }
    });
}

