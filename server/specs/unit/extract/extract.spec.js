'use strict';

var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;

var filePath = __dirname+'/../../resources/extract-success-test.dat';
var extract = require('./../../../extract/extract.js');

describe('Extract Test:', () => {
	
	it('it should return file readed', () =>{
		var expectedContentFromFile = 	'001ç1234567891234çDiegoç50000' +'\r\n'+
					   					'001ç3245678865434çRenatoç40000.99';
		
		var actualContentFromFile = extract.readInputFile(filePath);
				
		expect(actualContentFromFile).to.be.equal(expectedContentFromFile);
	});

	it('it should return ERROR', () =>{
		var readInputFile = () => {extract.readInputFile()};
		expect(readInputFile).to.throw(Error);
	});

	it('it should return ERROR - Error: ENOENT file not found', () =>{
		var inexistentFilePath = '/test/inexistentFile.dat';
		
		var readInputFile = ()=>{extract.readInputFile(inexistentFilePath)};
		expect(readInputFile).to.throws(Error);
	});
});