'use strict';

const extract = require('./../../extract/extract.js');
const fillRegisters = require('./../fill-registers.js');
const writeFile = require('./../../load/write-file.js');
const fileParserValidator = require('./file-parser-validator.js');
const etlLog = require('./../../log/etl-log.js');

const NEWLINE_SEPARATOR_FROM_FILE = '\n';
const SEPARATOR_OF_FIELDS_FOR_LINE = 'ç';
const POSITION_IN_SPLIT_FOR_ID = 0;
const POSITION_IN_SPLIT_FOR_DOC_CODE = 1;
const POSITION_IN_SPLIT_FOR_3TH_ITEM = 2;
const POSITION_IN_SPLIT_FOR_4TH_ITEM = 3;

module.exports = {

	parseLinesFromInputFile: function (contentFromFile) {
		try{		
			var stringSplittedInLines = lineSeparator(contentFromFile);
			return parsedFileStruct(stringSplittedInLines);	
		
		}catch(err){
			etlLog.writeToLog('error', err);
		}
	}
}

function parsedFileStruct (stringSplittedInLines) {
	var structOfLinesParsed = [];
	
	stringSplittedInLines.map(function(line, index){
		if(fileParserValidator.validateLineSeparator(line, index, SEPARATOR_OF_FIELDS_FOR_LINE)){
			var lineParsed = parseLine(line);
	
			structOfLinesParsed = validateItemsFromLine(lineParsed, index , structOfLinesParsed);
		}
	});
	return structOfLinesParsed;
}

function validateItemsFromLine ( lineParsed, index , structOfLinesParsed ){
	let validElements = fileParserValidator.validateElementsFromParsedLine(lineParsed, index);
	return (validElements ? structOfLinesParsed.concat(lineParsed): structOfLinesParsed);
}

function parseLine (line) {
	var lineParsed = separateDifferentElementsFromLine(line);
	return createStructFromElementsFromLine(lineParsed);
}

function lineSeparator (contentFromFile) {
	return contentFromFile.split(NEWLINE_SEPARATOR_FROM_FILE);	
}

function separateDifferentElementsFromLine (line) {
	return line.split(SEPARATOR_OF_FIELDS_FOR_LINE);
}

function createStructFromElementsFromLine (lineParsed) {
	return {
		id: lineParsed[POSITION_IN_SPLIT_FOR_ID],
		documentCode: lineParsed[POSITION_IN_SPLIT_FOR_DOC_CODE],
		thirdItem: lineParsed[POSITION_IN_SPLIT_FOR_3TH_ITEM], 
		fourthItem: lineParsed[POSITION_IN_SPLIT_FOR_4TH_ITEM]
	};
}


