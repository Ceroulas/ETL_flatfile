'use strict';

const Immutable = require('immutable');
const parseFile  = require('./parse-file.js');
const fillRegisters = require('./fill-registers.js');
const calculateInfoFromSale = require('./calculate-info-sale.js');
const prepareInfoForOutput = require('./prepare-info-output.js');

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
		throw err;
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
			arrayOfSalesInputFile = fillRegisters.fillSaleRegister(item, arrayOfSalesInputFile);
			break;
		default:
			throw new Error('ID not recognized in System. Verify your file syntax.');	
	}
}

module.exports.transformFlatFile = transformFlatFile;