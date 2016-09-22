'use strict'
require('./input-watcher');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 8000;

app.use(express.static(__dirname + '/public'));

require('./routes')(app, io);

http.listen(port, function(){
	console.log('App listening on port: '+ port);
});