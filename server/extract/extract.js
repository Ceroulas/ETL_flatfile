'use strict';

var readline = require('readline');
var fs = require('fs');
var filePath = __dirname+'../../data/in/test.dat';

module.exports = {

	readLineFromFlatFile: function(){
		lineReader.on('line', function (line) {
	  		console.log(line);	  		
		});
	}
};

function OpenFlatFile(){
	var inputFile = findFileName(filePath);
	var lineReader = createReadLineInterface();
}

function createReadLineInterface(){
	return readline.createInterface({ input: fs.createReadStream(inputFile)});
}

function findFileName(filePath){
	return filePath.split(/(\\|\/)/g).pop();
}