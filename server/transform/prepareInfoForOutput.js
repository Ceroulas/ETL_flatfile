'use strict';

var fillRegisters = require('./fillRegisters.js');
var Costumer = require('./models/costumerRegister.js');
var Salesman = require('./models/salesmanRegister.js');
var Sale = require('./models/saleRegister.js');

module.exports = {
	prepareInfoForLoad: function(){
		return {
			costumerCount: Costumer.count, 
			salesmanCount: Salesman.count,
			worstSalesman: 'Not yet',//Sale.WorstSalesman,
			highestSale: 'Not yet'//Sale.highestSale
		};
	}
}