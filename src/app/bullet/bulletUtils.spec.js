describe('Service: bulletUtils', function() {
    'use strict';
    
    beforeEach(module('bullet'));
    
    var items, 
        utils;
    
    beforeEach(inject(function(bulletUtils, bulletFactory) {
        utils = bulletUtils;
        
        items = [
            bulletFactory.newItem('Developing with AngularJS', '0', true, true, [bulletFactory.newItem('foo', '0-0'), bulletFactory.newItem('foo2', '0-1')]),
            bulletFactory.newItem('Add a shortcut to clean all complete tasks', '1', false, false),
            bulletFactory.newItem('Add sub tasks', '2', false, false),
            bulletFactory.newItem('Add localestorage for saving tasks', '3', false, false),
            bulletFactory.newItem('Add the possibility to navigate through tasks', '4', false, false),
            bulletFactory.newItem('Add breadcrumb', '5', false, false),
        ];
    }));
    
    it('should fetch the item 0 from a given list of items and index 0', function() {
        expect(utils.selectItemParent(items, ['0'])).toBeDefined();
        expect(utils.selectItem(items, ['0']).text).toEqual(items[0].text);
        expect(utils.selectItem(items, ['0']).index).toEqual(items[0].index);
        expect(utils.selectItem(items, ['0']).focus).toEqual(items[0].focus);
        expect(utils.selectItem(items, ['0']).complete).toEqual(items[0].complete);
    });
});
