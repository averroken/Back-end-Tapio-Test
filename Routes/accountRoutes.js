var express = require('express');

var routes = function (Account) {
    var accountRouter = express.Router();

    accountRouter.route('/')
        .post(function(req, res){
            var book = new Account(req.body);


            book.save();
            res.status(201).send(book);

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
                    return res.status(201).send("Update succeeded");
                }
            });
        });

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
                        res.status(406).send("I need the ID of the landmark you liked.");
                    }
                }
                else
                {
                    res.status(404).send('no account found');
                }
            });
        });

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
                        return res.status(201).send("Update succeeded: " + req.query.landmarkid);
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