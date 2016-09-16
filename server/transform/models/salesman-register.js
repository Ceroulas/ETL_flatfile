'use strict';
module.exports = Salesman;

function Salesman (documentCode, name, salary) {
	Salesman.count = ++Salesman.count || 1;
	
	this.documentCode = documentCode;
	this.name = name;
	this.salary = salary;
}

Salesman.prototype.getDocumentCode = function () {
  return this.documentCode;
}
  
Salesman.prototype.setDocumentCode = function (documentCode) {
  this.documentCode = documentCode;
}

Salesman.prototype.getName = function () {
  return this.name;
}
  
Salesman.prototype.setName = function (name) {
  this.name = name;
}

Salesman.prototype.getSalary = function () {
  return this.salary;
}
  
Salesman.prototype.setSalary = function (salary) {
  this.salary = salary;
}

