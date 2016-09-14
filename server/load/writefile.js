'use strict';

var fs = require('fs');

module.exports = {
	//TODO: transform to pure function
	writeFileInOutputFolder: function (outputFolderPath, resumedFileStruct) {
		try{
			fs.writeFileSync(outputFolderPath, fillFieldsToWriteOutputFile(resumedFileStruct));
		}catch(err){
			throw err;
		}
	}
}

var fillFieldsToWriteOutputFile = function (resumedFileStruct) { 
	return  'Costumer count: '+ resumedFileStruct.costumerCount +'\n'+
			'Salesman count: '+ resumedFileStruct.salesmanCount +'\n'+
			'Worst salesman ever: '+ resumedFileStruct.worstSalesman +'\n'+
			'Most expensive sale: '+ resumedFileStruct.highestSale;
}