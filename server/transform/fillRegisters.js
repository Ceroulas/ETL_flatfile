'use strict';

var parseFile = require('./parseFile.js');
var Costumer = require('./models/costumerRegister.js');
var Salesman = require('./models/salesmanRegister.js');
var Sale = require('./models/saleRegister.js');

const COSTUMER_ID = '001';
const SALESMAN_ID = '002';
const SALE_ID = '003';

var arrayOfCostumersInputFile = [];
var arrayOfSalesmansInputFile = [];


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
	}
}


function fillCostumerRegister(structOfInfosFromLine){
	if( !findIfExistentInRegister(arrayOfCostumersInputFile, structOfInfosFromLine.documentCode)) {
		var costumerObj = new Costumer(structOfInfosFromLine.documentCode, structOfInfosFromLine.name, structOfInfosFromLine.thirdInfo);
		arrayOfCostumersInputFile.push(costumerObj);
	}
	else
		console.log('Costumer already in register.');
}

function fillSalesmanRegister(structOfInfosFromLine){
	if( !findIfExistentInRegister(arrayOfSalesmansInputFile, structOfInfosFromLine.documentCode)) {
		var salesmanObj = new Salesman(structOfInfosFromLine.documentCode, structOfInfosFromLine.name, structOfInfosFromLine.thirdInfo);
		arrayOfSalesmansInputFile.push(salesmanObj);
	}
	else
		console.log('Salesman already in register.');	
}

function fillSaleRegister(){
	console.log('Entrei no Sale');
}

function findIfExistentInRegister(array,findCode){
	if(array.length > 0){
		array.forEach(function(item){
			if(item.documentCode == findCode)
				return true;
		})
		return false;
	}else{
		return false;
	}
}	