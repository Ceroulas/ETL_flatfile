'use strict';

const Costumer = require('./models/costumer-register.js');
const Salesman = require('./models/salesman-register.js');

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
