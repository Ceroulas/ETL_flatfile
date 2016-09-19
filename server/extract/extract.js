'use strict';

const fs = require('fs');
const etlLog = require('./../log/etl-log.js');

module.exports = {

	readInputFile: function(inputFilePath){
		try {
			return fs.readFileSync(inputFilePath).toString();			
		} catch (err) {
			etlLog.writeToLog('error', err);
		}
	}
}