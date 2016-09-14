'use strict';

var extract = require('./../extract/extract.js');
var fillRegisters = require('./fillregisters.js');
var writeFile = require('./../load/writefile.js');
var parseFileValidator = require('./parsefilevalidator.js');

var outputFilePath = __dirname+'/../../data/out/test.done.dat';

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
				if(parseFileValidator.validateString(stringSplittedInLines, SEPARATOR_OF_FIELDS_FOR_LINE )){
					var linesParsed = separateDifferentElementsFromLine(stringSplittedInLines);

					var structOfLinesParsed = createStructFromElementsFromLine(linesParsed);

					return structOfLinesParsed;
			}
		}catch(err){
			throw err;
		}
	}
}

var lineSeparator = function (contentFromFile) {
	return contentFromFile.split(NEWLINE_SEPARATOR_FROM_FILE);	
}

var separateDifferentElementsFromLine = function (linesFromInputFile) {
	var linesParsed = [];
	linesFromInputFile.forEach( function (line) {
		linesParsed.push(line.split(SEPARATOR_OF_FIELDS_FOR_LINE)); 
	});
	return linesParsed;
}

var createStructFromElementsFromLine = function (linesParsed) {
	var structOfLinesParsed = [];
	linesParsed.forEach( function(line) {
		structOfLinesParsed.push( {
			id: line[POSITION_IN_SPLIT_FOR_ID],
			documentCode: line[POSITION_IN_SPLIT_FOR_DOC_CODE],
			thirdItem: line[POSITION_IN_SPLIT_FOR_3TH_ITEM], 
			fourthItem: line[POSITION_IN_SPLIT_FOR_4TH_ITEM]
		});

	});
	return structOfLinesParsed;
}


