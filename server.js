const restify = require('restify');
const uuid = require('uuid');
const _ = require('underscore');
var mongodb = require('mongodb');

var port = process.env.PORT || 8080;
var ObjectID = mongodb.ObjectID;
var COLLECTION = 'Test';
var db;


var server = restify.createServer({
  name: 'Things API server'
});

server.use(restify.queryParser());
server.use(restify.bodyParser());

server.use(function logger(req, res) {
  console.log(new Date(), req.method, req.url);
  next();
});

server.on('uncaughtExceeption', function (request, response, route, error) {
    console.error(error.stack);
    response.send(error);
});

var connection = process.env.MONGODB_URI;
//var connection = "mongodb://localhost:27017/Tapio";
mongodb.MongoClient.connect(connection, function(err, database){
    if(err){
        console.log(err);
        process.exit(1);
    }

    db = database;
    console.log("Database connection ready");

    server.listen(port, function () {
      console.log('listening on %s',server.url);
    });
});

function handleError(res, reason, message, code){
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error" : message});
}

server.get('/api', function(req, res) {
    db.collection(COLLECTION).find({}).toArray(function (err, docs) {
        if (err){
            handleError(res, err.message, "Failed to get api.");
        }else{
            res.status(200).json({"api":docs});
        }
    });
});
