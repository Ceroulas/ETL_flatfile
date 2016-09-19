'use strict';

const etlLog = require('./../log/etl-log.js');

const NUM_POSSIBLES_LINE_SEPARATORS_IN_LINE = 3;
const ONE_COUNT_LINE_SEPARATOR = 1;

module.exports = {

	validateLineSeparator: function (lineToValidate, indexOfLine,lineSeparatorConst) {
		var lineSeparated = lineToValidate.split(lineSeparatorConst);
		var countOfLinesSeparator = lineSeparated.length - ONE_COUNT_LINE_SEPARATOR;

		if( countOfLinesSeparator !== NUM_POSSIBLES_LINE_SEPARATORS_IN_LINE){
			var errorMessage = 'Number of line separators is wrong! Should be: '+ NUM_POSSIBLES_LINE_SEPARATORS_IN_LINE;
			etlLog.writeToLog('error', 'Line: '+(indexOfLine+1)+' - '+errorMessage);
			return false;
		}
	
		return true;		
	},

	validateElementsFromParsedLine: function (string, indexOfLine) {
		var errorMessage = '';
		if(!validateID(string.id)){
			errorMessage = 'ID needs to have only digits!';
			etlLog.writeToLog('error', 'Line: '+(indexOfLine+1)+' - '+ errorMessage);
			return false;
		}
		if(!validateDocumentCode(string.documentCode)){	
			errorMessage = 'Document code needs to have only digits!';
			etlLog.writeToLog('error', 'Line: '+(indexOfLine+1)+' - '+ errorMessage);
			return false;
		}	
		return true;	
	}
}

function validateDocumentCode (documentCode) {
	return isNumeric(documentCode);
}

function validateID (id) {
	return isNumeric(id);
}

function isNumeric (variableToTest) {
	return !isNaN(parseFloat(variableToTest)) && isFinite(variableToTest);
}