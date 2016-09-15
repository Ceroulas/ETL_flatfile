'use strict';

const fs = require('fs');
const Log = require('log');
const log = new Log('info', fs.createWriteStream('etl.log', {flags: 'a'}));

module.exports = {
	writeToLog: function(type, message){
		switch(type){
			case 'error':
				log.error(message);
				break;
			case 'warning':
				log.warn(message);	
			default:
				log.info(message);
		}

	}
}