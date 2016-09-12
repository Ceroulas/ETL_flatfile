'use strict';

var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;

var filePath = __dirname+'/../../resources/extract_success_test.dat';
var extract = require('./../../../extract/extract.js');

describe('Extract Test:', () => {
	
	it('it should return file readed', () =>{
		var expectedContentFromFile = 	'001ç1234567891234çDiegoç50000' +'\r\n'+
					   					'001ç3245678865434çRenatoç40000.99';
		
		var actualContentFromFile = extract.readInputFile(filePath);
				
		expect(actualContentFromFile).to.be.equal(expectedContentFromFile);
	});

	it('it should return error - TypeError: path must be a string', () =>{
		expect(() => {extract.readInputFile()}).to.throw(TypeError);
	});

	it('it should return error - Error: ENOENT file not found', () =>{
		var inexistentFilePath = '/test/inexistentFile.dat';
		
		expect(function(){extract.readInputFile(inexistentFilePath)}).to.throws(Error);
	});
});