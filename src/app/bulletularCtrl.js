(function() {
    'use strict';
    angular.module('bulletularApp').controller('bulletularCtrl', function($scope, bulletFactory) {
        $scope.items = [
            bulletFactory.newItem('Developing with AngularJS', '0', true, true, [bulletFactory.newItem('foo', '0-0'), bulletFactory.newItem('foo2', '0-1')]),
            bulletFactory.newItem('Add a shortcut to clean all complete tasks', '1', false, false),
            bulletFactory.newItem('Add sub tasks', '2', false, false),
            bulletFactory.newItem('Add localestorage for saving tasks', '3', false, false),
            bulletFactory.newItem('Add the possibility to navigate through tasks', '4', false, false),
            bulletFactory.newItem('Add breadcrumb', '5', false, false),
        ];
    });
})();
