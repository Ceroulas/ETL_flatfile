'use strict';
module.exports = Costumer;

function Costumer(CNPJ, name, businessArea) {
	Costumer.count = ++Costumer.count || 1;
	
	this.CNPJ = CNPJ;
	this.name = name;
	this.businessArea = businessArea;
	
}

function getCNPJ()
{
  return this.CNPJ;
}
  
function setCNPJ(CNPJ)
{
  this.CNPJ = CNPJ;
}

function getName()
{
  return this.name;
}
  
function setName(name)
{
  this.name = name;
}

function getBusinessArea()
{
  return this.businessArea;
}
  
function setBusinessArea(businessArea)
{
  this.businessArea = businessArea;
}