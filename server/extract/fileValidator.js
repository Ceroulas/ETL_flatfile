'use strict';

var validFileName  = require('valid-filename');

module.exports = {
	//VERIFICAR
	/*findFileName: function(inputPathFile){
		return inputPathFile.split(/(\\|\/)/g).pop();
	},
	//VERIFICAR
	fileWithoutExtension: function(fileName){
		return fileName.substring(fileName.lastIndexOf('/')+1, fileName.lastIndexOf('.'));
	},*/

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