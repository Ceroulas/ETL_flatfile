'use strict';

var mocha = require('mocha');
var sinon = require('sinon');
var fs = require('fs');
var chai = require('chai');
var expect = chai.expect;

var load = require('./../../../load/writefile.js');
var structResumeOfFile = require('./../../../transform/prepareinfoforoutput.js');
var outputFilePath = __dirname+'/../../resources/test.done.dat';

describe('Write file Test:', () => {

	it('Should write file in the output directory', () =>{
		
		sinon.stub(structResumeOfFile, 'prepareInfoForLoad', function(){
			return {
				costumerCount: '3', 
				salesmanCount: '4',
				worstSalesman: 'Joaozinho',
				highestSale: '10000'
			};	
		});

		load.writeFileInOutPutFolder(outputFilePath);

    	sinon.assert.calledOnce(structResumeOfFile.prepareInfoForLoad); 
    	structResumeOfFile.prepareInfoForLoad.restore();

    	expect(fs.existsSync(outputFilePath)).to.be.equal(true); 					
	});

});