'use strict';

const watchIn = require('./watch.js')

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));

require('./routes.js')(app, io);

http.listen(port, function(){
	console.log('App listening on port: '+ port);
});