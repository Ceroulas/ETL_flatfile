'use strict';

const POSITION_OF_ITEM_QUANTITY_SOLD = 1;
const POSITION_OF_ITEM_PRICE = 2;

module.exports = {
	retrieveBalanceOfSales: function (stringSaleToCalculate) {
		if( typeof stringSaleToCalculate === "undefined") 
			throw new Error('No sale was received to calculate its balance!');
		
		return calculateBalanceOfSales(stringSaleToCalculate); 
	}
}

function calculateBalanceOfSales (stringSaleToCalculate) {
	var balanceOfSaleFromSalesman = 0;
	
	stringSaleToCalculate.map(function(element){
		balanceOfSaleFromSalesman += multiplyValues(element);
	});

	return balanceOfSaleFromSalesman;
}

function multiplyValues(element){
	return element[POSITION_OF_ITEM_QUANTITY_SOLD]*element[POSITION_OF_ITEM_PRICE];;
}