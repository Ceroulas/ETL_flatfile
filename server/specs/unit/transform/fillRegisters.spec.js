'use strict';

var mocha = require('mocha');
var sinon = require('sinon');
require('mocha-sinon');
var rewire = require('rewire');
var chai = require('chai');
var expect = chai.expect;

var fillRegisters = rewire('./../../../transform/fillRegisters.js');

describe('fillRegisters tests:', function(){

	beforeEach(function() {
    	this.sinon.stub(console, 'info');
    	this.sinon.stub(console, 'error');
  	});

	it('it should insert a costumer in array', function(){
		var contentFromFileParse = 	{
			id: '002',
			documentCode: '1234567891234',
			name: 'Diego', 
			thirdInfo: 'agricola'
		};

		fillRegisters.selectWhatRegisterToFill(contentFromFileParse);

		expect(fillRegisters.__get__("arrayOfCostumersInputFile").length).to.equal(1);	
	})

	it('it should insert a salesman in array', function(){
		var contentFromFileParse = 	{
			id: '001',
			documentCode: '1234567891234',
			name: 'Diego', 
			thirdInfo: '50000'
		};

		fillRegisters.selectWhatRegisterToFill(contentFromFileParse);

		expect(fillRegisters.__get__("arrayOfSalesmansInputFile").length).to.equal(1);	
	})

	it('it should insert a sale in array', function(){
		var contentFromFileParse = 	{
			id: '003',
			documentCode: '10',
			saleInfo: '[1-10-100,2-30-2.50,3-40-3.10]', 
			salesmanName: 'Diego'
		};

		fillRegisters.selectWhatRegisterToFill(contentFromFileParse);

		expect(fillRegisters.__get__("arrayOfSalesInputFile").length).to.equal(1);	
	})

	it('it should report Info on console: costumer already registered.', function(){
		var costumerToInsertInArray = 	{
			id: '002',
			documentCode: '1111111111',
			name: 'existentUser', 
			thirdInfo: 'agricola'
		};
		var costumerAlreadyInArray = 	{
			id: '002',
			documentCode: '1111111111',
			name: 'existentUser', 
			thirdInfo: 'agricola'
		};
		
		fillRegisters.selectWhatRegisterToFill(costumerToInsertInArray);
		fillRegisters.selectWhatRegisterToFill(costumerAlreadyInArray);
				
		expect(console.info.calledOnce).to.be.true;
    	expect(console.info.calledWith('Costumer already in register.')).to.be.true;	
	})

	it('it should report Info on console: salesman already registered.', function(){
		var costumerToInsertInArray = 	{
			id: '001',
			documentCode: '2222222222',
			name: 'existentSalesman', 
			thirdInfo: '20000'
		};
		var costumerAlreadyInArray = 	{
			id: '001',
			documentCode: '2222222222',
			name: 'existentSalesman', 
			thirdInfo: '20000'
		};
		
		fillRegisters.selectWhatRegisterToFill(costumerToInsertInArray);
		fillRegisters.selectWhatRegisterToFill(costumerAlreadyInArray);
				
		expect(console.info.calledOnce).to.be.true;
    	expect(console.info.calledWith('Salesman already in register.')).to.be.true;	
	})


	it('it should report Error: ID not recognized.', function(){
		var contentFromFileParse = 	{
			id: '004',
			documentCode: '123456789',
			name: 'Teste', 
			thirdInfo: '50000'
		};
		
		fillRegisters.selectWhatRegisterToFill(contentFromFileParse);

    	expect(console.error.calledOnce).to.be.true;
    	expect(console.error.calledWith('ID not recognized in System. Verify your file syntax.')).to.be.true;
	})
})