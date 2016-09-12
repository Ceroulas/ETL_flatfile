'use strict';
module.exports = Costumer;

function Costumer(documentCode, name, businessArea) {
	Costumer.count = ++Costumer.count || 1;
	
	this.documentCode = documentCode;
	this.name = name;
	this.businessArea = businessArea;
	
}

Costumer.prototype.getDocumentCode = function()
{
  return this.documentCode;
}
  
Costumer.prototype.setDocumentCode = function(documentCode)
{
  this.documentCode = documentCode;
}

Costumer.prototype.getName = function()
{
  return this.name;
}
  
Costumer.prototype.setName = function(name)
{
  this.name = name;
}

Costumer.prototype.getBusinessArea = function()
{
  return this.businessArea;
}
  
Costumer.prototype.setBusinessArea = function(businessArea)
{
  this.businessArea = businessArea;
}
