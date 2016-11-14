var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String},
    token: {type: String, unique: true, default: 'null' },
    socialLoginId: {type: String, default: 'null', unique: true},
    userCreatedDate: {type: Date, default: Date.now},
    authenticationMethod: {type: String, required: true}
    // TODO: add tokenCreationDate
    // TODO: add tokenExpireDate
    // TODO: add PasswordChangedDate
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
