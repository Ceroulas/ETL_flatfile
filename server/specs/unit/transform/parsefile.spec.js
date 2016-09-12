'use strict';

var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;

var transform = require('./../../../transform/parsefile.js');

describe('Parse file Test:', () => {
	
	it('it should return struct of line parsed readed from file', () =>{
		var contentFromFile = '001ç1234567891234çDiegoç50000';

		var expectedContentFromExtract = {
			id: '001',
			documentCode: '1234567891234',
			name: 'Diego', 
			thirdInfo: '50000'
		};	   					
		
		var structOfSeparatedLines = transform.parseLinesFromInputFile(contentFromFile);
			
		expect(structOfSeparatedLines.id).to.be.equal(expectedContentFromExtract.id);
		expect(structOfSeparatedLines.documentCode).to.be.equal(expectedContentFromExtract.documentCode);
		expect(structOfSeparatedLines.name).to.be.equal(expectedContentFromExtract.name);
		expect(structOfSeparatedLines.thirdInfo).to.be.equal(expectedContentFromExtract.thirdInfo);
	});

	it('it should return Error: ID needs to have only digits!', () =>{
		var contentFromFile = '0xx01ç1234567891234çDiegoç50000';

		expect(()=>{transform.parseLinesFromInputFile(contentFromFile)}).to.throw(Error, 'ID needs to have only digits!');
	});

	it('it should return Error: Not enough line separators!', () =>{
		var contentFromFile = '0011234567891234çDiegoç50000';

		expect(()=>{transform.parseLinesFromInputFile(contentFromFile)}).to.throw(Error, 'Not enough line separators! Should be: 3');
	});

	it('it should return Error: Document code needs to have only digits!', () =>{
		var contentFromFile = '001ç12345xxx67891234çDiegoç50000';

		expect(()=>{transform.parseLinesFromInputFile(contentFromFile)}).to.throw(Error, 'Document code needs to have only digits!');
	});

	it('it should return TypeError: no data received from Extract', () =>{
		expect(()=>{transform.parseLinesFromInputFile()}).to.throw(Error);
	});

});