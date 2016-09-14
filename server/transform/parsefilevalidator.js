'use strict';

const NUM_POSSIBLES_LINE_SEPARATORS_IN_LINE = 3;
const ONE_COUNT_LINE_SEPARATOR = 1;
const INDEX_OF_ID = 0;
const INDEX_OF_DOC_CODE = 1;

module.exports = {

	validateString: function (string, lineSeparatorConst){
		try{
			var lineSeparatorValidation = validateLineSeparator(string, lineSeparatorConst);
			var itemsTypeValidation = validateElementsFromParsedLine(string, lineSeparatorConst)
			
			return (lineSeparatorValidation && itemsTypeValidation);
		}catch(err){
			throw err;
		}
	}
}

//TODO: remove if statements
function validateLineSeparator (lineToValidate, lineSeparatorConst) {
	console.log('lineToValidate: '+ lineToValidate);
	var lineSeparated = lineToValidate.split(lineSeparatorConst);
	var countOfLinesSeparator = lineSeparated.length - ONE_COUNT_LINE_SEPARATOR;

	if( countOfLinesSeparator === NUM_POSSIBLES_LINE_SEPARATORS_IN_LINE)
		return validateElementsFromParsedLine(lineSeparated);
	else 
		throw new Error('Number of line separators is wrong! Should be: '+ NUM_POSSIBLES_LINE_SEPARATORS_IN_LINE);
}

//TODO: remove if statements
function validateElementsFromParsedLine (string) {
	if(validateID(string[INDEX_OF_ID]))
	   if(validateDocumentCode(string[INDEX_OF_DOC_CODE]))	
			return true;
		else throw new Error('Document code needs to have only digits!');
	else throw new Error('ID needs to have only digits!');
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