'use strict';

const watch = require('watch');
const etl = require('./etl.js');

const pathIn = __dirname+'/../data/in/';
const outputFilePath = __dirname+'/../data/out/test.done.dat';

console.log(pathIn);

watch.createMonitor(pathIn, function(monitor){
		monitor.on("created", function(file, stat){
			console.log('File created: '+ file)
			etl.flatFileResumer(file, outputFilePath);
		});
});