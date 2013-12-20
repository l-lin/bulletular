(function(ng) {
	ng.module('bullet').directive('focusMe', function($timeout, $parse) {
        return {
            restrict: 'A',
            scope: {trigger: '=focusMe'},
            link: function($scope, $element, attrs) {
                $scope.$watch('trigger', function(value) {
                    if(value === true) { 
                        $element[0].focus();
                        $scope.trigger = false;
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
            link: function($scope, element, attrs) {
                var currentIndex = 0;
                
                $scope.addItem = function addItem($event, index) {
                    $scope.items.splice(index + 1, 0, bulletFactory.newItem(''));
                    $scope.selectItem(index + 1);
                    $event.preventDefault();
                };

                $scope.completeItem = function completeItem($event, index) {
                    $scope.items[index].complete = !$scope.items[index].complete;
                    $event.preventDefault();
                };
                
                $scope.removeItem = function removeItem($event, index) {
                    var indexToFocus = 0;
                    
                    $scope.items.splice(index, 1);
                    if($scope.items.length === 0) {
                        $scope.items.push(bulletFactory.newItem(''));
                        $scope.selectItem(0);
                    }
                    
                    if($scope.items[index]) {
                        indexToFocus = index;
                    } else if ($scope.items[index - 1]) {
                        indexToFocus = index - 1;
                    }
                    $scope.selectItem(indexToFocus);
                    
                    $event.preventDefault();
                };
                
                $scope.selectItem = function selectItem(index) {
                    if(index >= 0 && index < $scope.items.length) {
                        if($scope.items[currentIndex]) {
                            $scope.items[currentIndex].focus = false;
                        }
                        currentIndex = index;
                        $scope.items[index].focus = true;
                    }
                };
                
                $scope.addSubItem = function addSubItem($event, index) {
                    console.log('foo');
                    $scope.items[index].subItems.push(bulletFactory.newItem(''));
                    $event.preventDefault();
                }
            }
        }
    });
})(angular);
