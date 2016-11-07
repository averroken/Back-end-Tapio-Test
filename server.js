const restify = require('restify');
var host = process.env.HOST || 'localhost';
var port = process.env.PORT || 8080;

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

server.listen(port, host, function () {
  console.log('%s listening at %s', server.name, server.url);
});
