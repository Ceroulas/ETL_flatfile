'use strict';

const mocha = require('mocha');
const fs  = require('fs');
const sleep = require('sleep');
const rewire = require('rewire');
const chai = require('chai');
const expect = chai.expect;

const fillRegisters = rewire('./../../../transform/fill-registers.js');
const logPath = __dirname+'/../../../etl.log';

describe('Transform - Fill registers tests:', function(){

  	afterEach(function(){
  		fillRegisters.__set__("Costumer.count", 0);
  		fillRegisters.__set__("Salesman.count", 0);
  	});

  	function ReadLog (logPath){
        var contentFromLog = fs.readFileSync(logPath).toString();
        var lines = contentFromLog.trim().split('\n');
       
        return lines.pop();
    }

	it('it should insert a costumer in array', function(){
		var contentFromFileParse = 	{
			id: '002',
			documentCode: '1234567891234',
			thirdItem: 'Diego', 
			fourthItem: 'agricola'
		};
		var arrCostumer = [];
		arrCostumer = fillRegisters.fillCostumerRegister(contentFromFileParse, arrCostumer);
		
		expect(arrCostumer.length).to.equal(1);	
	})

	it('it should insert a salesman in array', function(){
		var contentFromFileParse = 	{
			id: '001',
			documentCode: '1234567891234',
			thirdItem: 'Diego', 
			fourthItem: '50000'
		};

		var arrSalesman = [];
		arrSalesman = fillRegisters.fillSalesmanRegister(contentFromFileParse, arrSalesman);

		expect(arrSalesman.length).to.equal(1);		
	})

	it('it should insert a sale in array', function(){
		var contentFromFileParse = 	{
			id: '003',
			documentCode: '10',
			thirdItem: '[1-10-100,2-30-2.50,3-40-3.10]', 
			fourthItem: 'Diego'
		};

		var arrSale = [];
		arrSale = fillRegisters.fillSaleRegister(contentFromFileParse, arrSale);

		expect(arrSale.length).to.equal(1);	
	})

	it('it should report Info on console: costumer already registered.', function(){
		var costumerToInsertInArray = 	{
			id: '002',
			documentCode: '1111111111',
			thirdItem: 'existentUser', 
			fourthItem: 'agricola'
		};
		var messageInfo = 'Costumer "existentUser" already in register.';
		
		var arrCostumer = [];
		arrCostumer = fillRegisters.fillCostumerRegister(costumerToInsertInArray, arrCostumer);
		arrCostumer = fillRegisters.fillCostumerRegister(costumerToInsertInArray, arrCostumer);
		
		sleep.usleep(50);		
		var lastLineFromLog = ReadLog(logPath);

        expect(lastLineFromLog.search(messageInfo)).to.not.equal(-1);
	})

	it('it should report Info on console: salesman already registered.', function(){
		var salesmanToInsertInArray = 	{
			id: '001',
			documentCode: '2222222222',
			thirdItem: 'existentSalesman', 
			fourthItem: '20000'
		};
		var messageInfo = 'Salesman "existentSalesman" already in register.';
		
		var arrSalesman = [];
		arrSalesman = fillRegisters.fillSalesmanRegister(salesmanToInsertInArray, arrSalesman);
		arrSalesman = fillRegisters.fillSalesmanRegister(salesmanToInsertInArray, arrSalesman);
	
		sleep.usleep(50);
		var lastLineFromLog = ReadLog(logPath);

        expect(lastLineFromLog.search(messageInfo)).to.not.equal(-1);		
	})
})