'use strict';

const fs = require('fs');

module.exports = {

	readInputFile: function(inputFilePath){
		try {
			return fs.readFileSync(inputFilePath).toString();			
		} catch (err) {
			throw err;
		}
	}
}