'use strict';

var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;

var filePath = __dirname+'/../resources/test.dat';
var transform = require('./../../transform/parseFile.js');

describe('parseFile Test:', () => {
	
	/*it('it should return file readed', () =>{
		var expectedContentFromFile = 	'001ç1234567891234çDiegoç50000' +'\n'+
					   					'001ç3245678865434çRenatoç40000.99';
		
		var linesSeparated = transform.parseString(filePath);
				
		//expect(actualContentFromFile).to.be.equal(expectedContentFromFile);
	});*/

	it('it should return file readed', () =>{
		var expectedContentFromExtract = 	{
			id: '001',
			documentCode: '1234567891234',
			name: 'Diego', 
			thirdInfo: '50000'
		};	   					
		
		var structOfSeparatedLine = transform.parseLinesFromInputFile(filePath);
				
		expect(structOfSeparatedLine).to.be.equal(expectedContentFromExtract);
	});

});