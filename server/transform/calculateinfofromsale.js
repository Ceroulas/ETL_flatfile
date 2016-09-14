'use strict';

var fillRegisters = require('./fillregisters.js');

module.exports = {
	calculateMostExpensiveSale: function (infoFromStructOfLines) {
		return Math.max.apply(null, mapSalesArray(infoFromStructOfLines));
	},

	calculateWorstSalesman: function (infoFromStructOfLines) {
		var minSale = Math.min.apply(null, mapSalesArray(infoFromStructOfLines));
		return findWorstSalesmanInArray(infoFromStructOfLines, minSale);
	}
}

var mapSalesArray = function (salesArray) {
	return salesArray.map(function(item){
			return item.balanceOfSales;
		 });
}

var findWorstSalesmanInArray = function (salesArray, minSale) {
	var worstSalesmanFound = '';
	salesArray.forEach(function(item){
		if(item.balanceOfSales == minSale){	    	
    	   worstSalesmanFound = item.salesmanName;
    	}	
	});
	return worstSalesmanFound;
}