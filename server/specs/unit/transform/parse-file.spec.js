'use strict';

const mocha = require('mocha');
const fs = require('fs');
const sleep = require('sleep');
const Log = require('log');
const chai = require('chai');
const expect = chai.expect;

const parse = require('./../../../transform/parse-file.js');
const logPath = __dirname+'/../../../log/logs/test.log';
const etlLog = require('./../../../log/etl-log.js');

describe('Transform - Parse file Test:', () => {

	before(function () {
		let inpurFileName = 'test';
		etlLog.createLog(inpurFileName);
	})

	function ReadLog (logPath){
        var contentFromLog = fs.readFileSync(logPath).toString();
        var lines = contentFromLog.trim().split('\n');
       
        return lines.pop();
    }
	
	it('it should return struct of line parsed readed from file', () =>{
		var contentFromFile = '001ç1234567891234çDiegoç50000';

		var expectedContentFromExtract = [{
			id: '001',
			documentCode: '1234567891234',
			thirdItem: 'Diego', 
			fourthItem: '50000'
		}];	   					
		
		var structOfSeparatedLines = parse.parseLinesFromInputFile(contentFromFile);
			
		expect(structOfSeparatedLines.id).to.be.equal(expectedContentFromExtract.id);
		expect(structOfSeparatedLines.documentCode).to.be.equal(expectedContentFromExtract.documentCode);
		expect(structOfSeparatedLines.thirdItem).to.be.equal(expectedContentFromExtract.thirdItem);
		expect(structOfSeparatedLines.fourthItem).to.be.equal(expectedContentFromExtract.fourthItem);
	});

	it('it should return Error: ID needs to have only digits!', () =>{
		var contentFromFile = '0xx01ç1234567891234çDiegoç50000';
		var messageError = 'ID needs to have only digits!';

		parse.parseLinesFromInputFile(contentFromFile);
		var resultFromLog = ReadLog(logPath);

		expect(resultFromLog.search(messageError)).to.not.equal(-1);
	});

	it('it should return Error: Not enough line separators!', () =>{
		var contentFromFile = '0011234567891234çDiegoç50000';
		var messageError = 'Number of line separators is wrong! Should be: 3'; 

		parse.parseLinesFromInputFile(contentFromFile);
		sleep.usleep(50);
		var resultFromLog = ReadLog(logPath);
		
		expect(resultFromLog.search(messageError)).to.not.equal(-1);
	});

	it('it should return Error: Document code needs to have only digits!', () =>{
		var contentFromFile = '001ç12345xxx67891234çDiegoç50000';
		var messageError = 'Document code needs to have only digits!';

		parse.parseLinesFromInputFile(contentFromFile);
		sleep.usleep(50);
		var resultFromLog = ReadLog(logPath);
		
		expect(resultFromLog.search(messageError)).to.not.equal(-1);
	});

	it('it should return TypeError: no data received from Extract', () =>{
		var messageError = 'TypeError';

		parse.parseLinesFromInputFile();
		sleep.usleep(50);
		var resultFromLog = ReadLog(logPath);
		
		expect(resultFromLog.search(messageError)).to.not.equal(-1);
	});
});