'use strict';

var mocha = require('mocha');
var sinon = require('sinon')
var chai = require('chai');
var expect = chai.expect;

var transform = require('./../../transform/prepareInfoForOutput.js');
var Costumer = require('./../../transform/models/costumerRegister.js');
var Salesman = require('./../../transform/models/salesmanRegister.js');

var filePath = __dirname+'/../resources/test.dat';

describe('prepareInfoForOutput Test:', () => {

	beforeEach((done)=>{
		new Costumer('111', 'Joao', 'teste1');
		new Costumer('222', 'Maria', 'teste2');
		new Costumer('333', 'Douglas', 'teste3');

		new Salesman('444', 'Rafael', '1000');
		new Salesman('555', 'Thomas', '2000');
		done();
	})
	
	it('should return struct with right values', () =>{
		var expectedContentFromExtract = {
			costumerCount: 3, 
			salesmanCount: 2,
			worstSalesman: 'Not yet',//Sale.WorstSalesman,
			highestSale: 'Not yet'//Sale.highestSale
		};
		
		var structResumeInputFile = transform.prepareInfoForLoad();

		expect(structResumeInputFile.costumerCount).to.equal(expectedContentFromExtract.costumerCount);
		expect(structResumeInputFile.salesmanCount).to.equal(expectedContentFromExtract.salesmanCount);
		expect(structResumeInputFile.worstSalesman).to.equal(expectedContentFromExtract.worstSalesman);
		expect(structResumeInputFile.highestSale).to.equal(expectedContentFromExtract.highestSale);
	});

});