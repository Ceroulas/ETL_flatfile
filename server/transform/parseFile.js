'use strict';

var extract = require('./../extract/extract.js');
var fileRegisters = require('./fileRegisters.js')
//var load = require('./../load/writeFile.js');
//var Costumer = require('./models/costumerRegister.js');
//var Salesman = require('./models/salesmanRegister.js');
//var Sale = require('./models/saleRegister.js');

var fileOutputFolderPath = __dirname+'/../../data/out/test.dat';

const NEWLINE_SEPARATOR_FROM_FILE = '\n';
const SEPARATOR_FOR_LINE = 'ç';

const POSITION_IN_SPLIT_FOR_ID = 0;
const POSITION_IN_SPLIT_FOR_DOC_CODE = 1;
const POSITION_IN_SPLIT_FOR_NAME = 2;
const POSITION_IN_SPLIT_FOR_3TH_INFO = 3;

//var InfosForOuputFile = new Map();

module.exports = {

	parseLinesFromInputFile: function(filePath){
		var contentFromFileSplittedInLines = lineSeparator(filePath);
		contentFromFileSplittedInLines.forEach(function(line){
			var structLineParsed = createStructFromSeparatingElementsFromLine(line);
			fileRegisters.selectWhatRegisterToFill(structLineParsed);
		})

		//fillOuputMapForOutputFile();
		//load.writeFileInOutPutFolder(fileOutputFolderPath);
	}
}

function lineSeparator(filePath){
	return receiveRawDataFromFileRead(filePath).split(NEWLINE_SEPARATOR_FROM_FILE);	
}

function receiveRawDataFromFileRead(filePath){
	return extract.readInputFile(filePath);
}

function separateDifferentElementsFromLine(inputLine){
	return inputLine.split(SEPARATOR_FOR_LINE);
}

function createStructFromSeparatingElementsFromLine(inputLine){
	var lineParsed = separateDifferentElementsFromLine(inputLine);
	var structOfInfosFromLine = {
		id: lineParsed[POSITION_IN_SPLIT_FOR_ID],
		documentCode: lineParsed[POSITION_IN_SPLIT_FOR_DOC_CODE],
		name: lineParsed[POSITION_IN_SPLIT_FOR_NAME], 
		thirdInfo: lineParsed[POSITION_IN_SPLIT_FOR_3TH_INFO]
	}
	return  structOfInfosFromLine;
}

/*function fillOuputMapForOutputFile(){
	InfosForOuputFile.set('costumerCount', Costumer.count);
	InfosForOuputFile.set('salesmanCount', Salesman.count);
}*/
