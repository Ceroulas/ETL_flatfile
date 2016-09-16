'use strict';

const parseSaleInfo = require('./parse-sale-info.js');
const calculateSale = require('./calculate-sale.js');
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
		var structOfLinesParsed = parseFile.parseLinesFromInputFile(contentFromFileRead);
		
		structOfLinesParsed.map(function(item){
			selectIdRegister(item);
		});
		
		var highestSale = calculateInfoFromSale.calculateMostExpensiveSale(arrayOfSalesInputFile);
		var worstSalesman = calculateInfoFromSale.calculateWorstSalesman(arrayOfSalesInputFile);
		
		var resumedFileStruct =  prepareInfoForOutput.prepareInfoForLoad(worstSalesman, highestSale);

		return resumedFileStruct;
	
	}catch(err){
		//etlLog.writeToLog('error', err);
		throw err
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
			var balanceSale = totalSaleFromSalesman(item.thirdItem);

			arrayOfSalesInputFile = fillRegisters.fillSaleRegister(item, arrayOfSalesInputFile, balanceSale);
			break;
		default:
			throw new Error('ID not recognized in System. Verify your file syntax.');	
	}
}

function totalSaleFromSalesman(saleUnparsed){
	var saleInfoParsed = parseSaleInfo.parseSaleInfo(saleUnparsed);

	return calculateSale.retrieveBalanceOfSales(saleInfoParsed);
}

module.exports.transformFlatFile = transformFlatFile;