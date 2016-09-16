'use strict';

const mocha = require('mocha');
const fs = require('fs');
const chai = require('chai');
const expect = chai.expect;

const load = require('./../../../load/write-file.js');
const outputFilePath = __dirname+'/../../resources/test.done.dat';


describe('Write file Test:', () => {

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

		var loadInfoToFile = ()=>{load.writeFileInOutputFolder(resumedFileStruct)};

    	expect(loadInfoToFile).to.throw(Error); 					
	});

	it('Should throw ERROR no struct sent.', () =>{	

		var loadInfoToFile = ()=>{load.writeFileInOutputFolder(outputFilePath)};

    	expect(loadInfoToFile).to.throw(Error); 					
	});

	it('Should throw ERROR no struct or file sent.', () =>{	

		var loadInfoToFile = ()=>{load.writeFileInOutputFolder()};

    	expect(loadInfoToFile).to.throw(Error); 					
	});
});