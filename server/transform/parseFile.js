'use strict';

var extract = require('./../extract/extract.js');
var validate = require("validate.js");

const NEWLINE_SEPARATOR_FROM_FILE = '\n';
const SEPARATOR_OF_FIELDS_FOR_LINE = 'ç';
const SALE_ID = '003';
const POSITION_IN_SPLIT_FOR_ID = 0;
const POSITION_IN_SPLIT_FOR_DOC_CODE = 1;
const POSITION_IN_SPLIT_FOR_NAME = 2;
const POSITION_IN_SPLIT_FOR_SALE_INFO = 2;
const POSITION_IN_SPLIT_FOR_SALESMAN_NAME = 3;
const POSITION_IN_SPLIT_FOR_3TH_INFO = 3;

module.exports = {

	parseLinesFromInputFile: function(filePath){
		try{
			var contentFromFileSplittedInLines = lineSeparator(filePath);
			var structLinesParsed = [];
			contentFromFileSplittedInLines.forEach(function(line){
				structLinesParsed.push(createStructFromSeparatingElementsFromLine(line));
			});
		}catch(err){
			throw err;
		}
		return structLinesParsed;
	}
}

function lineSeparator(filePath){
	return receiveRawDataFromFileRead(filePath).split(NEWLINE_SEPARATOR_FROM_FILE);	
}

function receiveRawDataFromFileRead(filePath){
	return extract.readInputFile(filePath);
}

function separateDifferentElementsFromLine(inputLine){
	return inputLine.split(SEPARATOR_OF_FIELDS_FOR_LINE);
}

function createStructFromSeparatingElementsFromLine(inputLine){
	var lineParsed = separateDifferentElementsFromLine(inputLine);
	if(lineParsed[POSITION_IN_SPLIT_FOR_ID] == SALE_ID)
		return {
			id: lineParsed[POSITION_IN_SPLIT_FOR_ID],
			documentCode: lineParsed[POSITION_IN_SPLIT_FOR_DOC_CODE],
			saleInfo: lineParsed[POSITION_IN_SPLIT_FOR_SALE_INFO], 
			salesmanName: lineParsed[POSITION_IN_SPLIT_FOR_SALESMAN_NAME]
		};
	else			
		return {
			id: lineParsed[POSITION_IN_SPLIT_FOR_ID],
			documentCode: lineParsed[POSITION_IN_SPLIT_FOR_DOC_CODE],
			name: lineParsed[POSITION_IN_SPLIT_FOR_NAME], 
			thirdInfo: lineParsed[POSITION_IN_SPLIT_FOR_3TH_INFO]
		};
}
