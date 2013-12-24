(function() {
    'use strict';
    
    angular.module('bullet').factory('bulletUtils', function() {
        return {
            selectItemParent: function(items, selectedIndexes) {
                if(selectedIndexes[1]) {
                    // Fetch the index from the first element of the array
                    var index = selectedIndexes[0];
                    // Remove the index from the array
                    selectedIndexes.splice(0, 1);
                    // Recursive call to the subItems of the item
                    return this.selectItemParent(items[index].items, selectedIndexes);
                } else {
                    return items;
                }
            },
            selectItem: function(items, selectedIndexes) {
                var itemParent = this.selectItemParent(items, selectedIndexes);
                if(itemParent && selectedIndexes >= 0 && selectedIndexes < itemParent.length) {
                    return itemParent[selectedIndexes];
                }
            }
        };
    });
})();