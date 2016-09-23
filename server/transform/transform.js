'use strict';

const fileParser  = require('./file-parser/file-parser.js');
const fillRegisters = require('./fill-registers.js');
const saleItemCalculator = require('./sale-calculator/sale-item-calculator.js');
const prepareInfoForOutput = require('./prepare-output/prepare-info-output.js');
const etlLog = require('./../log/etl-log.js');

const SALESMAN_ID = '001';
const COSTUMER_ID = '002';
const SALE_ID = '003';

function transformFlatFile(contentFromFileRead){

	try{		
		
		let structOfLinesParsed = fileParser.parseLinesFromInputFile(contentFromFileRead);
		let structRegister = [];
		structOfLinesParsed.map(function(item){
			structRegister = selectRegister(item,structRegister);
		});

		let highestSale = saleItemCalculator.calculateMostExpensiveSale(structRegister);
		let worstSalesman = saleItemCalculator.calculateWorstSalesman(structRegister);
		let resumedFileStruct =  prepareInfoForOutput.prepareInfoForLoad(worstSalesman, highestSale);
	
		return resumedFileStruct;
	
	}catch(err){
		etlLog.writeToLog('error', err);
	}
}

function selectRegister( item, structRegister ) {
	let register = {
		'001': function ( item, structRegister ) {
			return fillRegisters.fillSalesmanRegister(item, structRegister);
		},
		'002': function ( item, structRegister ) {
			return fillRegisters.fillCostumerRegister(item, structRegister);
		},
		'003': function ( item, structRegister ) {
			let balanceSale = saleItemCalculator.totalSaleFromSalesman(item.thirdItem);
			return fillRegisters.fillSaleRegister(item, structRegister, balanceSale);
		}	
	};
	return register[item.id](item, structRegister);
}

module.exports.transformFlatFile = transformFlatFile;