'use strict';

const mocha = require('mocha');
const fs = require('fs');
const sleep = require('sleep');
const Log = require('log');
const chai = require('chai');
const expect = chai.expect;

const etl = require('./../../etl.js');
const outputFilePath = __dirname+'/../../../data/out/';
const etlLog = require('./../../log/etl-log.js');

describe('Extract-Transform-Load Test:', () => {

    before(function () {
        let inpurFileName = 'etl-integration';
        etlLog.createLog(inpurFileName);
    })
	
    function ReadLog (logPath, message){
        console.log('Path: '+logPath)
        console.log('Msg: '+ message)
        
        let contentFromLog = fs.readFileSync(logPath).toString();
        console.log('content: '+ contentFromLog)
        return contentFromLog.search(message);
    }

    function readLogFile(filePath, cb){
        
        fs.readFile(filePath, function(err, data){
            if(err) throw err;
            cb(data);
        });
    }

    it('it should read input file and write resume in output file', () =>{
		var inputFilePath = __dirname+'/../../../data/input_test/test.dat';
        
        etl.flatFileResumer(inputFilePath, outputFilePath);	
		
        expect(fs.existsSync(outputFilePath)).to.be.equal(true);
	});

   /* it('it should return ERROR: more line separator', (done) =>{
		let inputFilePath = __dirname+'/../resources/more-separator.dat';
        let logPath = __dirname+'/../../log/logs/more-separator.log';
        let messageError = 'Number of line separators is wrong! Should be: 3';
        
        etl.flatFileResumer(inputFilePath, outputFilePath)
        let callback = function () {
            console.log('Entrei aqui')
            readLogFile(logPath, (data) =>{ console.log('data: '+ data)}).then(()=>{
                //expect(data.search(messageError)).to.not.equal(-1);
                done();  
            })
            done();s
        };
        setTimeout(callback, 1000)
        
       // console.log('find: '+ findLine)
   //     myfun(logPath, function(data) { console.log('Data: '+data);})
        //expect(findLine).to.not.equal(-1);

	});
    
    /*it('it should return ERROR: not enough line separator', () =>{
		let inputFilePath = __dirname+'/../resources/not-enough-separator.dat';
        let logPath = __dirname+'/../../log/logs/not-enough-separator.log';
        let messageError = 'Number of line separators is wrong! Should be: 3';
        
        etl.flatFileResumer(inputFilePath, outputFilePath);       
        sleep.sleep(1);
        let findLine = ReadLog(logPath, messageError);

        expect(findLine).to.not.equal(-1);
	});

    it('it should return ERROR: Not a .dat file', () =>{
		let inputFilePath = __dirname+'/../resources/not-dat.txt';
        let logPath = __dirname+'/../../log/logs/not-dat.log';
        let messageError = 'Not a .dat file!';
        
        let readInputFile = etl.flatFileResumer(inputFilePath, outputFilePath);
        sleep.usleep(50);
        let findLine = ReadLog(logPath);

        expect(findLine).to.not.equal(-1);
	});

    it('it should return ERROR: Invalid file name', () =>{
        let inputFilePath = __dirname+'/../resources/invalid$%@*name.dat';
        let logPath = __dirname+'/../../log/logs/invalid$%@*name.log';
        let messageError = 'Not a valid file name!';
        
        let readInputFile = etl.flatFileResumer(inputFilePath, outputFilePath);
        sleep.usleep(50);
        let findLine = ReadLog(logPath, messageError);

        expect(findLine).to.not.equal(-1);
    });*/
});