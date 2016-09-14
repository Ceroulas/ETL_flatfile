'use strict';

var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;

var filePath = __dirname+'/../../resources/test.dat';
var calculateSale = require('./../../../transform/calculatesale.js');

describe('Calculate sale Test:', () => {
	
	it('it should return the expected balance of sales ', () =>{
		var stringSaleToCalculate = [
			['1','10','100'],
			['2','30','2.50'],
			['3','40','3.10']
		];
		var expectedResult = 1199; 	   					
		
		var balanceOfSales = calculateSale.retrieveBalanceOfSales(stringSaleToCalculate);
		expect(balanceOfSales).to.be.equal(expectedResult);
	});

	it('it should return TypeError: no data received to calculate balance of sales.', () =>{
		var messageError = 'No sale was received to calculate its balance!';
		
		var balanceOfSales = ()=>{calculateSale.retrieveBalanceOfSales()};
		expect(balanceOfSales).to.throw(Error, messageError);
	});

});