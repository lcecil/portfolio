'use strict';

var express = require('express');
var app = express();
var staticDirectory = express.static('app');

app.use('/', staticDirectory);

app.listen(80, function() {
  console.log("The server is running on port 80.");
});
