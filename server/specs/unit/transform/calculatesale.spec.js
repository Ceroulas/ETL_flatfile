'use strict';

var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;

var filePath = __dirname+'/../../resources/test.dat';
var transform = require('./../../../transform/calculatesale.js');

describe('Calculate sale Test:', () => {
	
	it('it should return the expected balance of sales ', () =>{
		var stringSaleToCalculate = [
			['1','10','100'],
			['2','30','2.50'],
			['3','40','3.10']
		];
		var expectedResultFromCalation = 1199; 	   					
	
		expect(transform.retrieveBalanceOfSales(stringSaleToCalculate)).to.be.equal(expectedResultFromCalation);
	});

	it('it should return TypeError: no data received to calculate balance of sales.', () =>{
		expect(()=>{transform.retrieveBalanceOfSales()}).to.throw(Error, 'No sale was received to calculate its balance!');
	});

});