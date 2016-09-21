angular.module('uploadApp')
  .config(function($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl : 'views/home.html',
        controller  : 'UploadController'
      })
      .when('/log', {
        templateUrl : 'views/log.html',
        controller  : 'LogController'
      })
      .when('/report', {
        templateUrl : 'views/report.html',
        controller  : 'ReportController'
      });
  });