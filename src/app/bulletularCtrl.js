(function() {
    'use strict';
    angular.module('bulletularApp').controller('bulletularCtrl', function($rootScope, $scope, $log, $timeout, bulletFactory) {
        var BULLETS_KEY = 'bullets',
            bullets;
        if (angular.isDefined(localStorage)) {
            var bulletsJSON = localStorage.getItem(BULLETS_KEY);
            if (bulletsJSON === null || angular.isUndefined(bulletsJSON)) {
                bullets = [bulletFactory.newBullet()];
            } else {
                bullets = JSON.parse(bulletsJSON);
            }
        } else {
            bullets = [
                bulletFactory.newBullet([0], 'Developing with AngularJS', true, true),
                bulletFactory.newBullet([1], 'Add sub tasks', false, true, [bulletFactory.newBullet([1, 0], 'Increase indent', false, true), bulletFactory.newBullet([1, 1], 'Decrease indent', false, true)]),
                bulletFactory.newBullet([2], 'Add a shortcut to clean all complete tasks', false, false),
                bulletFactory.newBullet([3], 'Add localStorage for saving tasks', false, false),
                bulletFactory.newBullet([4], 'Add the possibility to navigate through tasks', false, false),
                bulletFactory.newBullet([5], 'Add breadcrumb', false, false)
            ];
        }

        $scope.bullets = bullets;
        $scope.isSaved = false;

        /**
         * Save the bullets in the localStorage
         */
        $scope.save = function save() {
            $log.debug('Saving...');
            localStorage.setItem(BULLETS_KEY, JSON.stringify($scope.bullets));
            $scope.isSaved = true;
            $timeout(function() {
                $scope.isSaved = false;
            }, 3000);
        };

        /**
         * Remove all bullets including those saved in the localStorage
         */
        $scope.removeAllBullets = function removeAllBullets() {
            localStorage.removeItem(BULLETS_KEY);
            $scope.bullets = [bulletFactory.newBullet()];
        };

        /**
         * Close the message
         */
        $scope.closeMsg = function closeMsg() {
            $scope.isSaved = false;
        };
    });
})();
