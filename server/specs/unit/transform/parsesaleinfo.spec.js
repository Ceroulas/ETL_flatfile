'use strict';

var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;

var filePath = __dirname+'/../../resources/test.dat';
var transform = require('./../../../transform/parsesaleinfo.js');

describe('Parse Sale Info Test:', () => {
	
	it('it should return the expect sale string parsed.', () =>{
		var stringSaleUnparsed = '[1-10-100,2-30-2.50,3-40-3.10]';
		var expectedSaleInfoParsed= [
			['1','10','100'],
			['2','30','2.50'],
			['3','40','3.10']
		];
		var parseSale = transform.parseSaleInfo(stringSaleUnparsed);	   					
		expect(parseSale).to.deep.equal(expectedSaleInfoParsed);
	});

	it('it should return TypeError: no data received to parse', () =>{
		var messageError = 'Cannot read property \'replace\' of undefined';

		var parseSale = ()=>{transform.parseSaleInfo()};
		expect(parseSale).to.throw(TypeError, messageError);
	});

});