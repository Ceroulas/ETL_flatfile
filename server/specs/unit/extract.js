'use strict';

var fs = require('fs');
var filePath = __dirname+'../../data/in/test.dat';
var readline = require('linebyline'),
	rl = readline(filePath);

module.exports = {

	lineReaded: function(line){
		console.log("lineReaded: "+line);
		//return line;
	},

	lineReaderOnEvent: function(InputFileToReadLine){
		console.log('Entrei');
		lineReader.on('line', function (line){
			console.log("AAAAAAAAAA")
			lineRead(line);	  		
		})
	}
};

function findFileName(InputFileToReadLine){
	return InputFileToReadLine.split(/(\\|\/)/g).pop();
}



