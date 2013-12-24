(function() {
    'use strict';
    angular.module('bullet').factory('bulletFactory', function() {
        return {
            newItem: function(text, index, focus, complete, items) {
                return {
                    text: text,
                    index: index || '0',
                    focus: focus || false,
                    complete: complete || false,
                    items: items || []
                };
            }
        };
    });
})();
