'use strict';
const multer = require('multer');
const watch = require('watch');
const fs = require('fs');

const pathOut = __dirname+'/../data/out/';

var storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, __dirname+'/../data/in/');
	},
	filename: function(req, file, cb){
		cb(null, file.originalname);
	}
});

var upload = multer({ storage: storage});

module.exports = function(app, io) {

	app.post('/fileUpload', upload.any(), function(req, res){
		watch.createMonitor(pathOut, function(monitor){
			monitor.once("created", function(file, stat){
				console.log('File created: '+ file);
				res.sendFile(file);
			});
		});

	});

	io.on('connection', function(socket){
		console.log('ENTREU NO connection')
		var fileLogPath = __dirname+'/etl.log';
		var readStream = fs.createReadStream(fileLogPath);

  		// This will wait until we know the readable stream is actually valid before piping
  		readStream.on('data', function (chunk) {
    		console.log(chunk.toString());
    		//Sending message to Specific user
  			io.emit('get msg',chunk.toString());
  		});	
	});
	

}