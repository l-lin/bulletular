(function(ng) {
	ng.module('bullet').directive('focusMe', function($timeout, $parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.focusMe);
                scope.$watch(model, function(value) {
                    if (value) {
                        $timeout(function() {
                            var $element = ng.element(element[0]);
                            element[0].focus();
                            $element.val($element.val());
                        });
                    }
                });
            }
        };
    });

    ng.module('bullet').directive('bullets', function(bulletFactory) {
        return {
            restrict: 'E',
            templateUrl: 'app/bullet/bullets.html',
            scope: {
                items: '='
            },
            link: function($scope, $element, attrs) {
                $scope.addItem = function addItem($event, index) {
                    $scope.items.splice(index + 1, 0, {
                        text: '',
                        focus: true,
                        complete: false
                    });
                    $event.preventDefault();
                };

                $scope.completeItem = function completeItem($event, index) {
                    $scope.items[index].complete = !$scope.items[index].complete;
                    $event.preventDefault();
                };
                
                $scope.removeItem = function removeItem($event, index) {
                    $scope.items.splice(index, 1);
                    if($scope.items.length === 0) {
                        $scope.items.push(bulletFactory.newItem('', true, true));
                    }
                    $event.preventDefault();
                };
            }
        }
    });
})(angular);
