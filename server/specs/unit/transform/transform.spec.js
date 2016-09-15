'use strict';

const mocha = require('mocha');
const sinon = require('sinon');
require('mocha-sinon');
const chai = require('chai');
const expect = chai.expect;

const transform = require('./../../../transform/transform.js');

describe('Transform Test:', () => {

	it('it should return struct of line parsed readed from file', () =>{
		var contentFromFile = '001ç1234567891234çDiegoç50000' +'\n'+
							'002ç2345675434544345çJosedaSilvaçRural' +'\n'+
							'003ç10ç[1-10-100,2-30-2.50,3-40-3.10]çDiego';

		var expectedResumeFileStruct = {
			costumerCount: 1,
			salesmanCount: 1,
			worstSalesman: 'Diego', 
			highestSale: 1199
		};	   					
		
		var structOfSeparatedLines = transform.transformFlatFile(contentFromFile);

		expect(structOfSeparatedLines.costumerCount).to.be.equal(expectedResumeFileStruct.costumerCount);
		expect(structOfSeparatedLines.salesmanCount).to.be.equal(expectedResumeFileStruct.salesmanCount);
		expect(structOfSeparatedLines.worstSalesman).to.be.equal(expectedResumeFileStruct.worstSalesman);
		expect(structOfSeparatedLines.highestSale).to.be.equal(expectedResumeFileStruct.highestSale);
	});

	it('it should return Error: ID needs to have only digits!', () =>{
		var contentFromFile = '0xx01ç1234567891234çDiegoç50000';
		var messageError = 'ID needs to have only digits!';

		var resultFromTransform = ()=>{transform.transformFlatFile(contentFromFile)};
		expect(resultFromTransform).to.throw(Error, messageError);
	});

	it('it should return Error: Not enough line separators!', () =>{
		var contentFromFile = '0011234567891234çDiegoç50000';
		var messageError = 'Number of line separators is wrong! Should be: 3'; 

		var resultFromTransform = ()=>{transform.transformFlatFile(contentFromFile)};
		expect(resultFromTransform).to.throw(Error, messageError);
	});

	it('it should return Error: Document code needs to have only digits!', () =>{
		var contentFromFile = '001ç12345xxx67891234çDiegoç50000';
		var messageError = 'Document code needs to have only digits!';

		var resultFromTransform = ()=>{transform.transformFlatFile(contentFromFile)};
		expect(resultFromTransform).to.throw(Error, messageError);
	});


	it('it should report Error: ID not recognized.', function(){
		var messageError = 'ID not recognized in System. Verify your file syntax.';
		var contentFromFile = '004ç1234567891234çDiegoç50000';
		
		var resultFromTransform = ()=>{transform.transformFlatFile(contentFromFile)};

    	expect(resultFromTransform).to.throw(Error, messageError);
	});

	it('it should return TypeError: no data received from Extract', () =>{

		var structOfSeparatedLines = ()=>{transform.transformFlatFile()};
		expect(structOfSeparatedLines).to.throw(Error);
	});

});