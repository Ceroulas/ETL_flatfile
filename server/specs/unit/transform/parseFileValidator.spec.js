'use strict';

var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;

var transform = require('./../../../transform/parseFileValidator.js');

describe('parseFileValidator Test:', () => {
	
	it('it should return true: number of line separators is ok', () =>{
		var lineSeparator = 'ç';
		var lineToValidate = '001ç1234567891234çDiegoç50000';

		expect(transform.validateLineSeparator(lineToValidate, lineSeparator)).to.be.equal(true);
	});

	it('it should return true: Id and documentCode have only digits', () =>{
		var contentFromExtract = {
			id: '001',
			documentCode: '1234567891234',
			name: 'Diego', 
			thirdInfo: '50000'
		};	

		expect(transform.validateElementsFromParsedLine(contentFromExtract)).to.be.equal(true);
	});

	it('it should return ERROR: document code have chars', () =>{
		var contentFromExtract = {
			id: '001',
			documentCode: '1234567xxxx891234',
			name: 'Diego', 
			thirdInfo: '50000'
		};

		expect(()=>{transform.validateElementsFromParsedLine(contentFromExtract)}).to.throw(Error, 'Document code needs to have only digits!');
	});

	it('it should return ERROR: ID code have chars', () =>{
		var contentFromExtract = {
			id: '0xxx01',
			documentCode: '1234567xxxx891234',
			name: 'Diego', 
			thirdInfo: '50000'
		};

		expect(()=>{transform.validateElementsFromParsedLine(contentFromExtract)}).to.throw(Error,'ID needs to have only digits!');
	});

	it('it should return ERROR: more than 3 line separators', () =>{
		var lineSeparator = 'ç';
		var lineToValidate = '001ç1234ç5678912ç34çDiegoç50000';

		expect(()=>{transform.validateLineSeparator(lineToValidate, lineSeparator)}).to.throw(Error, 'More number of line separators than possible!');
	});	

	it('it should return ERROR: not enough line separators', () =>{
		var lineSeparator = 'ç';
		var numPossiblesLineSeparators = 3;
		var lineToValidate = '0011234567891234çDiegoç50000';

		expect(()=>{transform.validateLineSeparator(lineToValidate, lineSeparator)}).to.throw(Error, 'Not enough line separators! Should be: '+ numPossiblesLineSeparators);
	});

});