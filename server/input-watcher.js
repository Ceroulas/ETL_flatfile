'use strict';

const watch = require('watch');
const etl = require('./etl.js');

const pathIn = __dirname+'/../data/in/';
const pathOut = __dirname+'/../data/out/';

watch.createMonitor(pathIn, function(monitor){
		monitor.on("created", function(file, stat){
			console.log('Input File created: '+ file)
			etl.flatFileResumer(file, pathOut);
		});
});