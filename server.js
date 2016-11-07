const express = require('express');
const stormpath = require('express-stormpath');

var app = express();

app.use(stormpath.init(app,{
  expand: {
    customData: true
  }
}));

app.get('/', stormpath.getUser, function(req, res) {
  res.status(200).send("Welcome");
})

app.on('stormpath.ready', function () {
  console.log('stormpath ready');
})

app.listen(process.env.PORT || 3000);
