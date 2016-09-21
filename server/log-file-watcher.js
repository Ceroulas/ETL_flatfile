'use strict';
const Tail = require('always-tail');
const validFileName  = require('./file-validator');

module.exports = {
	
	tailFile: function(io, fileInputName){
		if(fileInputName !== undefined){
			
			let	fileOutputName = validFileName.findOuputFileName(fileInputName);
			let fileLogPath = __dirname+'/log/logs/'+fileOutputName+ '.log';
			let tail = new Tail(fileLogPath, '\n');
			
			tail.on('line', function(data) {
				io.of('/log').emit('get msg',data.toString()+'\n');
			}).on('error', function(data) {
			  console.log("error:", data);
			}).watch();
		}
	}	
}