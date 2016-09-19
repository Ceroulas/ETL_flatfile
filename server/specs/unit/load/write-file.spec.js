'use strict';

const mocha = require('mocha');
const fs = require('fs');
const sleep = require('sleep');
const chai = require('chai');
const expect = chai.expect;

const load = require('./../../../load/write-file.js');
const outputFilePath = __dirname+'/../../resources/test.done.dat';
const logPath = __dirname+'/../../../etl.log';


describe('Write file Test:', () => {

  	function ReadLog (logPath){
        var contentFromLog = fs.readFileSync(logPath).toString();
        var lines = contentFromLog.trim().split('\n');
       
        return lines.pop();
    }

	it('Should write file in the output directory', () =>{	
		var resumedFileStruct = {
			costumerCount: 2,
			salesmanCount: 6,
			worstSalesman: 'Jonathan',
			highestSale: 10000
		};
		var expectedfileReaded = "Costumer count: 2"+"\n"+
								"Salesman count: 6"+"\n"+
								"Worst salesman ever: Jonathan"+"\n"+
								"Most expensive sale: 10000";

		load.writeFileInOutputFolder(outputFilePath, resumedFileStruct);

    	expect(fs.existsSync(outputFilePath)).to.be.equal(true);

    	var fileReaded = fs.readFileSync(outputFilePath).toString();
    	expect(fileReaded).to.be.equal(expectedfileReaded); 					
	});

	it('Should throw ERROR no path file sent.', () =>{	
		var resumedFileStruct = {
			costumerCount: 2,
			salesmanCount: 6,
			worstSalesman: 'Jonathan',
			highestSale: 10000
		};
		var messageError = 'Error';

		load.writeFileInOutputFolder('',resumedFileStruct);
		sleep.usleep(50);
		var resultFromLog = ReadLog(logPath);
		
		expect(resultFromLog.search(messageError)).to.not.equal(-1); 					
	});

	it('Should throw ERROR no struct sent.', () =>{	
		var messageError = 'Error';

		load.writeFileInOutputFolder(outputFilePath, '');
		sleep.usleep(50);
		var resultFromLog = ReadLog(logPath);
		
		expect(resultFromLog.search(messageError)).to.not.equal(-1); 					
	});

	it('Should throw ERROR no struct or file sent.', () =>{	
		var messageError = 'Error';

		load.writeFileInOutputFolder();
		sleep.usleep(50);
		var resultFromLog = ReadLog(logPath);
		
		expect(resultFromLog.search(messageError)).to.not.equal(-1);					
	});
});