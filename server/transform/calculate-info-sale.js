'use strict';

const fillRegisters = require('./fill-registers.js');
const calculateSale = require('./calculate-sale.js');
const parseSaleInfo = require('./parse-sale-info.js');

module.exports = {

	totalSaleFromSalesman: function (saleUnparsed){
		var saleInfoParsed = parseSaleInfo.parseSaleInfo(saleUnparsed);

		return calculateSale.retrieveBalanceOfSales(saleInfoParsed);
	},	

	calculateMostExpensiveSale: function (infoFromStructOfLines) {
		return Math.max.apply(null, mapSalesArray(infoFromStructOfLines));
	},

	calculateWorstSalesman: function (infoFromStructOfLines) {
		var minSale = Math.min.apply(null, mapSalesArray(infoFromStructOfLines));
		return findWorstSalesmanInArray(infoFromStructOfLines, minSale);
	}
}

function mapSalesArray (salesArray) {
	return salesArray.map(function(item){
			return item.balanceOfSales;
		 });
}

function findWorstSalesmanInArray (salesArray, minSale) {
	var worstSalesmanFound = '';
	salesArray.map(function(item){
		if(item.balanceOfSales == minSale){	    	
    	   worstSalesmanFound = item.salesmanName;
    	}	
	});
	return worstSalesmanFound;
}