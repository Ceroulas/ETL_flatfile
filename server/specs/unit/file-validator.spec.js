'use strict';

const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;

const fileValidator = require('./../../file-validator.js');

describe('File Verification Test:', () => {

	it('fileValidation: it should return ERROR (it is not a .dat file)', () =>{
		var fileExtensionToBeTested = 'test.txt';
		var messageError = 'Not a .dat file!';
		
		var fileVerification = () =>{fileValidator.fileValidation(fileExtensionToBeTested)};
		expect(fileVerification).to.throw(Error, messageError);
	});

	it('fileValidation: it should throw TypeError: no string(file) sent as parameter', () =>{
		var fileVerification = ()=>{fileValidator.fileValidation()};		
		expect(fileVerification).to.throw(TypeError);
	});


	it('fileValidation: it should return true (it is a valid file name and .dat file)', () =>{
		var fileNameToBeTested = 'validFileName.dat';
		
		var fileVerification = fileValidator.fileValidation(fileNameToBeTested);
		expect(fileVerification).to.be.equal(true);
	});

	it('fileValidation: it should return false (it is not a valid file name)', () =>{
		var fileNameToBeTested = 'notValidFileName!?.dat';
		var messageError = 'Not a valid file name!';
		
		var fileVerification = ()=>{fileValidator.fileValidation(fileNameToBeTested)};
		expect(fileVerification).to.throw(false);
	});

});