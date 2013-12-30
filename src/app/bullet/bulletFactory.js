(function() {
    'use strict';
    /**
     * Factory to create new bullet.
     *
     * @return {ngFactory} the factory to create bullets
     */
    angular.module('bullet').factory('bulletFactory', function() {
        return {
            /**
             * [newItem description]
             * @param  {String} text the text to show
             * @param  {String} index the index of the bullet
             * @param  {Boolean} focus true if it must be focused, false otherwise
             * @param  {Boolean} complete true if the bullet is complete, false otherwise
             * @param  {[Integer]} subBullets the sub bullets of the bullets
             * @return {JSONobject} the new bullet
             */
            newBullet: function(index, text, focus, complete, subBullets) {
                return {
                    index: index || [0],
                    text: text || '',
                    focus: focus || false,
                    complete: complete || false,
                    bullets: subBullets || []
                };
            }
        };
    });
})();
