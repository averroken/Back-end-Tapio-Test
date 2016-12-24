var express = require('express');

var routes = function (Account) {
    var accountRouter = express.Router();

    /**
     @api {post} api/account/ Post account
     @apiName Post account
     @apiGroup Account
     @apiDescription A route to post one <code>Account</code> from the database, based on given <code>Id</code>.

     @apiParam token <code>token</code> is required
     @apiParam email <code>email</code> is required to find one <code>Account</code>
     @apiParam gameCash <code>gameCash</code> is optional to find one <code>Account</code>
     @apiParam level <code>level</code> is optional to find one <code>Account</code>
     @apiParam experience <code>experience</code> is optional to find one <code>Account</code>
     @apiParam image <code>image</code> is optional to find one <code>Account</code>
     @apiParam name <code>name</code> is optional to find one <code>Account</code>
     @apiParam firstname <code>firstname</code> is optional to find one <code>Account</code>

     @apiSuccess Account <code>Account</code> is shown.

     @apiSuccessExample Example success response:
     {
        "Succeed": "Account succesfully created"
     }

     @apiError No_token No <code>token</code> provided. <code>token</code> is required.
     @apiError Wrong_token Failed to authenticate <code>token</code>.
     @apiError Not_found Statuscode <code>404</code> and message "<code>no landmark found</code>" are returned.
     **/
    /**
     @api {get} api/account/ get account
     @apiName get account
     @apiGroup Account
     @apiDescription A route to get one <code>Account</code> from the database, based on given <code>Id</code>.

     @apiParam token <code>token</code> is required
     @apiParam email <code>email</code> is required to find one <code>Account</code>
     @apiParam gameCash <code>gameCash</code> is optional to find one <code>Account</code>
     @apiParam level <code>level</code> is optional to find one <code>Account</code>
     @apiParam experience <code>experience</code> is optional to find one <code>Account</code>
     @apiParam image <code>image</code> is optional to find one <code>Account</code>
     @apiParam name <code>name</code> is optional to find one <code>Account</code>
     @apiParam firstname <code>firstname</code> is optional to find one <code>Account</code>

     @apiSuccess Account <code>Account</code> is shown.

     @apiSuccessExample Example success response:
     {
         "_id" : ObjectId("5852e9262c59172e3c7ca7b0"),
         "salt" : "a796c1687e6f3bda5fe2f4abeeee4dde6ea800436f3fb5f16ab9f7f25cee7ee4",
         "hash" : "24ebf533127ade1e6bafaa053633437c6706b39bd2abd91ad883bd9a8b17cc509cbe2d0b9bf2e3492ed6da7e21f31399aae91dccb06a5707d44dec671cdc05eec0bbd70155ffa8cf75b697f9d7cb7959908ca26a6f7a6d4b0b3bd979c97c4a485ae9112470a2a8cb29fc3848d5243bd22389ddd14e02077522aba204a7c9e9c6f385c989a13dba02f58257e16a9210a1e3762dabeba1c423ebbd5c3571f5933f839e8641e560f0dbe6cd784f72a4c3c580c60f84a788aa9f27351da12c407436bd9bfdd8099266b353e2c55a6b6d6d8fe1823ad5ff847f52d9d4037337fdf9f0e33314df667281c2126be5f8fdf2b75e0bd3a70eed4ccc627b257419cb419c1bb3d06593f0d7bfdc1b09ec07cd2dc4f2ca0b7e981f89d12cd21fe23db3eb4775ea05554c9869c439c44f233df2d8efaf820494d5539063b0c276365e11a9be414344df9833ce4bca52cf2ac0cd99c30bd59a13288088404735b730467a3255b2aef06338f5ce4b37e5054678c90d103504f71e04ae0aaf4d5219dd8042e0af99e0b416df876b9cb963c0035d03bf508def9d148ab2f8681b5aa1ec5edf24a218e092318fd6fd94cb9850638aa385ca50e4a86ed78ed9bb623b8ff7617b452e0196b5652add698fe9293f393fd15986528cd509a92875e056c1abf0b665f0d8184b58aaa1e777b2c10dfe2bc0babf00d6df9a4382cc1d2a8c96e26cf044075d98",
         "email" : "averroken100@gmail.com",
         "authenticationMethod" : "Local",
         "favourites" : [
             {
                 "landmarkID" : 666,
                 "_id" : ObjectId("5852f389e6c4911854951ba5")
             }
         ],
         "image" : "Dit is dummy Shit",
         "experience" : 0,
         "level" : 1,
         "gameCash" : 0,
         "refreshTokenCreated" : ISODate("2016-12-15T19:04:06.393Z"),
         "refreshTokenExpires" : ISODate("2016-12-15T19:04:06.392Z"),
         "refreshToken" : "null",
         "PasswordChangedDate" : ISODate("2016-12-15T19:04:06.392Z"),
         "userCreatedDate" : ISODate("2016-12-15T19:04:06.392Z"),
         "socialLoginId" : "null",
         "token" : "null",
         "socialUsername" : "null",
         "username" : "user",
         "__v" : 5
     }


     @apiError No_token No <code>token</code> provided. <code>token</code> is required.
     @apiError Wrong_token Failed to authenticate <code>token</code>.
     @apiError Not_found Statuscode <code>404</code> and message "<code>no landmark found</code>" are returned.
     **/
    accountRouter.route('/')
        .post(function(req, res){
            var book = new Account(req.body);
            book.save();
            //res.status(201).send(book);
            return res.json({
                "Succeed": "Account succesfully created"
            });
        })
        .get(function(req,res){

            var query = {};

            if(req.query.genre)
            {
                query.genre = req.query.genre;
            }

            Account.find(query, function(err,books){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(books);
            });
        });

        accountRouter.use('/:accountId', function(req,res,next){
            Account.findById(req.params.accountId, function(err,account){
                if(err)
                    res.status(500).send(err);
                else if(account)
                {
                    req.account = account;
                    next();
                }
                else
                {
                    res.status(404).send('no account found');
                }
            });
        });

    /**
     @api {get} {accountId} get account by ID
     @apiName Get account by ID
     @apiGroup Account
     @apiDescription A route to get one <code>Account</code> from the database, based on given <code>Id</code>.

     @apiParam token <code>token</code> is required
     @apiParam accountId <code>accountId</code> is required to find one <code>Account</code>

     @apiSuccess Account <code>Account</code> is shown.

     @apiSuccessExample Example success response:
     {
         "_id" : ObjectId("5852e9262c59172e3c7ca7b0"),
         "salt" : "a796c1687e6f3bda5fe2f4abeeee4dde6ea800436f3fb5f16ab9f7f25cee7ee4",
         "hash" : "24ebf533127ade1e6bafaa053633437c6706b39bd2abd91ad883bd9a8b17cc509cbe2d0b9bf2e3492ed6da7e21f31399aae91dccb06a5707d44dec671cdc05eec0bbd70155ffa8cf75b697f9d7cb7959908ca26a6f7a6d4b0b3bd979c97c4a485ae9112470a2a8cb29fc3848d5243bd22389ddd14e02077522aba204a7c9e9c6f385c989a13dba02f58257e16a9210a1e3762dabeba1c423ebbd5c3571f5933f839e8641e560f0dbe6cd784f72a4c3c580c60f84a788aa9f27351da12c407436bd9bfdd8099266b353e2c55a6b6d6d8fe1823ad5ff847f52d9d4037337fdf9f0e33314df667281c2126be5f8fdf2b75e0bd3a70eed4ccc627b257419cb419c1bb3d06593f0d7bfdc1b09ec07cd2dc4f2ca0b7e981f89d12cd21fe23db3eb4775ea05554c9869c439c44f233df2d8efaf820494d5539063b0c276365e11a9be414344df9833ce4bca52cf2ac0cd99c30bd59a13288088404735b730467a3255b2aef06338f5ce4b37e5054678c90d103504f71e04ae0aaf4d5219dd8042e0af99e0b416df876b9cb963c0035d03bf508def9d148ab2f8681b5aa1ec5edf24a218e092318fd6fd94cb9850638aa385ca50e4a86ed78ed9bb623b8ff7617b452e0196b5652add698fe9293f393fd15986528cd509a92875e056c1abf0b665f0d8184b58aaa1e777b2c10dfe2bc0babf00d6df9a4382cc1d2a8c96e26cf044075d98",
         "email" : "averroken100@gmail.com",
         "authenticationMethod" : "Local",
         "favourites" : [
             {
                 "landmarkID" : 666,
                 "_id" : ObjectId("5852f389e6c4911854951ba5")
             }
         ],
         "image" : "Dit is dummy Shit",
         "experience" : 0,
         "level" : 1,
         "gameCash" : 0,
         "refreshTokenCreated" : ISODate("2016-12-15T19:04:06.393Z"),
         "refreshTokenExpires" : ISODate("2016-12-15T19:04:06.392Z"),
         "refreshToken" : "null",
         "PasswordChangedDate" : ISODate("2016-12-15T19:04:06.392Z"),
         "userCreatedDate" : ISODate("2016-12-15T19:04:06.392Z"),
         "socialLoginId" : "null",
         "token" : "null",
         "socialUsername" : "null",
         "username" : "user",
         "__v" : 5
     }


     @apiError No_token No <code>token</code> provided. <code>token</code> is required.
     @apiError No_accountId No <code>accountId</code> provided. <code>accountId</code> is required.
     @apiError Wrong_token Failed to authenticate <code>token</code>.
     @apiError Not_found Statuscode <code>404</code> and message "<code>no landmark found</code>" are returned.
     **/
    /**
     @api {patch} {accountId} Patch account by ID
     @apiName Patch account by ID
     @apiGroup Account
     @apiDescription A route to get one <code>Account</code> from the database, based on given <code>Id</code>.

     @apiParam token <code>token</code> is required
     @apiParam accountId <code>accountId</code> is required to find one <code>Account</code>

     @apiSuccess Account <code>Account</code> is shown.

     @apiSuccessExample Example success response:
     {
         "_id" : ObjectId("5852e9262c59172e3c7ca7b0"),
         "salt" : "a796c1687e6f3bda5fe2f4abeeee4dde6ea800436f3fb5f16ab9f7f25cee7ee4",
         "hash" : "24ebf533127ade1e6bafaa053633437c6706b39bd2abd91ad883bd9a8b17cc509cbe2d0b9bf2e3492ed6da7e21f31399aae91dccb06a5707d44dec671cdc05eec0bbd70155ffa8cf75b697f9d7cb7959908ca26a6f7a6d4b0b3bd979c97c4a485ae9112470a2a8cb29fc3848d5243bd22389ddd14e02077522aba204a7c9e9c6f385c989a13dba02f58257e16a9210a1e3762dabeba1c423ebbd5c3571f5933f839e8641e560f0dbe6cd784f72a4c3c580c60f84a788aa9f27351da12c407436bd9bfdd8099266b353e2c55a6b6d6d8fe1823ad5ff847f52d9d4037337fdf9f0e33314df667281c2126be5f8fdf2b75e0bd3a70eed4ccc627b257419cb419c1bb3d06593f0d7bfdc1b09ec07cd2dc4f2ca0b7e981f89d12cd21fe23db3eb4775ea05554c9869c439c44f233df2d8efaf820494d5539063b0c276365e11a9be414344df9833ce4bca52cf2ac0cd99c30bd59a13288088404735b730467a3255b2aef06338f5ce4b37e5054678c90d103504f71e04ae0aaf4d5219dd8042e0af99e0b416df876b9cb963c0035d03bf508def9d148ab2f8681b5aa1ec5edf24a218e092318fd6fd94cb9850638aa385ca50e4a86ed78ed9bb623b8ff7617b452e0196b5652add698fe9293f393fd15986528cd509a92875e056c1abf0b665f0d8184b58aaa1e777b2c10dfe2bc0babf00d6df9a4382cc1d2a8c96e26cf044075d98",
         "email" : "averroken100@gmail.com",
         "authenticationMethod" : "Local",
         "favourites" : [
             {
                 "landmarkID" : 666,
                 "_id" : ObjectId("5852f389e6c4911854951ba5")
             }
         ],
         "image" : "Dit is dummy Shit",
         "experience" : 0,
         "level" : 1,
         "gameCash" : 0,
         "refreshTokenCreated" : ISODate("2016-12-15T19:04:06.393Z"),
         "refreshTokenExpires" : ISODate("2016-12-15T19:04:06.392Z"),
         "refreshToken" : "null",
         "PasswordChangedDate" : ISODate("2016-12-15T19:04:06.392Z"),
         "userCreatedDate" : ISODate("2016-12-15T19:04:06.392Z"),
         "socialLoginId" : "null",
         "token" : "null",
         "socialUsername" : "null",
         "username" : "user",
         "__v" : 5
     }


     @apiError No_token No <code>token</code> provided. <code>token</code> is required.
     @apiError Wrong_token Failed to authenticate <code>token</code>.
     @apiError No_accountId No <code>accountId</code> provided. <code>accountId</code> is required.
     @apiError Not_found Statuscode <code>404</code> and message "<code>no landmark found</code>" are returned.
     **/
    accountRouter.route('/:accountId')
        .get(function (req, res) {

            var query = {};

            Account.find(query, {
                "email": 1,
                "name": 1,
                "firstName": 1,
                "gameCash": 1,
                "level": 1,
                "experience": 1,
                "image": 1
            }, function (err, profile) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json({
                        "profile": profile
                    });
            });
        })
        .patch(function (req, res) {

            if (req.body._id)
                delete req.body._id;

            for (var p in req.body) {
                req.account[p] = req.body[p];
            }

            req.account.save(function (err) {
                if (err)
                    return res.status(406).send("Update Failed !");
                else {
                    //return res.status(201).send("Update succeeded");
                    return res.json({
                        "Succeed": "Account succesfully modified"
                    });
                }
            });
        });

    /**
     @api {patch} {accountId}/addFavouriteLandmark?landmarkid={landmarkid} Add Favorite Landmark
     @apiName Add Favorite Landmark
     @apiGroup Account
     @apiDescription A route to patch one <code>favorite landmark</code> from the database, based on given <code>Id</code>.

     @apiParam token <code>token</code> is required
     @apiParam accountId <code>accountId</code> is required to find one <code>Account</code>
     @apiParam landmarkid <code>landmarkid</code> is required to find one <code>Landmark</code>

     @apiSuccess Account <code>Account</code> is shown.

     @apiSuccessExample Example success response:
     {
        "Succeed": "Landmark succesfully added by your favourites"
     }

     @apiError No_token No <code>token</code> provided. <code>token</code> is required.
     @apiError No_accountId No <code>accountId</code> provided. <code>accountId</code> is required.
     @apiError Wrong_token Failed to authenticate <code>token</code>.
     @apiError Not_found Statuscode <code>404</code> and message "<code>no landmark found</code>" are returned.
     **/
    accountRouter.route('/:accountId/addFavouriteLandmark')
        /* Example API CALL */
        //localhost:1337/api/account/584fc0f39efc92183c26e857/addFavouriteLandmark?landmarkid=98745632222
        .patch(function(req, res) {
            Account.findById(req.params.accountId, function(err,account){
                if(err)
                    res.status(500).send(err);
                else if(account)
                {
                    req.account = account;
                    var landmarkid = req.query.landmarkid;
                    if(landmarkid){
                        req.account.favourites.push({"landmarkID": landmarkid});
                        //console.log(req.account.favourites);
                        req.account.save(function(err) {
                            if (err) {
                                //throw err;
                                return res.status(406).send("Adding ID to account is failed!");
                            }
                        });
                        return res.status(201).send("Update succeeded: " + req.query.landmarkid);
                    } else {
                        //res.status(406).send("I need the ID of the landmark you liked.");
                        return res.json({
                            "Succeed": "Landmark succesfully added by your favourites"
                        });
                    }
                }
                else
                {
                    res.status(404).send('no account found');
                }
            });
        });

    /**
     @api {patch} {accountId}/removeFavouriteLandmark?landmarkid={landmarkid} Remove Favorite Landmark
     @apiName Remove Favorite Landmark
     @apiGroup Account
     @apiDescription A route to patch one <code>favorite landmark</code> from the database, based on given <code>Id</code>.

     @apiParam token <code>token</code> is required
     @apiParam accountId <code>accountId</code> is required to find one <code>Account</code>
     @apiParam landmarkid <code>landmarkid</code> is required to find one <code>Landmark</code>

     @apiSuccess Account <code>Account</code> is shown.

     @apiSuccessExample Example success response:
     {
        "Succeed": "Landmark succesfully removed by your favourites"
     }

     @apiError No_token No <code>token</code> provided. <code>token</code> is required.
     @apiError No_accountId No <code>accountId</code> provided. <code>accountId</code> is required.

     @apiError Wrong_token Failed to authenticate <code>token</code>.
     @apiError Not_found Statuscode <code>404</code> and message "<code>no landmark found</code>" are returned.
     **/
    accountRouter.route('/:accountId/removeFavouriteLandmark')
        .patch(function(req, res) {
            Account.findById(req.params.accountId, function(err,account){
                if(err)
                    res.status(500).send(err);
                else if(account)
                {
                    req.account = account;
                    var landmarkid = req.query.landmarkid;
                    if(landmarkid){
                        var favourites = account.favourites;
                        var newfavorites = [];
                        //console.log(landmarkid);
                        for(var i = 0;i<favourites.length;i++){
                            var favorite = favourites[i];
                            //console.log(favorite.landmarkID);
                            if(favorite.landmarkID == landmarkid){
                                //console.log(i + ":" + favorite);
                            } else {
                                newfavorites.push(favorite);
                            }
                        }
                        //console.log(newfavorites);
                        account.favourites = newfavorites;
                        account.save(function(err) {
                            if (err) {
                                //throw err;
                                return res.status(406).send("Adding ID to account is failed!");
                            }
                        });
                        //return res.status(201).send("Update succeeded: " + req.query.landmarkid);
                        return res.json({
                            "Succeed": "Landmark succesfully removed by your favourites"
                        });
                    } else {
                        res.status(406).send("I need the ID of the landmark you liked.");
                    }
                }
                else
                {
                    res.status(404).send('no account found');
                }
            });
        });

    return accountRouter;
};

module.exports = routes;