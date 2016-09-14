'use strict';

var mocha = require('mocha');
var sinon = require('sinon');
require('mocha-sinon');
var rewire = require('rewire');
var chai = require('chai');
var expect = chai.expect;

var fillRegisters = rewire('./../../../transform/fillregisters.js');

describe('Fill registers tests:', function(){

	beforeEach(function() {
    	this.sinon.stub(console, 'info');
    	this.sinon.stub(console, 'error');
  	});

	it('it should insert a costumer in array', function(){
		var contentFromFileParse = 	{
			id: '002',
			documentCode: '1234567891234',
			thirdItem: 'Diego', 
			fourthItem: 'agricola'
		};

		fillRegisters.selectWhatRegisterToFill(contentFromFileParse);

		expect(fillRegisters.__get__("arrayOfCostumersInputFile").length).to.equal(1);	
	})

	it('it should insert a salesman in array', function(){
		var contentFromFileParse = 	{
			id: '001',
			documentCode: '1234567891234',
			thirdItem: 'Diego', 
			fourthItem: '50000'
		};

		fillRegisters.selectWhatRegisterToFill(contentFromFileParse);

		expect(fillRegisters.__get__("arrayOfSalesmansInputFile").length).to.equal(1);	
	})

	it('it should insert a sale in array', function(){
		var contentFromFileParse = 	{
			id: '003',
			documentCode: '10',
			thirdItem: '[1-10-100,2-30-2.50,3-40-3.10]', 
			fourthItem: 'Diego'
		};

		fillRegisters.selectWhatRegisterToFill(contentFromFileParse);

		expect(fillRegisters.__get__("arrayOfSalesInputFile").length).to.equal(1);	
	})

	it('it should report Info on console: costumer already registered.', function(){
		var costumerToInsertInArray = 	{
			id: '002',
			documentCode: '1111111111',
			thirdItem: 'existentUser', 
			fourthItem: 'agricola'
		};
		var costumerAlreadyInArray = 	{
			id: '002',
			documentCode: '1111111111',
			thirdItem: 'existentUser', 
			fourthItem: 'agricola'
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
			thirdItem: 'existentSalesman', 
			fourthItem: '20000'
		};
		var costumerAlreadyInArray = 	{
			id: '001',
			documentCode: '2222222222',
			thirdItem: 'existentSalesman', 
			fourthItem: '20000'
		};
		
		fillRegisters.selectWhatRegisterToFill(costumerToInsertInArray);
		fillRegisters.selectWhatRegisterToFill(costumerAlreadyInArray);
				
		expect(console.info.calledOnce).to.be.true;
    	expect(console.info.calledWith('Salesman already in register.')).to.be.true;	
	})


	it('it should report Error: ID not recognized.', function(){
		var messageError = 'ID not recognized in System. Verify your file syntax.';
		var contentFromFileParse = 	{
			id: '004',
			documentCode: '123456789',
			thirdItem: 'Teste', 
			fourthItem: '50000'
		};
		
		fillRegisters.selectWhatRegisterToFill(contentFromFileParse);

    	expect(console.error.calledOnce).to.be.true;
    	expect(console.error.calledWith(messageError)).to.be.true;
	})
})