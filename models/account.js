var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: {type: String, required: true, default: 'null'},
    socialUsername: {type: String, required: false, default: 'null'},
    password: {type: String},
    token: {type: String, unique: true, default: 'null' },
    socialLoginId: {type: String, default: 'null', unique: true},
    userCreatedDate: {type: Date, default: Date.now},
    authenticationMethod: {type: String, required: true},
    tokenCreationDate: {type: Date},
    tokenExpireDate: {type: Date},
    PasswordChangedDate: {type: Date, default:Date.now}
    // TODO: add tokenCreationDate::
    // TODO: add tokenExpireDate::
    // TODO: add PasswordChangedDate::DONE
});
//Worst
Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
