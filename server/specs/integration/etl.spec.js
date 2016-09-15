'use strict';

const mocha = require('mocha');
const fs = require('fs');
const sleep = require('sleep');
const chai = require('chai');
const expect = chai.expect;

const etl = require('./../../etl.js');
const logPath = __dirname+'/../../etl.log';

describe('Extract-Transform-Load Test:', () => {
	
    function ReadLog (logPath){
        var contentFromLog = fs.readFileSync(logPath).toString();
        var lines = contentFromLog.trim().split('\n');
       
        return lines.pop();
    }

    it('it should read input file and write resume in output file', () =>{
		var inputFilePath = __dirname+'/../../../data/in/test.dat';
        var outputFilePath = __dirname+'/../../../data/out/test.done.dat';
        
        etl.flatFileResumer(inputFilePath, outputFilePath);	
		
        expect(fs.existsSync(outputFilePath)).to.be.equal(true);
	});

    it('it should return ERROR: more line separator', () =>{
		var inputFilePath = __dirname+'/../resources/more_separator.dat';
        var outputFilePath = __dirname+'/../../../data/out/test.done.dat';
        var logPath = __dirname+'/../../etl.log';
        var messageError = 'Number of line separators is wrong! Should be: 3';
        
        var readInputFile = etl.flatFileResumer(inputFilePath, outputFilePath); 
        var lastLineFromLog = ReadLog(logPath);

        expect(lastLineFromLog.search(messageError)).to.not.equal(-1);

	});
    
    it('it should return ERROR: not enough line separator', () =>{
		var inputFilePath = __dirname+'/../resources/not_enough_separator.dat';
        var outputFilePath = __dirname+'/../../../data/out/test.done.dat';
        var messageError = 'Number of line separators is wrong! Should be: 3';
        
        var readInputFile = etl.flatFileResumer(inputFilePath, outputFilePath);       
        var lastLineFromLog = ReadLog(logPath);

        expect(lastLineFromLog.search(messageError)).to.not.equal(-1);
	});

    it('it should return ERROR: Not a .dat file', () =>{
		var inputFilePath = __dirname+'/../resources/not_dat.txt';
        var outputFilePath = __dirname+'/../../../data/out/test.done.dat';
        var messageError = 'Not a .dat file!';
        
        var readInputFile = etl.flatFileResumer(inputFilePath, outputFilePath);
        sleep.usleep(50);
        var lastLineFromLog = ReadLog(logPath);

        expect(lastLineFromLog.search(messageError)).to.not.equal(-1);
	});

    it('it should return ERROR: Invalid file name', () =>{
        var inputFilePath = __dirname+'/../resources/invalid$%@*name.dat';
        var outputFilePath = __dirname+'/../../../data/out/test.done.dat';
        var messageError = 'Not a valid file name!';
        
        var readInputFile = etl.flatFileResumer(inputFilePath, outputFilePath);
        sleep.usleep(50);
        var lastLineFromLog = ReadLog(logPath);

        expect(lastLineFromLog.search(messageError)).to.not.equal(-1);
    });
});