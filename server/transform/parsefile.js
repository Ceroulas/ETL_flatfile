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
const POSITION_IN_SPLIT_FOR_NAME = 2;
const POSITION_IN_SPLIT_FOR_SALE_INFO = 2;
const POSITION_IN_SPLIT_FOR_SALESMAN_NAME = 3;
const POSITION_IN_SPLIT_FOR_3TH_INFO = 3;

module.exports = {

	parseLinesFromInputFile: function(contentFromFile){
		try{
			var contentFromFileSplittedInLines = lineSeparator(contentFromFile);
			var structLineParsed = '';
			contentFromFileSplittedInLines.forEach(function(line){
				if(parseFileValidator.validateLineSeparator(line, SEPARATOR_OF_FIELDS_FOR_LINE)){
					structLineParsed = createStructFromSeparatingElementsFromLine(line);

					if(parseFileValidator.validateElementsFromParsedLine(structLineParsed))
						fillRegisters.selectWhatRegisterToFill(structLineParsed);
				}
			});
			writeFile.writeFileInOutPutFolder(outputFilePath);
		}catch(err){
			throw err;
		}
		return structLineParsed;
	}
}

function lineSeparator(contentFromFile){
	return contentFromFile.split(NEWLINE_SEPARATOR_FROM_FILE);	
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
