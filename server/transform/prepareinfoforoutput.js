'use strict';

const Costumer = require('./models/costumerregister.js');
const Salesman = require('./models/salesmanregister.js');

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
