'use strict';

const fillRegisters = require('./fillregisters.js');

module.exports = {
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
	salesArray.forEach(function(item){
		if(item.balanceOfSales == minSale){	    	
    	   worstSalesmanFound = item.salesmanName;
    	}	
	});
	return worstSalesmanFound;
}