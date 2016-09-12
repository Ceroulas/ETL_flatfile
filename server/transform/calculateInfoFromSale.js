'use strict';

var fillRegisters = require('./fillRegisters.js');

module.exports = {
	calculateMostExpensiveSale: function() {
		var salesArray = fillRegisters.getSalesArray();
		return Math.max.apply(null, mapSalesArray(salesArray));
	},

	calculateWorstSalesman: function() {
		var salesArray = fillRegisters.getSalesArray();
		var minSale = Math.min.apply(null, mapSalesArray(salesArray));
		return findWorstSalesmanInArray(salesArray, minSale);
	}
}

function mapSalesArray(salesArray){
	return salesArray.map(function(item){
			return item.balanceOfSales;
		 });
}

function findWorstSalesmanInArray(salesArray, minSale){
	var worstSalesmanFound = '';
	salesArray.forEach(function(item){
		if(item.balanceOfSales == minSale){	    	
    	   worstSalesmanFound = item.salesmanName;
    	}	
	});
	return worstSalesmanFound;
}