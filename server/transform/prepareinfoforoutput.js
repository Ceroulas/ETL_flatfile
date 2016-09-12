'use strict';

var caculateInfoFromSale  = require('./calculateinfofromsale.js');
var Costumer = require('./models/costumerregister.js');
var Salesman = require('./models/salesmanregister.js');

module.exports = {
	prepareInfoForLoad: function(){
		return {
			costumerCount: Costumer.count, 
			salesmanCount: Salesman.count,
			worstSalesman: caculateInfoFromSale.calculateWorstSalesman(),
			highestSale: caculateInfoFromSale.calculateMostExpensiveSale()
		};
	}
}