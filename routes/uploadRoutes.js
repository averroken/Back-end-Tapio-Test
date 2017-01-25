var express = require('express');
var app = express();
var fs = require('fs');
var Landmark = require('../models/landmarkModel');
var multer = require('multer');
var gulp = require('gulp');
var upload = multer({
    limits: {
        fieldNameSize: 999999999,
        fieldSize: 999999999
    },
    dest: 'uploads/'
});
require('../gulpfile.js');

module.exports = function(app) {
    /**
     @api {post} upload?landmarkId Upload Image
     @apiName Upload Image
     @apiGroup Upload an Image
     @apiDescription Route to handle the upload of an image.

     @apiParam {int} landmarkId The <code>landmarkId</code> of the landmark that the image is assigned to.
     */
    app.post('/upload', upload.any(), function(req, res) {
        var landmarkId = req.query.landmarkId || req.params.landmarkId;
        console.log('LandmarkId given is: ' + landmarkId);
        if (landmarkId) {
            Landmark.findOne({
                _id: landmarkId
            }, function(err, landmark) {
                if (!req.files) {
                    res.status(404).send({
                        message: "No image given"
                    });
                    return;
                }
                console.log('Landmark found is: ' + landmark.Name);
                console.log("file: " + req.files);

                var tmp_path = req.files[0].path;
                var target_path = 'uploads/' + req.files[0].originalname;
                var original_name = req.files[0].originalname;

                var src = fs.createReadStream(tmp_path);
                var dest = fs.createWriteStream(target_path);
                src.pipe(dest);
                src.on('end', function() {
                    process.env.original_name = original_name;
                    compressImages();
                    res.status(200);
                    res.send({
                        message: "ok: " + target_path
                    });
                });
                src.on('error', function(err) {
                    res.send({
                        error: "upload failed"
                    });
                });
                landmark.Image = target_path;
                landmark.save();
            });
        } else {
            res.status(404);
            console.log("There is no landmarkId given");
        }
    });
};

function compressImages() {
    gulp.start('saveAndOptimizeImage');
}
