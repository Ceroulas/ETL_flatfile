'use strict';

var caculateInfoFromSale  = require('./calculateInfoFromSale.js');
var Costumer = require('./models/costumerRegister.js');
var Salesman = require('./models/salesmanRegister.js');

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