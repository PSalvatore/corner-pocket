angular.module('routes', ['ngRoute']).config(function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $routeProvider
    .when('/record', {
        templateUrl: '/../templates/record.tpl.html',
        controller: 'main'
    })
    .when('/leaderboard', {
        templateUrl: '/../templates/leaderboard.tpl.html',
        controller: 'main'
    })
    .when('/add', {
        templateUrl: '/../templates/add.tpl.html',
        controller: 'main'
    })
    .otherwise({
        templateUrl: '/../templates/actions.tpl.html',
        controller: 'main'
    });
});
