'use strict';

var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;

var transform = require('./../../transform/parseFileValidator.js');

describe('parseFileValidator Test:', () => {
	
	it('it should return true: number of line separators is ok', () =>{
		var lineSeparator = 'ç';
		var lineToValidate = '001ç1234567891234çDiegoç50000';

		expect(transform.validateLineSeparator(lineToValidate, lineSeparator)).to.be.equal(true);
	});

	it('it should return Error: more than 3 line separators', () =>{
		var lineSeparator = 'ç';
		var lineToValidate = '001ç1234ç5678912ç34çDiegoç50000';

		expect(()=>{transform.validateLineSeparator(lineToValidate, lineSeparator)}).to.throw(Error, 'More number of line separators than possible!');
	});	

	it('it should return Error: not enough line separators', () =>{
		var lineSeparator = 'ç';
		var numPossiblesLineSeparators = 3;
		var lineToValidate = '0011234567891234çDiegoç50000';

		expect(()=>{transform.validateLineSeparator(lineToValidate, lineSeparator)}).to.throw(Error, 'Not enough line separators! Should be: '+ numPossiblesLineSeparators);
	});

});