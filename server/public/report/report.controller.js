angular.module('uploadApp')
		.controller('ReportController', ['$scope','$http', function( $scope, $http ) {
			$scope.content = 'Output file not ready!';

			$http.get('#/report', function(req, res){
				console.log(req)
			});

		}]);
