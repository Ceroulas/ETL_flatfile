'use strict';

var validFileName  = require('valid-filename');

module.exports = {
	
	fileValidation: function(inputPathFile){
		try{
			return (fileExtensionVerification(inputPathFile) && fileNameValidation(inputPathFile));
		}catch(err){
			throw err;
		}
	}
}

function fileExtensionVerification (inputPathFile) {
	if(verifyIfDatFile(findFileName(inputPathFile)))
		return true;
	else
		throw new Error('Not a .dat file!');
}

function fileNameValidation (inputPathFile) {
	if(testForValidFileName(findFileName(inputPathFile)))
		return true;
	else
		throw new Error('Not a valid file name!');
}

function findFileName (inputPathFile) {
	return inputPathFile.split(/(\\|\/)/g).pop();
}	

function verifyIfDatFile (inputFileName) {
	return (fileExtension(inputFileName) !== 'dat') ? false : true;
}

function fileExtension (fileName) {
	return fileName.split('.').pop();
}

function testForValidFileName (inputFileName) {
	return validFileName(inputFileName);
}