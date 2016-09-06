'use strict';

var mocha = require('mocha');
var chai = require('chai');
var should = chai.should();

var pathFile = '/specs/resources/test.dat';
var EXTRACT = require('./extract.js');//(pathFile);

console.log(__dirname +'/../../server/extract/extract.js');

describe('Extract Test:', () => {
	//var extractInstance = new EXTRACT();

	it('it should return line readed', () =>{
		var expected = '001ç1234567891234çDiegoç50000';
		//var inputFile = EXTRACT.findFileName(pathFile);
		EXTRACT.lineReaderOnEvent(pathFile);
		//console.log(lineReader);
		//var lineReaded = EXTRACT.lineReaded();
	//	console.log(lineReaded)//.should.toEqual(expected);
	});
});