'use strict';

const parseFile  = require('./parsefile.js');
const fillRegisters = require('./fillregisters.js');
const calculateInfoFromSale = require('./calculateinfofromsale.js');
const prepareInfoForOutput = require('./prepareinfoforoutput.js');

const SALESMAN_ID = '001';
const COSTUMER_ID = '002';
const SALE_ID = '003';

var arrayOfCostumersInputFile = [];
var arrayOfSalesmansInputFile = [];
var arrayOfSalesInputFile = [];

function transformFlatFile(contentFromFileRead){

	try{
		var structOfLinesParsed = parseFile.parseLinesFromInputFile(contentFromFileRead);
		
		structOfLinesParsed.forEach(function(item){
			choiceForFillRegister(item,arrayOfSalesmansInputFile,arrayOfCostumersInputFile, arrayOfSalesInputFile);
		});

		var highestSale = calculateInfoFromSale.calculateMostExpensiveSale(arrayOfSalesInputFile);
		var worstSalesman = calculateInfoFromSale.calculateWorstSalesman(arrayOfSalesInputFile);
		
		return prepareInfoForOutput.prepareInfoForLoad(worstSalesman, highestSale);
	
	}catch(err){
		throw err;
	}
}

//TODO: turn to pure function
function choiceForFillRegister(item) {
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
	}
}

module.exports.transformFlatFile = transformFlatFile;