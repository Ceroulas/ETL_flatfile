'use strict';

const Costumer = require('./../models/costumer-register.js');
const Salesman = require('./../models/salesman-register.js');

module.exports = {
	prepareInfoForLoad: function ( worstSalesman, highestSale ) {
		let fileResumeStruct = {
			costumerCount: Costumer.count, 
			salesmanCount: Salesman.count,
			worstSalesman: worstSalesman,
			highestSale: highestSale
		};

		resetModels();

		return fileResumeStruct;
	}
}

function resetModels(){
	Costumer.count = 0;
	Salesman.count = 0;
}
