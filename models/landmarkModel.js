
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var landmarkModel = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    description: {type: String, required: true},
    visits: {type: Number, required: false},
    likes: {type: Number, required: false},
    lat: {type: Number, required: true},
    long: {type: Number, required: true}
});

module.exports = mongoose.model('Landmark', landmarkModel);