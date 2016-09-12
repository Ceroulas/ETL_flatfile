'use strict';

const POSITION_OF_ITEM_QUANTITY_SOLD = 1;
const POSITION_OF_ITEM_PRICE = 2;

module.exports = {
	retrieveBalanceOfSales: function(stringSaleToCalculate){
		if( typeof stringSaleToCalculate !== "undefined") {
			return calculateBalanceOfSales(stringSaleToCalculate);
		}
		else throw new Error('No sale was received to calculate its balance!');
	}
}

function calculateBalanceOfSales(stringSaleToCalculate){
	var balanceOfSaleFromSalesman = 0;
	stringSaleToCalculate.forEach(function(oneSaleInfo){
		var quantityXPrice = oneSaleInfo[POSITION_OF_ITEM_QUANTITY_SOLD]*oneSaleInfo[POSITION_OF_ITEM_PRICE];
		balanceOfSaleFromSalesman += quantityXPrice;
	})
	return balanceOfSaleFromSalesman;
}