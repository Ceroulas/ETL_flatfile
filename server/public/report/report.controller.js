angular.module('uploadApp')
		.controller('ReportController', ['$scope','$http', function( $scope, $http ) {
			$scope.content = 'Output file not ready!';

			$http.get('/report').then(function(data) {
				$scope.content = data.data;
			});

		}]);
