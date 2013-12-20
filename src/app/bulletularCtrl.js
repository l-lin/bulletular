(function(ng) {
	ng.module('bulletularApp').controller('bulletularCtrl', function($scope, bulletFactory) {
		$scope.items = [
            bulletFactory.newItem('foo'),
            bulletFactory.newItem('bar', true, true)
        ];
	});
})(angular);
