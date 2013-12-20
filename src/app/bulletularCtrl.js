(function(ng) {
    ng.module('bulletularApp').controller('bulletularCtrl', function($scope, bulletFactory) {
        $scope.items = [
            bulletFactory.newItem('foo', true, false, [bulletFactory.newItem('foo2')]),
            bulletFactory.newItem('bar', false, true)
        ];
    });
})(angular);
