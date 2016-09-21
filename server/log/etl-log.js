'use strict';

const fs = require('fs');
const Log = require('log');

let log;

module.exports = {
	createLog: function ( inputFileName ) {
		let logPath =  __dirname+'/logs/'+inputFileName+'.log';
		//let logPath =  __dirname+'/../'+'test.log';
		log = new Log('info', fs.createWriteStream(logPath, {flags: 'a'}))
	},

	writeToLog: function( type, message ) {
		switch(type){
			case 'error':
				log.error(message);
				break;
			case 'warning':
				log.warn(message);	
				break;
			default:
				log.info(message);
		}

	}
}