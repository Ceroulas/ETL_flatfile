'use strict';

const SEPARATOR_FOR_EACH_SALE = ',';
const SEPARATOR_ITEMS_FROM_EACH_SALE = '-';

module.exports = {
	parseSaleInfo: function (stringSaleUnparsed) {
		try {
			return removeTraceFromEachSale(stringSaleUnparsed);
		}catch(err){
			throw err;
		}
	}
}

var removeBracketsfromSaleString = function (stringSaleUnparsed) {
	return stringSaleUnparsed.replace(/[\[\]]+/g, '');
}

var separateEachSaleFromString = function (stringSaleUnparsed) {
	return removeBracketsfromSaleString(stringSaleUnparsed).split(SEPARATOR_FOR_EACH_SALE);
}

var removeTraceFromEachSale = function (stringSaleUnparsed) {
	var eachSaleSeparated = separateEachSaleFromString(stringSaleUnparsed);
	var saleInfoWithoutTraces = [];
	eachSaleSeparated.forEach((item)=>{
		saleInfoWithoutTraces.push(item.split(SEPARATOR_ITEMS_FROM_EACH_SALE));
	})
	return saleInfoWithoutTraces;
}