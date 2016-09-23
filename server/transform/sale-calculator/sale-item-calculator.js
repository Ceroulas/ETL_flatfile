'use strict';

const calculateSale = require('./sale-calculator.js');
const parseSaleInfo = require('./../sale-parser/sale-parser.js');

const TYPE_SALE = 'Sale';

module.exports = {

	totalSaleFromSalesman: function (saleUnparsed){
		var saleInfoParsed = parseSaleInfo.parseSaleInfo(saleUnparsed);

		return calculateSale.retrieveBalanceOfSales(saleInfoParsed);
	},	

	calculateMostExpensiveSale: function (infoFromStructOfLines) {
		return Math.max.apply(null, mapArrayOfSales(infoFromStructOfLines));
	},

	calculateWorstSalesman: function (infoFromStructOfLines) {
		var minSale = Math.min.apply(null, mapArrayOfSales(infoFromStructOfLines));
		return findWorstSalesmanInArray(infoFromStructOfLines, minSale);
	}
}

function mapArrayOfSales( array ) {
	return array.filter(function(item){
			if(item.constructor.name === TYPE_SALE)
				return item.balanceOfSales;				
		 }).map(function(item){ return item.balanceOfSales});
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