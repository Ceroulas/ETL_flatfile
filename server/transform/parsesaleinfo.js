'use strict';

const SEPARATOR_FOR_EACH_SALE = ',';
const SEPARATOR_ITEMS_FROM_EACH_SALE = '-';

module.exports = {
	parseSaleInfo: function (stringUnparsed) {
		try {
				var bracketsRemoved = removeBracketsfromString(stringUnparsed);
				var eachSaleSeparated = separateItemsFromString(bracketsRemoved);

				return removeTraceFromEachSale(eachSaleSeparated);
		}catch(err){
			throw err;
		}
	}
}

function removeBracketsfromString (stringUnparsed) {
	return stringUnparsed.replace(/[\[\]]+/g, '');
}

function separateItemsFromString (stringUnparsed) {
	return stringUnparsed.split(SEPARATOR_FOR_EACH_SALE);
}

function removeTraceFromEachSale (arrOfString) {
	var saleInfoWithoutTraces = [];
	arrOfString.forEach((item)=>{
		saleInfoWithoutTraces.push(item.split(SEPARATOR_ITEMS_FROM_EACH_SALE));
	})
	return saleInfoWithoutTraces;
}