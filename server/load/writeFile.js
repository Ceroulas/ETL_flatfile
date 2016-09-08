'use strict';

var fs = require('fs');
var parseFile = require('./../transform/parseFile.js');

const COSTUMER_COUNT_FROM_INPUT_FILE = "costumerCount";
const SALESMAN_COUNT_FROM_INPUT_FILE = "salesmanCount";
const WORST_SALESMAN_FROM_INPUT_FILE  = "worstSalesman";
const HIGHSEST_SALE_FROM_INPUT_FILE = "highestSale";

module.exports = {

	writeFileInOutPutFolder: function(outputFolderPath){
		try{
			fs.writeFileSync(outputFolderPath, fillStructToWriteInfosToOutputFile());
		}catch(err){
			throw err;
		}
	}
}

function fillStructToWriteInfosToOutputFile(){
	var structOfInfosToWriteOutput = {
		costumerCount: parseFile.getIndexOfMapOfResumedInfos(COSTUMER_COUNT_FROM_INPUT_FILE),
		salesmanCount: parseFile.getIndexOfMapOfResumedInfos(SALESMAN_COUNT_FROM_INPUT_FILE),
		worstSalesman: parseFile.getIndexOfMapOfResumedInfos(WORST_SALESMAN_FROM_INPUT_FILE),
		highestSale: parseFile.getIndexOfMapOfResumedInfos(HIGHSEST_SALE_FROM_INPUT_FILE)
	};

	return structOfInfosToWriteOutput;
}