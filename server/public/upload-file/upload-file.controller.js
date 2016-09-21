angular.module('uploadApp')
		.controller('UploadController', ['$scope','fileUpload','verifyDatFile', '$location',function($scope, fileUpload, verifyDatFile, $location){

			$scope.uploadFile = function(){
		        var file = $scope.myFile;
		        var uploadUrl = "/upload";

		        if(verifyDatFile.verifyIfIsDatFile(file)){

			        $scope.isProcessing  = true;
			        var outputFileData = fileUpload.uploadFileToUrl(file, uploadUrl);
	 				outputFileData.then(function(result){
	 					$scope.isProcessing  = false;
	 				});

	 				$location.path('/log');
	 			}	
    		};
    		
		}]);


