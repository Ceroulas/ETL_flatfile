'use strict';

const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const transform = require('./../../../transform/parse-sale-info.js');

const filePath = __dirname+'/../../resources/test.dat';

describe('Transform - Parse Sale Info Test:', () => {
	
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