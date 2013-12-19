'use strict';

angular.module('lrestoApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/module1/main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
