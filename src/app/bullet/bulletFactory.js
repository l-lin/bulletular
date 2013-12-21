(function() {
    'use strict';
    angular.module('bullet').factory('bulletFactory', function() {
        return {
            newItem: function(text, focus, complete, subItems) {
                return {
                    text: text,
                    focus: focus || false,
                    complete: complete || false,
                    subItems: subItems || []
                };
            }
        };
    });
})();
