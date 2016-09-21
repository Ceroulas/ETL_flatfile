angular.module('uploadApp')
		.controller('LogController', [ '$scope','$location', function( $scope, $location ) {
			$scope.message = '';
			$scope.ready = false;

			var socket = io('/log');

			socket.on('get msg', function(data){
				$scope.$apply(function() {
					$scope.message += data;

					if(data.search('Processing of file ended.') !== -1){
						$scope.ready = true;
					}
				});
  			});
		}]);