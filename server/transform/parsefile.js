'use strict';

const extract = require('./../extract/extract.js');
const fillRegisters = require('./fillregisters.js');
const writeFile = require('./../load/writefile.js');
const parseFileValidator = require('./parsefilevalidator.js');

const outputFilePath = __dirname+'/../../data/out/test.done.dat';

const NEWLINE_SEPARATOR_FROM_FILE = '\n';
const SEPARATOR_OF_FIELDS_FOR_LINE = 'ç';
const SALE_ID = '003';
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
			throw err;
		}
	}
}

function parsedFileStruct (stringSplittedInLines) {
	var structOfLinesParsed = [];
	
	stringSplittedInLines.forEach(function(line, index){
		if(parseFileValidator.validateString(line, index, SEPARATOR_OF_FIELDS_FOR_LINE))
			structOfLinesParsed.push(parseLine(line));	
	});

	return structOfLinesParsed;
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


