'use strict';

var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;

var filePath = __dirname+'/../resources/test.dat';
var transform = require('./../../transform/parseFile.js');

describe('parseFile Test:', () => {
	
	it('it should return struct JSON of lines readed from file', () =>{
		var expectedContentFromExtract = JSON.stringify([{
			id: '001',
			documentCode: '1234567891234',
			name: 'Diego', 
			thirdInfo: '50000'
		}]);	   					
		
		var structOfSeparatedLines = JSON.stringify(transform.parseLinesFromInputFile(filePath));
			
		expect(structOfSeparatedLines).to.be.equal(expectedContentFromExtract);
	});

	it('it should return TypeError: no data received from Extract', () =>{
		expect(()=>{transform.parseLinesFromInputFile()}).to.throw(TypeError, 'path must be a string');
	});

});