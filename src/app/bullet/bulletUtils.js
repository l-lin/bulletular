(function() {
    'use strict';

    angular.module('bullet').factory('bulletUtils', function() {
        /**
         * Check if the given array has children
         * @param  {[Integer]} indexes the array of indexes
         * @return {Boolean} true if it has children, false otherwise
         */
        var hasChildrenIndexes = function hasChildrenIndexes(indexes) {
            if (indexes.length > 1) {
                return true;
            }
            return false;
        };

        /**
         * Get the next array of indexes.
         * It just removes the first element of the array.
         * @param  {[Integer]} indexes The array of indexes
         * @return {[Integer]} The next array of indexes
         */
        var nextIndexes = function nextIndexes(indexes) {
            return indexes.slice().splice(0, 1);
        };

        return {
            /**
             * Check if the given array is really an array
             * @param  {[Integer]}  arrayToTest The array to test
             * @return {bulletUtils}  this object if the given parameter is an array, throw an Error otherwise
             */
            checkArray: function(arrayToTest) {
                if (!arrayToTest || !angular.isArray(arrayToTest)) {
                    throw new Error(arrayToTest + ' is not an array!');
                }
                return this;
            },
            /**
             * Check if the given array is really a number
             * @param  {Integer} numberToText the number to test
             * @return {bulletUtils} this object if the given parameter is a number, throw an Error otherwise
             */
            checkNumber: function(numberToTest) {
                if (!numberToTest || !angular.isNumber(numberToTest)) {
                    throw new Error(numberToTest + ' is not a number!');
                }
                return this;
            },
            /**
             * Find the bullets array from the given bullets and indexes arrays
             * @param  {[bullet]} bullets the array of bullets
             * @param  {[Integer]} indexes the indexes array
             * @return {[bullet]} the array of bullets
             */
            findBulletsArray: function(bullets, indexes) {
                // Check if there are childrend indexes
                if (hasChildrenIndexes(indexes)) {
                    // Fetch the index from the first element of the array
                    var index = indexes[0];
                    // Recursive call to the subItems of the item
                    return this.findBulletsArray(bullets[index].bullets, nextIndexes(indexes));
                }
                return bullets;
            },
            /**
             * Find the bullet from a given bullets and array of indexes
             * @param  {[bullet]} bullets the array of bullets
             * @param  {[Integer]} indexes the array of indexes
             * @return {bullet} the selected bullet
             */
            findBullet: function(bullets, indexes) {
                var bulletsArray = this.findBulletsArray(bullets, indexes);
                var lastIndex = indexes[indexes.length - 1];
                if (bulletsArray && lastIndex >= 0 && lastIndex < bulletsArray.length) {
                    return bulletsArray[lastIndex];
                }
                throw new Error('Bullet not found for indexes ' + indexes);
            }
        };
    });
})();
