var express = require('express');

var routes = function (Account) {
    var accountRouter = express.Router();

    accountRouter.use('/:accountId', function(req,res,next){
        Account.findById(req.params.accountId, function(err,account){
            if(err)
                res.status(500).send(err);
            else if(account)
            {
                for (var p in req.body) {
                    req.account[p] = req.body[p];
                }
                req.account = account;
                console.log(req.account);
                next();
            }
            else
            {
                res.status(404).send('no accountId found');
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

    return accountRouter;
};

module.exports = routes;