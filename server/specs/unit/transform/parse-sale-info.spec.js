'use strict';

const mocha = require('mocha');
const fs = require('fs');
const sleep = require('sleep');
const Log = require('log');
const chai = require('chai');
const expect = chai.expect;
const transform = require('./../../../transform/parse-sale-info.js');

const filePath = __dirname+'/../../resources/test.dat';
const logPath = __dirname+'/../../../log/logs/test.log';
const etlLog = require('./../../../log/etl-log.js');

describe('Transform - Parse Sale Info Test:', () => {

	before(function () {
		let inpurFileName = 'test';
		etlLog.createLog(inpurFileName);
	})

	function ReadLog (logPath){
        var contentFromLog = fs.readFileSync(logPath).toString();
        var lines = contentFromLog.trim().split('\n');
       
        return lines.pop();
    }
	
	it('it should return the expect sale string parsed.', () =>{
		var stringSaleUnparsed = '[1-10-100,2-30-2.50,3-40-3.10]';
		var expectedSaleInfoParsed= [
			['1','10','100'],
			['2','30','2.50'],
			['3','40','3.10']
		];
		var parseSale = transform.parseSaleInfo(stringSaleUnparsed);	   					
		expect(parseSale).to.deep.equal(expectedSaleInfoParsed);
	});

	it('it should return TypeError: no data received to parse', () =>{
		var messageError = 'Cannot read property \'replace\' of undefined';

		transform.parseSaleInfo();
		sleep.usleep(50);
		var resultFromLog = ReadLog(logPath);
		
		expect(resultFromLog.search(messageError)).to.not.equal(-1);
	});

});