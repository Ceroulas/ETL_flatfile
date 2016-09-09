'use strict';

var fs = require('fs');
var structResumeOfFile = require('./../transform/prepareInfoForOutput.js');

module.exports = {

	writeFileInOutPutFolder: function(outputFolderPath){
		try{
			fs.writeFileSync(outputFolderPath, fillFieldsToWriteOutputFile());
		}catch(err){
			throw err;
		}
	}
}

function fillFieldsToWriteOutputFile(){
	var structResumeFile = structResumeOfFile.prepareInfoForLoad();
	return  'Costumer count: '+ structResumeFile.costumerCount +'\n'+
			'Salesman count: '+ structResumeFile.salesmanCount +'\n'+
			'Worst salesman ever: '+ structResumeFile.worstSalesman +'\n'+
			'Most expensive sale: '+ structResumeFile.highestSale;
}