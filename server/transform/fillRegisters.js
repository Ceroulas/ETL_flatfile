'use strict';

var parseFile = require('./parseFile.js');
var parseSaleInfo = require('./parseSaleInfo.js');
var calculateSale = require('./calculateSale.js');
var Costumer = require('./models/costumerRegister.js');
var Salesman = require('./models/salesmanRegister.js');
var Sale = require('./models/saleRegister.js');

const COSTUMER_ID = '001';
const SALESMAN_ID = '002';
const SALE_ID = '003';

var arrayOfCostumersInputFile = [];
var arrayOfSalesmansInputFile = [];
var arrayOfSalesInputFile = [];

module.exports = {

	selectWhatRegisterToFill: function (structOfInfosFromLine){
		switch(structOfInfosFromLine.id){
			case COSTUMER_ID:
				fillCostumerRegister(structOfInfosFromLine);
				break;
			case SALESMAN_ID:
				fillSalesmanRegister(structOfInfosFromLine);
				break;
			case SALE_ID:
				fillSaleRegister(structOfInfosFromLine);
				break;
			default:
				console.error('ID not recognized in System. Verify your file syntax.');		
		}
	},
/*
	calculateMostExpensiveSale: function() {
		return Math.max.apply(null, utils.mapArray(salesArr));
	},

	calculateWorstSalesman: function() {
		var minSale = Math.min.apply(null, utils.mapArray(salesArr));
		var worstSalesman = '';
		for (var i = 0, len = salesArr.length; i < len; i++) {
	    	if(salesArr[i].value == minSale){	    	
	    		worstSalesman = salesArr[i].salesman;
	    	}	
		}
		return worstSalesman;
	}*/
	
}

function fillCostumerRegister(structOfInfosFromLine){
	if( !findIfExistentInRegister(arrayOfCostumersInputFile, structOfInfosFromLine.documentCode)) {
		var costumerObj = new Costumer(structOfInfosFromLine.documentCode, structOfInfosFromLine.name, structOfInfosFromLine.thirdInfo);
		arrayOfCostumersInputFile.push(costumerObj);
	}
	else console.info('Costumer already in register.');
}

function fillSalesmanRegister(structOfInfosFromLine){
	if( !findIfExistentInRegister(arrayOfSalesmansInputFile, structOfInfosFromLine.documentCode)) {
		var salesmanObj = new Salesman(structOfInfosFromLine.documentCode, structOfInfosFromLine.name, structOfInfosFromLine.thirdInfo);
		arrayOfSalesmansInputFile.push(salesmanObj);
	}
	else console.info('Salesman already in register.');	
}

function fillSaleRegister(structOfInfosFromLine){
	var saleInfoParsed = parseSaleInfo.parseSaleInfo(structOfInfosFromLine.saleInfo);
	var balanceSaleCalculated = calculateSale.retrieveBalanceOfSales(saleInfoParsed);
	var saleObj = new Sale(structOfInfosFromLine.documentCode, balanceSaleCalculated, structOfInfosFromLine.salesmanName)
	arrayOfSalesInputFile.push(saleObj);
}

function findIfExistentInRegister(array,findCode){
	var isExistentInArray = false;
	array.forEach(function(item){
		if(item.documentCode == findCode){
			isExistentInArray = true;
		}
	});
	return isExistentInArray;
}


