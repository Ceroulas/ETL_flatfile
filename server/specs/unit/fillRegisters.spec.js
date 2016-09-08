'use strict';

var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;

var fillRegisters = require('./../../transform/fillRegisters.js');

describe('fillRegisters tests:', function(){
	it('', function(){
		var contentFromFileParse = 	{
			id: '001',
			documentCode: '1234567891234',
			name: 'Diego', 
			thirdInfo: '50000'
		};

		fillRegisters.selectWhatRegisterToFill(contentFromFileParse);

		expect(fillRegisters.arrayOfCostumersInputFile.lenght).to.equal(1);	
	})
})