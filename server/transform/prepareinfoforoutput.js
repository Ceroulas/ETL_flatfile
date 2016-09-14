'use strict';

var Costumer = require('./models/costumerregister.js');
var Salesman = require('./models/salesmanregister.js');

module.exports = {
	prepareInfoForLoad: function ( worstSalesman, highestSale ) {
		return {
			costumerCount: Costumer.count, 
			salesmanCount: Salesman.count,
			worstSalesman: worstSalesman,
			highestSale: highestSale
		};
	}
}