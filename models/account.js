var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: {type: String, required: true, default: 'null'},
    email: { type: String, required: true, unique:true },
    socialUsername: {type: String, required: false, default: 'null'},
    password: {type: String},
    token: {type: String, unique: true, default: 'null' },
    socialLoginId: {type: String, default: 'null', unique: true},
    userCreatedDate: {type: Date, default: Date.now},
    authenticationMethod: {type: String, required: true},
    tokenCreationDate: {type: Date},
    tokenExpireDate: {type: Date},
    PasswordChangedDate: {type: Date, default:Date.now},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    refreshToken: {type:String, unique: true, default: 'null'},
    refreshTokenExpires: {type: Date, default: Date.now},
    refreshTokenCreated: {type: Date, default:Date.now},
    name: {type: String},
    firstName: {type: String},
    gameCash: {type: Number, required: true,default: 0},
    level: {type: Number, required: true, default: 1},
    experience: {type: Number, required: true, default: 0},
    image: {type: String, default: "Dit is dummy Shit"},
    favourites: [{
        landmarkID: String
    }]
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
