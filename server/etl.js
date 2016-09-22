'use strict';

const extract = require('./extract/extract.js');
const transform = require('./transform/transform.js');
const load = require('./load/write-file.js');
const fileValidator = require('./file-validator.js');
const etlLog = require('./log/etl-log.js');

function flatFileResumer(inputFilePath, outputPath) {
	try{
		
		if(fileValidator.fileValidation(inputFilePath)){
			let inputFileName = fileValidator.findOuputFileName(inputFilePath);
			etlLog.createLog(inputFileName);

			etlLog.writeToLog('info', ' :: '+flatFileResumer.name+' :: '+'Beginnig extraction of file.');
			let contentFromFileRead = extract.readInputFile(inputFilePath);
			etlLog.writeToLog('info', ' :: '+flatFileResumer.name+' :: '+'File extraction ended.');

			etlLog.writeToLog('info', ' :: '+flatFileResumer.name+' :: '+'Beginnig transform info from file.');
			let resumedFileStruct = transform.transformFlatFile(contentFromFileRead);
			etlLog.writeToLog('info', ' :: '+flatFileResumer.name+' :: '+'Transform info from file ended.');

			etlLog.writeToLog('info', ' :: '+flatFileResumer.name+' :: '+'Preparing to write output file resume.');
			let outputFilePath = outputPath + inputFileName + '.done.dat';
			load.writeFileInOutputFolder(outputFilePath, resumedFileStruct);

			etlLog.writeToLog('info', ' :: '+flatFileResumer.name+' :: '+'Ouput file resume created.');

			etlLog.writeToLog('info', ' :: '+flatFileResumer.name+' :: '+'Processing of file ended.');
		}
	}catch(err){
		etlLog.writeToLog('error', ' :: '+flatFileResumer.name+' :: '+err);
	}
		
}

module.exports.flatFileResumer = flatFileResumer;