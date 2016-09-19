'use strict';

const fs = require('fs');
const etlLog = require('./../log/etl-log.js');

module.exports = {
	//TODO: transform to pure function
	writeFileInOutputFolder: function (outputFolderPath, resumedFileStruct) {
		try{
			fs.writeFileSync(outputFolderPath, fillFieldsToWriteOutputFile(resumedFileStruct));
		}catch(err){
			etlLog.writeToLog('error', err);
		}
	}
}

var fillFieldsToWriteOutputFile = function (resumedFileStruct) { 
	return  'Costumer count: '+ resumedFileStruct.costumerCount +'\n'+
			'Salesman count: '+ resumedFileStruct.salesmanCount +'\n'+
			'Worst salesman ever: '+ resumedFileStruct.worstSalesman +'\n'+
			'Most expensive sale: '+ resumedFileStruct.highestSale;
}