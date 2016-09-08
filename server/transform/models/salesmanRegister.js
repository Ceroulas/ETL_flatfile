'use strict';
module.exports = Salesman;

function Salesman(CPF, name, salary) {
	Salesman.count = ++Salesman.count || 1;
	
	this.CPF = CPF;
	this.name = name;
	this.salary = salary;
}

function getCPF()
{
  return this.CPF;
}
  
function setCPF(CPF)
{
  this.CPF = CPF;
}

function getName()
{
  return this.name;
}
  
function setName(name)
{
  this.name = name;
}

function getSalary()
{
  return this.salary;
}
  
function setSalary(salary)
{
  this.salary = salary;
}

