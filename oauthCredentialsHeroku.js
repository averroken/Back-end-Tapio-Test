module.exports = {
    facebook:{
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret:process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: 'https://back-end-tapio-test.herokuapp.com/auth/facebook/callback'
    },
    google:{
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://127.0.0.1:1337/auth/google/callback'
    }
};
