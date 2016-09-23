'use strict';

const Costumer = require('./models/costumer-register.js');
const Salesman = require('./models/salesman-register.js');
const Sale = require('./models/sale-register.js');
const etlLog = require('./../log/etl-log.js');

const SALESMAN_ID = '001';
const COSTUMER_ID = '002';
const SALE_ID = '003';

module.exports = {
	fillCostumerRegister: function (structOfInfosFromLine, arrayOfUsers) {

		if( sendMessageToLog('Costumer', structOfInfosFromLine, arrayOfUsers) )
			return arrayOfUsers;

		let costumerObj = new Costumer(structOfInfosFromLine.documentCode, structOfInfosFromLine.thirdItem, structOfInfosFromLine.fourthItem);
		
		return arrayOfUsers.concat(costumerObj); 
	},

	fillSalesmanRegister: function (structOfInfosFromLine, arrayOfUsers) {
		if( sendMessageToLog('Salesman', structOfInfosFromLine, arrayOfUsers) )
			return arrayOfUsers;	

		let salesmanObj = new Salesman(structOfInfosFromLine.documentCode, structOfInfosFromLine.thirdItem, structOfInfosFromLine.fourthItem);

		return arrayOfUsers.concat(salesmanObj);	
	},

	fillSaleRegister: function (structOfInfosFromLine, arrayOfUsers, balanceOfSale) {

		let saleObj = new Sale(structOfInfosFromLine.documentCode, balanceOfSale, structOfInfosFromLine.fourthItem);

		return arrayOfUsers.concat(saleObj);
	}	
}

function sendMessageToLog (typeOfUser, structOfUser, arrayOfUsers){
	let messageToLog = '';

	if( findIfExistentInRegister(arrayOfUsers, structOfUser.documentCode) ){
		messageToLog =  typeOfUser+' "'+ structOfUser.thirdItem +'" already in register.';
		etlLog.writeToLog('info',messageToLog);
		
		return true;
	}
	return false;
}

function findIfExistentInRegister (array,findCode) {
	let isExistentInArray = false;
	array.map(function(item){
		if(item.documentCode === findCode)
			isExistentInArray = true;
	});
	return isExistentInArray;
}