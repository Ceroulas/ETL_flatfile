angular.module('uploadApp')
		.controller('LogController', function( $scope) {
			$scope.message = 'ESTAMOS NO LOG!';

			var socket = io();
			
			socket.on('get msg', function(msg){
				console.log(msg);
				$scope.message = msg;
  			});
		});