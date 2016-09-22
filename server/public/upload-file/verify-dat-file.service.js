angular.module('uploadApp')
		.service('verifyDatFile', ['$window', function($window){
			
			let verifyIfIsDatFile = function (file){
			
				if(verifyExtension($window, fileExtension(file.name)))
					return true;
			
				return false;	
			
			};
			
			return {verifyIfIsDatFile: verifyIfIsDatFile};
		}]);

function fileExtension ( name ){
	return name.split('.').pop();
}

function verifyExtension ( $window, fileExtension ){
	if( fileExtension === 'dat')
		return true;

	$window.alert("Not a .dat file.");
	return false;	
}