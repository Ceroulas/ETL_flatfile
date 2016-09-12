'use strict';

const SEPARATOR_FOR_EACH_SALE = ',';
const SEPARATOR_ITEMS_FROM_EACH_SALE = '-';

module.exports = {
	parseSaleInfo: function(stringSaleUnparsed){
		try {
			return removeTraceFromEachSale(stringSaleUnparsed);
		}catch(err){
			throw err;
		}
	}
}

function removeBracketsfromSaleString(stringSaleUnparsed){
	return stringSaleUnparsed.replace(/[\[\]]+/g, '');
}

function separateEachSaleFromString(stringSaleUnparsed){
	return removeBracketsfromSaleString(stringSaleUnparsed).split(SEPARATOR_FOR_EACH_SALE);
}

function removeTraceFromEachSale(stringSaleUnparsed){
	var eachSaleSeparated = separateEachSaleFromString(stringSaleUnparsed);
	var saleInfoWithoutTraces = [];
	eachSaleSeparated.forEach((item)=>{
		saleInfoWithoutTraces.push(item.split(SEPARATOR_ITEMS_FROM_EACH_SALE));
	})
	return saleInfoWithoutTraces;
}