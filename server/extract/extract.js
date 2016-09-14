'use strict';

var fs = require('fs');

module.exports = {

	readInputFile: function(inputFilePath){
		try {
			return fs.readFileSync(inputFilePath).toString();			
		} catch (err) {
			throw err;
		}
	}
}

/*var callValidatorsForFile = function (inputFilePath) {
	if ( extractValidator.fileNameValidation(inputFilePath) ) {
		return callExtensionValidator(inputFilePath);
	} else throw new Error('Not a valid file name!');
}

var callExtensionValidator = function (inputFilePath) {
	if ( extractValidator.fileExtensionVerification(inputFilePath) ) {
		return true;
	} else throw new Error('Not a .dat file!');
}*/