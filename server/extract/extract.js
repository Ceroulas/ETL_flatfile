'use strict';

var fs = require('fs');
var extractValidator = require('./extractvalidator.js');
var parseFile = require('./../transform/parsefile.js');
var inputFilePath = '/../../data/in/test.dat';

module.exports = {

	readInputFile: function(inputFilePath){
		try{
			var inputFileName = extractValidator.findFileName(inputFilePath);
			if(extractValidator.fileNameValidation(inputFileName)){
				if(extractValidator.fileExtensionVerification(inputFileName)){
					var contentFromFile =  fs.readFileSync(inputFilePath).toString();
					parseFile.parseLinesFromInputFile(contentFromFile);
				}else{
					throw new Error('Not a .dat file!');
				}
			}else{
				throw new Error('Not a valid file name!');
			}
		}catch(err){
			throw err;
		}
		return contentFromFile;
	}
};
