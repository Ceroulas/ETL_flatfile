'use strict';
module.exports = Sale;

function Sale(CPF, name, businessArea) {
	Salesman.count = ++Salesman.count || 1;
	
	this.CPF = CPF;
	this.name = name;
	this.salary = salary;
}