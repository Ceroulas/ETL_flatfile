'use strict';

const mocha = require('mocha');
const fs  = require('fs');
const sleep = require('sleep');
const chai = require('chai');
const expect = chai.expect;

const filePath = __dirname+'/../../resources/extract-success-test.dat';
const logPath = __dirname+'/../../../etl.log';
const extract = require('./../../../extract/extract.js');

describe('Extract Test:', () => {
	
	function ReadLog (logPath){
        var contentFromLog = fs.readFileSync(logPath).toString();
        var lines = contentFromLog.trim().split('\n');
       
        return lines.pop();
    }

	it('it should return file readed', () =>{
		var expectedContentFromFile = 	'001ç1234567891234çDiegoç50000' +'\r\n'+
					   					'001ç3245678865434çRenatoç40000.99';
		
		var actualContentFromFile = extract.readInputFile(filePath);
				
		expect(actualContentFromFile).to.be.equal(expectedContentFromFile);
	});

	it('it should return ERROR', () =>{
		var messageError = 'TypeError';
		
		extract.readInputFile();
		sleep.usleep(50);
		var resultFromLog = ReadLog(logPath);
		
		expect(resultFromLog.search(messageError)).to.not.equal(-1);
	});

	/*it('it should return ERROR - Error: ENOENT file not found', () =>{
		var inexistentFilePath = '/test/inexistentFile.dat';
		var messageError = 'Error';
		
		extract.readInputFile(inexistentFilePath);
		sleep.usleep(50);
		var resultFromLog = ReadLog(logPath);
		console.log('resultFromLog ' +resultFromLog)
		expect(resultFromLog.search(messageError)).to.not.equal(-1);
	});*/
});