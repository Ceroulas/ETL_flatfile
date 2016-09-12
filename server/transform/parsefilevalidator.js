'use strict';

const NUM_POSSIBLES_LINE_SEPARATORS_IN_LINE = 3;
const ONE_COUNT_LINE_SEPARATOR = 1;

module.exports = {
	validateLineSeparator: function(lineToValidate, lineSeparatorConst){
		var countOfLinesSeparator = lineToValidate.split(lineSeparatorConst).length - ONE_COUNT_LINE_SEPARATOR;

		if( countOfLinesSeparator > NUM_POSSIBLES_LINE_SEPARATORS_IN_LINE){
			throw new Error('More number of line separators than possible!');
		}	
		else if(countOfLinesSeparator < NUM_POSSIBLES_LINE_SEPARATORS_IN_LINE) 
				throw new Error('Not enough line separators! Should be: '+ NUM_POSSIBLES_LINE_SEPARATORS_IN_LINE);
			 else	return true; 
	},

	validateElementsFromParsedLine: function(structLineParsed){
		if(validateID(structLineParsed.id))
		   if(validateDocumentCode(structLineParsed.documentCode))	
				return true;
			else throw new Error('Document code needs to have only digits!');
		else throw new Error('ID needs to have only digits!');
	}
}

function validateDocumentCode(documentCode){
	return isNumeric(documentCode);
}

function validateID(id){
	return isNumeric(id);
}

function isNumeric(variableToTest) {
	return !isNaN(parseFloat(variableToTest)) && isFinite(variableToTest);
}