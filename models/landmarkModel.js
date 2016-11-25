
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var landmarkModel = new Schema({
    Name: {type: String, required: true},
    Type: {type: String, required: true},
    Description: {type: String, required: true},
    Visits: {type: Number, required: false},
    Likes: {type: Number, required: false},
    Lat: {type: Number, required: true},
    Long: {type: Number, required: true},
    Country: {type: String, required: true},
    Province: {type: String, required: true},
    ImageURLBig: {type: String, required: true}
});

module.exports = mongoose.model('Landmark', landmarkModel);