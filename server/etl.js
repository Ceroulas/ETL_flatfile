'use strict';

const extract = require('./extract/extract.js');
const transform = require('./transform/transform.js');
const load = require('./load/write-file.js');
const fileValidator = require('./file-validator.js');
const etlLog = require('./log/etl-log.js');

const inputFilePath = __dirname+'/../data/in/test.dat';
const outputFilePath = __dirname+'/../data/out/test.done.dat';

function flatFileResumer(inputFilePath, outputFilePath) {
	try{

		if(fileValidator.fileValidation(inputFilePath)){

			var contentFromFileRead = extract.readInputFile(inputFilePath);
			var resumedFileStruct = transform.transformFlatFile(contentFromFileRead);		

			load.writeFileInOutputFolder(outputFilePath, resumedFileStruct);
		}
	}catch(err){
		//etlLog.writeToLog('error', err);
		throw err
	}
		
}

module.exports.flatFileResumer = flatFileResumer;