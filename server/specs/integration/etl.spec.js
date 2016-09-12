'use strict';

var mocha = require('mocha');
var fs = require('fs');
var chai = require('chai');
var expect = chai.expect;

var extract = require('./../../extract/extract.js');

describe('Extract-Transform-Load Test:', () => {
	
    it('it should read input file and write resume in output file', () =>{
		var inputFilePath = __dirname+'/../../../data/in/test.dat';
        var outputFilePath = __dirname+'/../../../data/out/test.done.dat';
        
        extract.readInputFile(inputFilePath);	
		
        expect(fs.existsSync(outputFilePath)).to.be.equal(true);
	});

    it('it should return ERROR: more line separator', () =>{
		var inputFilePath = __dirname+'/../resources/more_separator.dat';
        
        expect(()=>{extract.readInputFile(inputFilePath)}).to.throw(Error, 'More number of line separators than possible!');
	});
    
    it('it should return ERROR: not enough line separator', () =>{
		var inputFilePath = __dirname+'/../resources/not_enough_separator.dat';
        
        expect(()=>{extract.readInputFile(inputFilePath)}).to.throw(Error, 'Not enough line separators! Should be: 3');
	});

    it('it should return ERROR: Not a .dat file', () =>{
		var inputFilePath = __dirname+'/../resources/not_dat.txt';
        
        expect(()=>{extract.readInputFile(inputFilePath)}).to.throw(Error, 'Not a .dat file!');
	});

    it('it should return ERROR: Invalid file name', () =>{
        var inputFilePath = __dirname+'/../resources/invalid$%@*name.dat';
        
        expect(()=>{extract.readInputFile(inputFilePath)}).to.throw(Error, 'Not a valid file name!');
    });
});