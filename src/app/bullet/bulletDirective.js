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
    angular.module('bullet').directive('bullets', function(bulletFactory, bulletUtils) {
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
                    // bullets[i].focus = false;
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
            link: function(scope) {
                var currentBullet;
                /**
                 * Watch the array of bullets and re-populate the array of indexes of each bullets
                 * @param {[bullet]} bullets the array of bullets
                 */
                scope.$watch('bullets', function(bullets) {
                    populateIndexes(bullets);
                }, true);

                /**
                 * Check if the given bullet has sub bullets
                 * @param  {bullet}  bullet the bullet
                 * @return {Boolean} true if it has sub bullets, false otherwise
                 */
                scope.hasBullets = function hasBullets(bullet) {
                    return bullet.bullets.length > 0;
                };

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
                    var bullets = bulletUtils.findBulletsArray(scope.bullets, indexes.slice()),
                        newIndexes = addStepToIndex(indexes, 1),
                        index = newIndexes[newIndexes.length - 1];
                    bulletUtils.checkArray(bullets);

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
                    scope.selectBullet(indexes, 1);
                    $event.preventDefault();
                };

                /**
                 * Remove the bullet
                 * @param {event} $event the event
                 * @param {[Integer]} indexes the array of indexes
                 */
                scope.removeBullet = function removeBullet($event, indexes) {
                    var index = indexes[indexes.length - 1],
                        bullets = bulletUtils.findBulletsArray(scope.bullets, indexes.slice()),
                        indexToFocus = [0];
                    bullets.splice(index, 1);

                    // In case we removed every bullets
                    if (!scope.bullets.length) {
                        scope.bullets.push(bulletFactory.newBullet());
                    }

                    if (bullets[index]) {
                        indexToFocus = indexes.slice();
                        indexToFocus[indexToFocus.length - 1] = index;
                    } else if (bullets[index - 1]) {
                        indexToFocus = indexes.slice();
                        indexToFocus[indexToFocus.length - 1] = index - 1;
                    }
                    scope.selectBullet(indexToFocus);

                    $event.preventDefault();
                };

                /**
                 * Add the bullet to the sub bullets array of the previous bullet
                 * @param {event} $event event
                 * @param {[Integer]} indexes the array of indexes
                 */
                scope.toSubBullet = function toSubBullet($event, indexes) {
                    var newIndexes = indexes.slice(),
                        bullets = bulletUtils.findBulletsArray(scope.bullets, newIndexes),
                        bullet = bulletUtils.findBullet(scope.bullets, newIndexes),
                        index = indexes[indexes.length - 1],
                        previousIndex = index - 1,
                        previousBullet = bullets[previousIndex];

                    if (previousBullet) {
                        // Push the bullet to the previous bullet sub bullets array
                        previousBullet.bullets.push(bullet);
                        // Remove the bullet from the origin bullets array
                        bullets.splice(index, 1);
                        // Put the cursor on the bullet
                        newIndexes = previousBullet.index;
                        newIndexes.push(previousBullet.bullets.length - 1);
                        scope.selectBullet(newIndexes);
                    }
                    $event.preventDefault();
                };

                /**
                 * Add the bullet to the parent bullets array
                 * @param  {event} $event event
                 * @param  {[Integer]} indexes the array of indexes
                 */
                scope.toBullet = function toBullet($event, indexes) {
                    var newIndexes = indexes.slice(),
                        oldBullets = bulletUtils.findBulletsArray(scope.bullets, newIndexes),
                        oldBullet = bulletUtils.findBullet(scope.bullets, newIndexes),
                        oldIndex = indexes[indexes.length - 1];
                    // Remove the last index of the array
                    newIndexes.pop();

                    // Add the bullet to the parent bullets array
                    var bullets = bulletUtils.findBulletsArray(scope.bullets, newIndexes),
                        newIndex = newIndexes[newIndexes.length - 1] + 1;
                    if (newIndex) {
                        // Remove the bullet from the sub bullets
                        oldBullets.splice(oldIndex, 1);
                        // Add the bullet to the parent bullets array
                        bullets.splice(newIndex, 0, oldBullet);

                        // Put the cursor on the bullet
                        newIndexes[newIndexes.length - 1] = newIndex;
                        scope.selectBullet(newIndexes);
                    }

                    $event.preventDefault();
                };

                /**
                 * Show/Hide the sub bullets of the selected bullet
                 * @param  {event} $event the event
                 * @param  {[Integer]} indexes the array of indexes of the bullet
                 */
                scope.expandHideBullets = function expandHideBullets($event, indexes) {
                    var bullet = bulletUtils.findBullet(scope.bullets, indexes.slice());
                    bullet.hideBullets = !bullet.hideBullets;
                    $event.preventDefault();
                };
            }
        };
    });
})();
