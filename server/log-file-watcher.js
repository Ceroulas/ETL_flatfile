'use strict';
const Tail = require('always-tail');
const validFileName  = require('./file-validator');

module.exports = {
	
	tailFile: function(io, fileInputName){
		console.log('FileName: '+fileInputName)
		if(fileInputName !== undefined){
			console.log('No tail')	
			let	fileOutputName = validFileName.findOuputFileName(fileInputName);
			let fileLogPath = __dirname+'/log/logs/'+fileOutputName+ '.log';
			let tail = new Tail(fileLogPath, '\n');
			
			tail.on('line', function(data) {
				console.log('emitindo')
				io.emit('get msg',data.toString()+'\n');
			}).on('error', function(data) {
			  console.log("error:", data);
			}).watch();
		}
	}	
}