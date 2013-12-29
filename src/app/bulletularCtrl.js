(function() {
    'use strict';
    angular.module('bulletularApp').controller('bulletularCtrl', function($scope, bulletFactory) {
        $scope.bullets = [
            bulletFactory.newBullet([0], 'Developing with AngularJS', true, true, [bulletFactory.newBullet([0, 0], 'foo'), bulletFactory.newBullet([0, 1], 'foo2')]),
            bulletFactory.newBullet([1], 'Add a shortcut to clean all complete tasks', false, false),
            bulletFactory.newBullet([2], 'Add sub tasks', false, false),
            bulletFactory.newBullet([3], 'Add localestorage for saving tasks', false, false),
            bulletFactory.newBullet([4], 'Add the possibility to navigate through tasks', false, false),
            bulletFactory.newBullet([5], 'Add breadcrumb', false, false)
        ];
    });
})();
