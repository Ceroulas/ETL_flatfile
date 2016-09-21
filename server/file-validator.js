'use strict';

const validFileName  = require('valid-filename');

const ADD_ONE_INDEX = 1;

module.exports = {
	
	fileValidation: function(inputPathFile){
		try{
			return (fileExtensionVerification(inputPathFile) && fileNameValidation(inputPathFile));
		}catch(err){
			throw err;
		}
	},	

	findOuputFileName: function(inputPathFile){
		let inputFileName = findFileName(inputPathFile);
		let lastIndexSlach = inputFileName.lastIndexOf('/')+ADD_ONE_INDEX;
		let lastIndexPoint = inputFileName.lastIndexOf('.');

		return inputFileName.substring(lastIndexSlach, lastIndexPoint);
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