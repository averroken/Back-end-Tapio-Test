var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    password: String,
    token: {type: String, default: 'null' }
    // TODO: add tokenCreationDate
    // TODO: add tokenExpireDate
    // TODO: add authentication method
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
