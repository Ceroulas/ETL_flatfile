'use strict';

var Immutable = require('immutable');
var parseSaleInfo = require('./parsesaleinfo.js');
var calculateSale = require('./calculatesale.js');
var Costumer = require('./models/costumerregister.js');
var Salesman = require('./models/salesmanregister.js');
var Sale = require('./models/saleregister.js');

const SALESMAN_ID = '001';
const COSTUMER_ID = '002';
const SALE_ID = '003';

module.exports = {

	fillCostumerRegister: function (structOfInfosFromLine, arrayFilled) {
	//if( !findIfExistentInRegister(arrayFilled, structOfInfosFromLine.documentCode)) {
		var costumerObj = new Costumer(structOfInfosFromLine.documentCode, structOfInfosFromLine.thirdItem, structOfInfosFromLine.fourthItem);
		arrayFilled.push(costumerObj);

		return arrayFilled;
	//}
	//else console.info('Costumer already in register.');
	},

	fillSalesmanRegister: function (structOfInfosFromLine, arrayFilled) {
		//if( !findIfExistentInRegister(arrayFilled, structOfInfosFromLine.documentCode)) {
			var salesmanObj = new Salesman(structOfInfosFromLine.documentCode, structOfInfosFromLine.thirdItem, structOfInfosFromLine.fourthItem);
			arrayFilled.push(salesmanObj);

			return arrayFilled;
		//}
		//else console.info('Salesman already in register.');	
	},

	fillSaleRegister: function (structOfInfosFromLine, arrayFilled) {
		var saleInfoParsed = parseSaleInfo.parseSaleInfo(structOfInfosFromLine.thirdItem);
		var balanceSaleCalculated = calculateSale.retrieveBalanceOfSales(saleInfoParsed);
		var saleObj = new Sale(structOfInfosFromLine.documentCode, balanceSaleCalculated, structOfInfosFromLine.fourthItem)
		arrayFilled.push(saleObj);

		return arrayFilled;
	}	
}



var findIfExistentInRegister = function (array,findCode) {
	var isExistentInArray = false;
	array.forEach(function(item){
		if(item.documentCode == findCode){
			isExistentInArray = true;
		}
	});
	return isExistentInArray;
}