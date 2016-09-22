'use strict';

const parseFile  = require('./parse-file.js');
const fillRegisters = require('./fill-registers.js');
const calculateInfoFromSale = require('./calculate-info-sale.js');
const prepareInfoForOutput = require('./prepare-info-output.js');
const etlLog = require('./../log/etl-log.js');

const SALESMAN_ID = '001';
const COSTUMER_ID = '002';
const SALE_ID = '003';

//TODO: remove - mutability
var arrayOfCostumersInputFile = [];
var arrayOfSalesmansInputFile = [];
var arrayOfSalesInputFile = [];

//TODO: refactor
function transformFlatFile(contentFromFileRead){

	try{		
		resetArrays();

		var structOfLinesParsed = parseFile.parseLinesFromInputFile(contentFromFileRead);
		console.log(structOfLinesParsed);
		structOfLinesParsed.map(function(item){
			selectIdRegister(item);
		});
		
		var highestSale = calculateInfoFromSale.calculateMostExpensiveSale(arrayOfSalesInputFile);
		var worstSalesman = calculateInfoFromSale.calculateWorstSalesman(arrayOfSalesInputFile);
		var resumedFileStruct =  prepareInfoForOutput.prepareInfoForLoad(worstSalesman, highestSale);
	
		return resumedFileStruct;
	
	}catch(err){
		etlLog.writeToLog('error', err);
	}
}

function selectIdRegister(item) {
	switch(item.id){
		case SALESMAN_ID:
			arrayOfSalesmansInputFile = fillRegisters.fillSalesmanRegister(item, arrayOfSalesmansInputFile);
			break;
		case COSTUMER_ID:
			arrayOfCostumersInputFile = fillRegisters.fillCostumerRegister(item, arrayOfCostumersInputFile);
			break;
		case SALE_ID:
			var balanceSale = calculateInfoFromSale.totalSaleFromSalesman(item.thirdItem);
			arrayOfSalesInputFile = fillRegisters.fillSaleRegister(item, arrayOfSalesInputFile, balanceSale);
			break;
		default:
			etlLog.writeToLog('error','ID not recognized in System. Verify your file syntax.');	
	}
}

function resetArrays(){
	arrayOfCostumersInputFile.length = 0;
	arrayOfSalesmansInputFile.length = 0;
	arrayOfSalesInputFile.length = 0;
}

module.exports.transformFlatFile = transformFlatFile;