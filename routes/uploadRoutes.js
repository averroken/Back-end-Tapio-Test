/**
 * Created by DarthSwedo on 12/15/2016.
 */
    //Test uploading image

var multer  =   require('multer');
var express = require('express');
var routes = function (Landmark) {
    var landmarkRouter = express.Router();
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './uploads');
        },
        filename: function (req, file, callback) {
            callback(null, file.fieldname + '-' + Date.now());
        }
    });
    var upload = multer({storage: storage}).single('userPhoto');

    landmarkRouter.route('/api/uploadfile').get(function (req, res) {
        console.log("Directory: " + __dirname);
        res.sendFile(__dirname + "/views/index.jade");
    });

    landmarkRouter.route('/api/photo').post(function (req, res) {
        upload(req, res, function (err) {
            if (err) {
                console.log("Error: " + err);
                return res.end("Error uploading file.");
            }
            res.end("File is uploaded");
        });
    });
}

module.exports = routes;