'use strict';

var fs = require('fs');
var fileValidator = require('./fileValidator.js');
var parseFile = require('./../transform/parseFile.js');
var inputFilePath = '/../../data/in/test.dat';

module.exports = {

	readInputFile: function(inputFilePath){
		try{
			var inputFileName = fileValidator.findFileName(inputFilePath);
			if(fileValidator.fileNameValidation(inputFileName)){
				if(fileValidator.fileExtensionVerification(inputFileName)){
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
