'use strict';

const etlLog = require('./../log/etl-log.js');

const NUM_POSSIBLES_LINE_SEPARATORS_IN_LINE = 3;
const ONE_COUNT_LINE_SEPARATOR = 1;

module.exports = {

	/*validateString: function (string, index, lineSeparatorConst){
		try{
			var lineSeparatorValidation = validateLineSeparator(string, index, lineSeparatorConst);
			var itemsTypeValidation = validateElementsFromParsedLine(string, index);
			
			return (lineSeparatorValidation && itemsTypeValidation);
		}catch(err){
			etlLog.writeToLog('error', err);
		}
	}*/
	validateLineSeparator: function (lineToValidate, indexOfLine,lineSeparatorConst) {
		var lineSeparated = lineToValidate.split(lineSeparatorConst);
		var countOfLinesSeparator = lineSeparated.length - ONE_COUNT_LINE_SEPARATOR;

		if( countOfLinesSeparator !== NUM_POSSIBLES_LINE_SEPARATORS_IN_LINE){
			var errorMessage = 'Number of line separators is wrong! Should be: '+ NUM_POSSIBLES_LINE_SEPARATORS_IN_LINE;
			etlLog.writeToLog('error', 'Line: '+(indexOfLine+1)+' - '+errorMessage);
		}
	
		return lineSeparated;		
	},

	validateElementsFromParsedLine: function (string, indexOfLine) {
		console.log('String[id]: '+string.id+' string[code]: '+string.documentCode+' line: '+indexOfLine )
		var errorMessage = '';
		if(!validateID(string.id)){
			errorMessage = 'ID needs to have only digits!';
			etlLog.writeToLog('error', 'Line: '+(indexOfLine+1)+' - '+ errorMessage);
		}
		if(!validateDocumentCode(string.documentCode)){	
			errorMessage = 'Document code needs to have only digits!';
			etlLog.writeToLog('error', 'Line: '+(indexOfLine+1)+' - '+ errorMessage);
		}	
		return true;	
	}
}

/*function validateLineSeparator (lineToValidate, indexOfLine,lineSeparatorConst) {
	var lineSeparated = lineToValidate.split(lineSeparatorConst);
	var countOfLinesSeparator = lineSeparated.length - ONE_COUNT_LINE_SEPARATOR;

	if( countOfLinesSeparator !== NUM_POSSIBLES_LINE_SEPARATORS_IN_LINE)
		throw new Error('Line: '+(indexOfLine+1)+' - Number of line separators is wrong! Should be: '+ NUM_POSSIBLES_LINE_SEPARATORS_IN_LINE);
	
	return lineSeparated;		
}

function validateElementsFromParsedLine (string, indexOfLine) {
	console.log('String[id]: '+string[INDEX_OF_ID]+' string[code]: '+string[INDEX_OF_DOC_CODE]+ 'string: '+ string)
	if(!validateID(string[INDEX_OF_ID])){
		throw new Error('Line: '+(indexOfLine+1)+' - ID needs to have only digits!');
	}
	if(!validateDocumentCode(string[INDEX_OF_DOC_CODE])){	
		throw new Error('Line: '+(indexOfLine+1)+' - Document code needs to have only digits!');
	}	
	return true;
}*/

function validateDocumentCode (documentCode) {
	return isNumeric(documentCode);
}

function validateID (id) {
	return isNumeric(id);
}

function isNumeric (variableToTest) {
	return !isNaN(parseFloat(variableToTest)) && isFinite(variableToTest);
}