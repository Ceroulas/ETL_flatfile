'use strict';

var validFileName  = require('valid-filename');

module.exports = {
	
	findFileName: function(inputPathFile){
		return inputPathFile.split(/(\\|\/)/g).pop();
	},

	fileExtensionVerification(inputFileName){
		try{
			var isValidDatFile = verifyIfDatFile(inputFileName);
		}catch(err){
			throw err;
		}

		return isValidDatFile;
	},

	fileNameValidation(inputFileName){
		var isValidFileName = testForValidFileName(inputFileName);
		
		if(isValidFileName !== undefined)
			return isValidFileName;
		else
			throw new Error('No file was sent to validation!');
	}

}

function verifyIfDatFile(inputFileName){
	return (fileExtension(inputFileName) !== 'dat') ? false : true;
}

function fileExtension(fileName){
	return fileName.split('.').pop();
}

function testForValidFileName(inputFileName){
	return validFileName(inputFileName);
}