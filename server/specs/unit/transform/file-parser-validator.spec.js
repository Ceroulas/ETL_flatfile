'use strict';

const mocha = require('mocha');
const fs = require('fs');
const sleep = require('sleep');
const Log = require('log');
const chai = require('chai');
const expect = chai.expect;

const parseValidator = require('./../../../transform/file-parser/file-parser-validator.js');
const logPath = __dirname+'/../../../log/logs/test.log';
const etlLog = require('./../../../log/etl-log.js');

describe('Transform - Parse File Validator Test:', () => {

	before(function () {
		let inpurFileName = 'test';
		etlLog.createLog(inpurFileName);
	})

	function ReadLog (logPath){
        var contentFromLog = fs.readFileSync(logPath).toString();
        var lines = contentFromLog.trim().split('\n');
       
        return lines.pop();
    }
	
	it('it should return true: number of line separators is ok', () =>{
		var lineSeparator = 'ç';
		var lineToValidate = '001ç1234567891234çDiegoç50000';
		var index = 0;

		var validateSeparator = parseValidator.validateLineSeparator(lineToValidate, index, lineSeparator);

		
		expect(validateSeparator).to.be.equal(true);
	});

	it('it should return ERROR: document code have chars', () =>{
		var lineSeparator = 'ç';
		var messageError = 'Document code needs to have only digits!';
		var lineToValidate = {
			id: '001',
			documentCode: '123456XXX7891234',
			thirdItem: 'Diego', 
			fourthItem: '50000'
		};
		var index = 0;

		parseValidator.validateElementsFromParsedLine(lineToValidate, index);
		sleep.usleep(50);
        var resultFromLog = ReadLog(logPath);

		expect(resultFromLog.search(messageError)).to.not.equal(-1);
	});

	it('it should return ERROR: ID code have chars', () =>{
		var lineSeparator = 'ç';
		var messageError = 'ID needs to have only digits!';
		var lineToValidate = {
			id: '0XXX01',
			documentCode: '1234567891234',
			thirdItem: 'Diego', 
			fourthItem: '50000'
		};
		var index = 0;

		parseValidator.validateElementsFromParsedLine(lineToValidate, index);
		sleep.usleep(50);
        var resultFromLog = ReadLog(logPath);

		expect(resultFromLog.search(messageError)).to.not.equal(-1);
	});

	it('it should return ERROR: more than 3 line separators', () =>{
		var lineSeparator = 'ç';
		var numPossiblesLineSeparators = 3;
		var lineToValidate = '001ç1234ç5678912ç34çDiegoç50000';
		var index = 0;
		var messageError  = 'Number of line separators is wrong! Should be: '+ numPossiblesLineSeparators;

		parseValidator.validateLineSeparator(lineToValidate, index, lineSeparator);
		sleep.usleep(50);
        var resultFromLog = ReadLog(logPath);

		expect(resultFromLog.search(messageError)).to.not.equal(-1);
	});

	it('it should return ERROR: not enough line separators', () =>{
		var lineSeparator = 'ç';
		var numPossiblesLineSeparators = 3;
		var lineToValidate = '0011234567891234çDiegoç50000';
		var index = 0;
		var messageError = 'Number of line separators is wrong! Should be: '+ numPossiblesLineSeparators;

		parseValidator.validateLineSeparator(lineToValidate, index, lineSeparator);
		sleep.usleep(50);
        var resultFromLog = ReadLog(logPath);

		expect(resultFromLog.search(messageError)).to.not.equal(-1);
	});

});