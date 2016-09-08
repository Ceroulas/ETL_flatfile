'use strict';

var fs = require('fs');
//var filePath = __dirname+'/../../data/in/test.dat';

module.exports = {

	readInputFile: function(inputFilePath){
		try{
			var contentFromFile =  fs.readFileSync(inputFilePath).toString();
		}catch(err){
			throw err;
		}

		return contentFromFile;
	}
};
