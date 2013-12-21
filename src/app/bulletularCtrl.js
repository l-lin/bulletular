(function(ng) {
    'use strict';
    ng.module('bulletularApp').controller('bulletularCtrl', function($scope, bulletFactory) {
        $scope.items = [
            bulletFactory.newItem('Developing with AngularJS', true, true),
            bulletFactory.newItem('Add a shortcut to clean all complete tasks', false, false),
            bulletFactory.newItem('Add sub tasks', false, false),
            bulletFactory.newItem('Add localestorage for saving tasks', false, false),
            bulletFactory.newItem('Add the possibility to navigate through tasks', false, false),
            bulletFactory.newItem('Add breadcrumb', false, false),
        ];
    });
})(angular);
