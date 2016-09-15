'use strict';

const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;

const parseValidator = require('./../../../transform/parsefilevalidator.js');

describe('Transform - Parse File Validator Test:', () => {
	
	it('it should return true: number of line separators is ok', () =>{
		var lineSeparator = 'ç';
		var lineToValidate = '001ç1234567891234çDiegoç50000';
		var index = 0;

		var validateSeparator = parseValidator.validateString(lineToValidate, index, lineSeparator);

		expect(validateSeparator).to.be.equal(true);
	});

	it('it should return ERROR: document code have chars', () =>{
		var lineSeparator = 'ç';
		var messageError = 'Document code needs to have only digits!';
		var lineToValidate = '001ç123456XXX7891234çDiegoç50000';
		var index = 0;

		var validateSeparator = ()=>{parseValidator.validateString(lineToValidate, index, lineSeparator)};
		expect(validateSeparator).to.throw(Error, messageError);
	});

	it('it should return ERROR: ID code have chars', () =>{
		var lineSeparator = 'ç';
		var messageError = 'ID needs to have only digits!';
		var lineToValidate = '00XXX1ç1234567891234çDiegoç50000';
		var index = 0;

		var validateSeparator = ()=>{parseValidator.validateString(lineToValidate, index, lineSeparator)};
		expect(validateSeparator).to.throw(Error, messageError);
	});

	it('it should return ERROR: more than 3 line separators', () =>{
		var lineSeparator = 'ç';
		var numPossiblesLineSeparators = 3;
		var lineToValidate = '001ç1234ç5678912ç34çDiegoç50000';
		var index = 0;
		var messageError  = 'Number of line separators is wrong! Should be: '+ numPossiblesLineSeparators;

		var validateSeparator = ()=>{parseValidator.validateString(lineToValidate, index, lineSeparator)};
		expect(validateSeparator).to.throw(Error, messageError);
	});	

	it('it should return ERROR: not enough line separators', () =>{
		var lineSeparator = 'ç';
		var numPossiblesLineSeparators = 3;
		var lineToValidate = '0011234567891234çDiegoç50000';
		var index = 0;
		var messageError = 'Number of line separators is wrong! Should be: '+ numPossiblesLineSeparators;

		var validateSeparator = ()=>{parseValidator.validateString(lineToValidate, index, lineSeparator)};
		expect(validateSeparator).to.throw(Error, messageError);
	});

});