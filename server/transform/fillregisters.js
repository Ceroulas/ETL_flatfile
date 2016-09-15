'use strict';

const Immutable = require('immutable');
const parseSaleInfo = require('./parsesaleinfo.js');
const calculateSale = require('./calculatesale.js');
const Costumer = require('./models/costumerregister.js');
const Salesman = require('./models/salesmanregister.js');
const Sale = require('./models/saleregister.js');
const etlLog = require('./../log/etllog.js');

const SALESMAN_ID = '001';
const COSTUMER_ID = '002';
const SALE_ID = '003';

module.exports = {
	fillCostumerRegister: function (structOfInfosFromLine, arrayFilled) {
		if( !findIfExistentInRegister(arrayFilled, structOfInfosFromLine.documentCode)) {
			var costumerObj = new Costumer(structOfInfosFromLine.documentCode, structOfInfosFromLine.thirdItem, structOfInfosFromLine.fourthItem);
			arrayFilled.push(costumerObj);

			return arrayFilled;
		} else{
			var messageToLog = 'Costumer "'+ structOfInfosFromLine.thirdItem +'" already in register.';
			etlLog.writeToLog('info',messageToLog);	
		} 
	},

	fillSalesmanRegister: function (structOfInfosFromLine, arrayFilled) {
		if( !findIfExistentInRegister(arrayFilled, structOfInfosFromLine.documentCode)) {
			var salesmanObj = new Salesman(structOfInfosFromLine.documentCode, structOfInfosFromLine.thirdItem, structOfInfosFromLine.fourthItem);
			arrayFilled.push(salesmanObj);

			return arrayFilled;
		}else {
			var messageToLog = 'Salesman "'+structOfInfosFromLine.thirdItem +'" already in register.';
			etlLog.writeToLog('info', messageToLog);	
		}	
	},

	fillSaleRegister: function (structOfInfosFromLine, arrayFilled) {
		var saleInfoParsed = parseSaleInfo.parseSaleInfo(structOfInfosFromLine.thirdItem);
		var balanceSaleCalculated = calculateSale.retrieveBalanceOfSales(saleInfoParsed);
		var saleObj = new Sale(structOfInfosFromLine.documentCode, balanceSaleCalculated, structOfInfosFromLine.fourthItem)
		arrayFilled.push(saleObj);

		return arrayFilled;
	}	
}

function findIfExistentInRegister (array,findCode) {
	var isExistentInArray = false;
	array.forEach(function(item){
		if(item.documentCode == findCode){
			isExistentInArray = true;
		}
	});
	return isExistentInArray;
}