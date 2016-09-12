'use strict';

var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;

var fileValidator = require('./../../../extract/extractvalidator.js');

describe('Extract Verification Test:', () => {
	
	it('fileExtensionVerification: it should return true (it is a .dat file)', () =>{
		var fileExtensionToBeTested = 'test.dat';
		
		expect(fileValidator.fileExtensionVerification(fileExtensionToBeTested)).to.be.equal(true);
	});

	it('fileExtensionVerification: it should return false (it is not a .dat file)', () =>{
		var fileExtensionToBeTested = 'test.txt';
		
		expect(fileValidator.fileExtensionVerification(fileExtensionToBeTested)).to.be.equal(false);
	});

	it('fileExtensionVerification: it should throw TypeError: no string(file) sent as parameter', () =>{
				
		expect(()=>{fileValidator.fileExtensionVerification()}).to.throw(TypeError);
	});


	it('fileNameValidation: it should return true (it is a valid file name)', () =>{
		var fileNameToBeTested = 'validFileName.dat';
		
		expect(fileValidator.fileNameValidation(fileNameToBeTested)).to.be.equal(true);
	});

	it('fileNameValidation: it should return false (it is not a valid file name)', () =>{
		var fileNameToBeTested = 'notValidFileName!?.dat';
		
		expect(fileValidator.fileNameValidation(fileNameToBeTested)).to.be.equal(false);
	});

	it('fileNameValidation: it should return TypeError: no string(file) sent as parameter', () =>{
		expect(() =>{fileValidator.fileNameValidation()}).to.throw(Error, 'No file was sent to validation!');

	});

});