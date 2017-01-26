var express = require('express');

var routes = function (Account) {
    var accountRouter = express.Router();
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
        "profile": [
            {
                "_id": "5852e9262c59172e3c7ca7b0",
                "email": "averroken100@gmail.com",
                "image": "Dit is dummy Shit",
                "experience": 0,
                "level": 1,
                "gameCash": 0,
                "socialUsername": "null",
                "username": "user"
            }
        ]
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
     @apiParam email <code>email</code> is optional to change the <code>Account</code>
     @apiParam image <code>image</code> is optional to change the <code>Account</code>
     @apiParam experience <code>experience</code> is optional to change the <code>Account</code>
     @apiParam level <code>level</code> is optional to change the <code>Account</code>
     @apiParam gameCash <code>gameCash</code> is optional to change the <code>Account</code>
     @apiParam socialUsername <code>socialUsername</code> is optional to change the <code>Account</code>
     @apiParam username <code>username</code> is optional to change the <code>Account</code>

     @apiSuccess Account <code>Account</code> is shown.

     @apiSuccessExample Example success response:
     {
        "Succeed": "Account succesfully updated by ID"
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
                "socialUsername": 1,
                "username": 1,
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