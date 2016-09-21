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
				res.status(201);
				res.send('Output file created successfully!');
			});
		});
	});

	app.get('/report', function(req, res){
		res.sendFile(fileOutputName);	
	});

	io.of('/log').on('connection', function(socket){
		
		console.log('User connected: ');
		let fileLogPath = __dirname+'/test.log';
			
		socket.on('disconnect', function(){
    		console.log('User disconnected: ');
  		});

		logFileWatcher.tailFile(io, fileInputName);
	});

}