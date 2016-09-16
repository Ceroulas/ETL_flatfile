'use strict';

const NUM_POSSIBLES_LINE_SEPARATORS_IN_LINE = 3;
const ONE_COUNT_LINE_SEPARATOR = 1;
const INDEX_OF_ID = 0;
const INDEX_OF_DOC_CODE = 1;

module.exports = {

	validateString: function (string, index, lineSeparatorConst){
		try{
			var lineSeparatorValidation = validateLineSeparator(string, index, lineSeparatorConst);
			var itemsTypeValidation = validateElementsFromParsedLine(string, index);
			
			return (lineSeparatorValidation && itemsTypeValidation);
		}catch(err){
			throw err;
		}
	}
}

function validateLineSeparator (lineToValidate, indexOfLine,lineSeparatorConst) {
	var lineSeparated = lineToValidate.split(lineSeparatorConst);
	var countOfLinesSeparator = lineSeparated.length - ONE_COUNT_LINE_SEPARATOR;

	if( countOfLinesSeparator !== NUM_POSSIBLES_LINE_SEPARATORS_IN_LINE)
		throw new Error('Line: '+(indexOfLine+1)+' - Number of line separators is wrong! Should be: '+ NUM_POSSIBLES_LINE_SEPARATORS_IN_LINE);
	
	return validateElementsFromParsedLine(lineSeparated);		
}

function validateElementsFromParsedLine (string, indexOfLine) {
	if(!validateID(string[INDEX_OF_ID])){
		throw new Error('Line: '+(indexOfLine+1)+' - ID needs to have only digits!');
	}
	if(!validateDocumentCode(string[INDEX_OF_DOC_CODE])){	
		throw new Error('Line: '+(indexOfLine+1)+' - Document code needs to have only digits!');
	}	
	return true;
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