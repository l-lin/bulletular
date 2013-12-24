(function() {
    'use strict';
    angular.module('bullet').directive('focusMe', function() {
        return {
            restrict: 'A',
            scope: {
                trigger: '=focusMe'
            },
            link: function(scope, element) {
                scope.$watch('trigger', function(value) {
                    if (value === true) {
                        element[0].focus();
                        scope.trigger = false;
                    }
                });
            }
        };
    });

    angular.module('bullet').directive('bullets', function(bulletFactory, bulletUtils, $compile, $log) {
        return {
            restrict: 'E',
            templateUrl: 'app/bullet/bullets.html',
            scope: {
                items: '='
            },
            link: function(scope, element) {
                var currentItem;

                scope.addItem = function addItem($event, index) {
                    scope.items.splice(index + 1, 0, bulletFactory.newItem(''));
                    scope.selectItem(index + 1);
                    $event.preventDefault();
                };

                scope.completeItem = function completeItem($event, index) {
                    scope.items[index].complete = !scope.items[index].complete;
                    $event.preventDefault();
                };

                scope.removeItem = function removeItem($event, index) {
                    var indexToFocus = 0;

                    scope.items.splice(index, 1);
                    if (scope.items.length === 0) {
                        scope.items.push(bulletFactory.newItem(''));
                        scope.selectItem(0);
                    }

                    if (scope.items[index]) {
                        indexToFocus = index;
                    } else if (scope.items[index - 1]) {
                        indexToFocus = index - 1;
                    }
                    scope.selectItem(indexToFocus);

                    $event.preventDefault();
                };
                
                scope.selectItem = function selectItem(selectedIndexes, step) {
                    var indexes = selectedIndexes.split('-');
                    if(step) {
                        indexes[indexes.length -1] = '' + (Number(indexes[indexes.length -1]) + step);
                    }
                    var item = bulletUtils.selectItem(scope.items, indexes);
                    if (currentItem) {
                        currentItem.focus = false;
                        currentItem.focus = false;
                    }
                    currentItem = item;
                    currentItem.focus = true;
                    
                    $log.debug('currentItem.index = ' + currentItem.index);
                };

                scope.toSubItem = function toSubItem($event, index) {
                    if(scope.items[index - 1]) {
                        scope.items[index - 1].subItems.push(scope.items[index]);
                        scope.items.splice(index, 1);
                    }
                    $event.preventDefault();
                }
                
                scope.toItem = function toItem($event, index) {
                    scope.items.splice(index + 1, 0, scope.items[index]);
                    scope.selectItem(index + 1);
                    $event.preventDefault();
                }
            }
        };
    });
})();
