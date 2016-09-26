'use strict';
const multer = require('multer');
const watch = require('watch');
const fs = require('fs');
const logFileWatcher = require('./log-file-watcher');

const pathOut = __dirname+'/../data/out/';

let fileOutputName;
let fileInputName;

let storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, __dirname+'/../data/in/');
	},
	filename: function(req, file, cb){
		fileInputName = file.originalname;
		console.log('2: '+fileInputName)
		cb(null, file.originalname);
	}
});

let upload = multer({ storage: storage});

module.exports = function(app, io) {

	app.post('/upload', upload.any(), function(req, res){
		watch.createMonitor(pathOut, function(monitor){
			monitor.once("created", function(file, stat){
				console.log('Output File created: '+ file);
				fileOutputName = file;
				res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
				res.setHeader('Access-Control-Allow-Methods', 'POST');
				res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
				res.status(201);
				res.send('Output file created successfully!');
			});
		});
	});

	app.get('/report', function(req, res){
		res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
		res.setHeader('Access-Control-Allow-Methods', 'GET');
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
		res.sendFile(fileOutputName);	
	});

	io.on('connection', function(socket){
		console.log('User connected: ');
		socket.on('disconnect', function(){
    		console.log('User disconnected: ');
  		});
		  
		logFileWatcher.tailFile(io, fileInputName);
	});

}