'use strict';

var parseSaleInfo = require('./parseSaleInfo.js');
var calculateSale = require('./calculateSale.js');
var Costumer = require('./models/costumerRegister.js');
var Salesman = require('./models/salesmanRegister.js');
var Sale = require('./models/saleRegister.js');

const SALESMAN_ID = '001';
const COSTUMER_ID = '002';
const SALE_ID = '003';

var arrayOfCostumersInputFile = [];
var arrayOfSalesmansInputFile = [];
var arrayOfSalesInputFile = [];

module.exports = {

	selectWhatRegisterToFill: function (structOfInfosFromLine){
		switch(structOfInfosFromLine.id){
			case SALESMAN_ID:
				fillSalesmanRegister(structOfInfosFromLine);
				break;
			case COSTUMER_ID:
				fillCostumerRegister(structOfInfosFromLine);
				break;
			case SALE_ID:
				fillSaleRegister(structOfInfosFromLine);
				break;
			default:
				console.error('ID not recognized in System. Verify your file syntax.');		
		}
	},

	getSalesArray: function (){
		return arrayOfSalesInputFile;
	}	
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