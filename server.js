const restify = require('restify');
const uuid = require('uuid');
const _ = require('underscore');
var mongodb = require('mongodb');
const stormpathRestify = require('stormpath-restify');
var stormpathFilters = stormpathRestify.createFilterSet();
var oauthFilter = stormpathFilters.createOauthFilter();
var newAccountFilter = stormpathFilters.newAccountFilter();

var port = process.env.PORT || 8080;
var ObjectID = mongodb.ObjectID;
var COLLECTION = 'landmarks';
var db;


var server = restify.createServer({
  name: 'Things API server'
});

server.use(stormpath.init(server, {
  web: {
    oauth2: {
      password: {
        accessToken: {
          ttl: 3600
        }
      }
    }
  }
}));

server.use(restify.queryParser());
server.use(restify.bodyParser());

//server.use(function logger(req, res) {
//  console.log(new Date(), req.method, req.url);
//  next();
//});

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

server.get('/api', function(req, res, next) {
    db.collection(COLLECTION).find({}).toArray(function (err, docs) {
        //if (err){
        //    handleError(res, err.message, "Failed to get api.");
        //}else{
            res.send({"api":docs});
            return next();
        //}
    });
});

server.get('/auth', [oauthFilter, function(req, res) {
  db.collection(COLLECTION).find({}).toArray(function (err, docs) {
      //if (err){
      //    handleError(res, err.message, "Failed to get api.");
      //}else{
          res.send({"auth":docs});
          return next();
      //}
  });
}]);

server.post('/accounts', [newAccountFilter, function (req, res) {
  res.send({res});
}])
