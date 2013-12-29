(function() {
    'use strict';
    /**
     * Directive used for placing the mouse cursor
     * @return {ngDirective} the directive for focusing the tasks
     */
    angular.module('bullet').directive('bulFocusme', function() {
        return {
            restrict: 'A',
            scope: {
                trigger: '=bulFocusme'
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

    /**
     * Directive for displaying the the tasks
     * @param  {ngFactory} bulletFactory the bullet factory
     * @param  {ngFactory} bulletUtils the bullet utils
     * @param  {ngService} $log the logger
     * @return {ngDirective} the directive for displaying the bulletUtils
     */
    angular.module('bullet').directive('bullets', function(bulletFactory, bulletUtils, $log) {
        /**
         * Add the step to the index
         * @param {[Integer]} indexes the array of indexes
         * @param {Integer} step the step to add to the last element of the array
         */
        var addStepToIndex = function addStepToIndex(indexes, step) {
            bulletUtils.checkArray(indexes);
            var indexesArray = indexes.slice();
            if (step && angular.isNumber(step)) {
                indexesArray[indexesArray.length - 1] = indexesArray[indexesArray.length - 1] + step;
            }
            return indexesArray;
        };

        /**
         * Populate the indexes of the array of bullets
         * @param {[bullet]} bullets the array of bullets
         * @param {[Integer]} indexes the array of indexes
         */
        var populateIndexes = function populateIndexes(bullets, indexes) {
            var i;
            if (bullets) {
                for (i = 0; i < bullets.length; i++) {
                    var indexesArray;
                    if (indexes) {
                        indexesArray = indexes.slice();
                    } else {
                        indexesArray = [];
                    }
                    indexesArray.push(i);
                    bullets[i].index = indexesArray;
                    populateIndexes(bullets[i].bullets, indexesArray);
                }
            }
        };

        return {
            restrict: 'E',
            templateUrl: 'app/bullet/templates/bullets.html',
            scope: {
                bullets: '='
            },
            link: function(scope, element) {
                var currentBullet;

                /**
                 * Watch the array of bullets and re-populate the array of indexes of each bullets
                 * @param {[bullet]} bullets the array of bullets
                 */
                scope.$watch('bullets', function(bullets) {
                    populateIndexes(bullets);
                }, true);

                /**
                 * Select the bullet in wich the cursor must be focused
                 * @param {[Integer]} indexes the array of indexes in wich the cursor must be focuses
                 * @param {Integer} step the step to add to the last element of the array of the indexes
                 */
                scope.selectBullet = function selectBullet(indexes, step) {
                    var indexesArray = addStepToIndex(indexes, step);
                    try {
                        var selectedBullet = bulletUtils.findBullet(scope.bullets, indexesArray);
                        if (currentBullet) {
                            currentBullet.focus = false;
                        }
                        selectedBullet.focus = true;
                        currentBullet = selectedBullet;
                    } catch (err) {}
                };

                /**
                 * Add a new bullet in the given index
                 * @param {event} $event the event
                 * @param {[Integer]} indexes the array of indexes
                 */
                scope.addBullet = function addBullet($event, indexes) {
                    var bullets = bulletUtils.findBulletsArray(scope.bullets, indexes.slice());
                    bulletUtils.checkArray(bullets);

                    var newIndexes = addStepToIndex(indexes, 1);
                    var index = newIndexes[newIndexes.length - 1];
                    bullets.splice(index, 0, bulletFactory.newBullet());
                    scope.selectBullet(newIndexes);

                    $event.preventDefault();
                };

                /**
                 * Complete the bullet
                 * @param {event} $event the event
                 * @param {[Integer]} indexes the array of indexes
                 */
                scope.completeBullet = function completeBullet($event, indexes) {
                    var selectedBullet = bulletUtils.findBullet(scope.bullets, indexes);
                    selectedBullet.complete = !selectedBullet.complete;
                    $event.preventDefault();
                };

                /**
                 * Remove the bullet
                 * @param {event} $event the event
                 * @param {[Integer]} indexes the array of indexes
                 */
                scope.removeBullet = function removeBullet($event, indexes) {
                    var index = indexes[indexes.length - 1];
                    var bullets = bulletUtils.findBulletsArray(scope.bullets, indexes.slice());
                    bullets.splice(index, 1);

                    // In case we removed every bullets
                    var indexToFocus = [0];
                    if (!scope.bullets.length) {
                        scope.bullets.push(bulletFactory.newBullet());
                    }

                    if (bullets[index]) {
                        var indexToFocus = indexes.slice();
                        indexToFocus[indexToFocus.length - 1] = index;
                    } else if (bullets[index - 1]) {
                        var indexToFocus = indexes.slice();
                        indexToFocus[indexToFocus.length - 1] = index - 1;
                    }
                    scope.selectBullet(indexToFocus);

                    $event.preventDefault();
                };









                scope.toSubItem = function toSubItem($event, index) {
                    if (scope.items[index - 1]) {
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
