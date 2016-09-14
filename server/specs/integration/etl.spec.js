'use strict';

var mocha = require('mocha');
var fs = require('fs');
var chai = require('chai');
var expect = chai.expect;

var etl = require('./../../etl.js');

describe('Extract-Transform-Load Test:', () => {
	
    it('it should read input file and write resume in output file', () =>{
		var inputFilePath = __dirname+'/../../../data/in/*%.dat';
        var outputFilePath = __dirname+'/../../../data/out/test.done.dat';
        
        etl.flatFileResumer(inputFilePath, outputFilePath);	
		
        expect(fs.existsSync(outputFilePath)).to.be.equal(true);
	});

    /*it('it should return ERROR: more line separator', () =>{
		var inputFilePath = __dirname+'/../resources/more_separator.dat';
        var outputFilePath = __dirname+'/../../../data/out/test.done.dat';
        var messageError = 'More number of line separators than possible!';
        
        var readInputFile = ()=>{etl.flatFileResumer(inputFilePath, outputFilePath)};
        expect(readInputFile).to.throw(Error, messageError);
	});
    
    it('it should return ERROR: not enough line separator', () =>{
		var inputFilePath = __dirname+'/../resources/not_enough_separator.dat';
        var messageError = 'Not enough line separators! Should be: 3';
        
        var readInputFile = ()=>{etl.readInputFile(inputFilePath)};
        expect(readInputFile).to.throw(Error, messageError);
	});

    it('it should return ERROR: Not a .dat file', () =>{
		var inputFilePath = __dirname+'/../resources/not_dat.txt';
        var messageError = 'Not a .dat file!';
        
        var readInputFile = ()=>{etl.readInputFile(inputFilePath)};
        expect(readInputFile).to.throw(Error, messageError);
	});

    it('it should return ERROR: Invalid file name', () =>{
        var inputFilePath = __dirname+'/../resources/invalid$%@*name.dat';
        var messageError = 'Not a valid file name!';
        
        var readInputFile = ()=>{etl.readInputFile(inputFilePath)}; 
        expect(readInputFile).to.throw(Error, messageError);
    });*/
});