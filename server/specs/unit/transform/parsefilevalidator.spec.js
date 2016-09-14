'use strict';

var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;

var transform = require('./../../../transform/parsefilevalidator.js');

describe('Parse File Validator Test:', () => {
	
	it('it should return true: number of line separators is ok', () =>{
		var lineSeparator = 'ç';
		var lineToValidate = '001ç1234567891234çDiegoç50000';

		var validateSeparator = transform.validateLineSeparator(lineToValidate, lineSeparator);

		expect(validateSeparator).to.be.equal(true);
	});

	it('it should return true: Id and documentCode have only digits', () =>{
		var contentFromExtract = {
			id: '001',
			documentCode: '1234567891234',
			name: 'Diego', 
			thirdInfo: '50000'
		};	

		var validateSeparator = transform.validateElementsFromParsedLine(contentFromExtract);
		expect(validateSeparator).to.be.equal(true);
	});

	it('it should return ERROR: document code have chars', () =>{
		var messageError = 'Document code needs to have only digits!';
		var contentFromExtract = {
			id: '001',
			documentCode: '1234567xxxx891234',
			name: 'Diego', 
			thirdInfo: '50000'
		};

		var validateSeparator = ()=>{transform.validateElementsFromParsedLine(contentFromExtract)};
		expect(validateSeparator).to.throw(Error, messageError);
	});

	it('it should return ERROR: ID code have chars', () =>{
		var contentFromExtract = {
			id: '0xxx01',
			documentCode: '1234567xxxx891234',
			name: 'Diego', 
			thirdInfo: '50000'
		};

		var validateSeparator = ()=>{transform.validateElementsFromParsedLine(contentFromExtract)};
		expect(validateSeparator).to.throw(Error,'ID needs to have only digits!');
	});

	it('it should return ERROR: more than 3 line separators', () =>{
		var lineSeparator = 'ç';
		var lineToValidate = '001ç1234ç5678912ç34çDiegoç50000';
		var messageError  = 'More number of line separators than possible!';

		var validateSeparator = ()=>{transform.validateLineSeparator(lineToValidate, lineSeparator)};
		expect(validateSeparator).to.throw(Error, messageError);
	});	

	it('it should return ERROR: not enough line separators', () =>{
		var lineSeparator = 'ç';
		var numPossiblesLineSeparators = 3;
		var lineToValidate = '0011234567891234çDiegoç50000';
		var messageError = 'Not enough line separators! Should be: '+ numPossiblesLineSeparators;

		var validateSeparator = ()=>{transform.validateLineSeparator(lineToValidate, lineSeparator)};
		expect(validateSeparator).to.throw(Error, messageError);
	});

});