'use strict';
module.exports = Sale;

function Sale (documentCode, balanceOfSales, salesmanName) {
	this.documentCode = documentCode;
	this.balanceOfSales = balanceOfSales;
	this.salesmanName = salesmanName;
}

Sale.prototype.getDocumentCode = function () {
  return this.documentCode;
}
  
Sale.prototype.setDocumentCode = function (documentCode) {
  this.documentCode = documentCode;
}

Sale.prototype.getBalanceOfSales = function () {
  return this.balanceOfSales;
}
  
Sale.prototype.setBalanceOfSales = function (balanceOfSales) {
  this.balanceOfSales = balanceOfSales;
}

Sale.prototype.getSalesmanName = function () {
  return this.salesmanName;
}
  
Sale.prototype.setSalesmanName = function (salesmanName) {
  this.salesmanName = salesmanName;
}