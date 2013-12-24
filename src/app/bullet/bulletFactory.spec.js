describe('Factory: bulletFactory', function() {
    'use strict';

    // load the factory's module
    beforeEach(module('bullet'));

    var itemToAdd = {
        text: 'foo',
        index: '0',
        focus: false,
        complete: true
    }, factory;

    // Initialize the controller and a mock scope
    beforeEach(inject(function(bulletFactory) {
        factory = bulletFactory;
    }));

    it('should create an item with the correct attributes', function() {
        var item = factory.newItem(itemToAdd.text, itemToAdd.index, itemToAdd.focus, itemToAdd.complete);
        expect(item).toBeDefined();
        expect(item.text).toEqual(itemToAdd.text);
        expect(item.index).toEqual(itemToAdd.index);
        expect(item.focus).toEqual(itemToAdd.focus);
        expect(item.complete).toEqual(itemToAdd.complete);
    });

    it('should put the "focus" and "complet" to false by default', function() {
        var item = factory.newItem(itemToAdd.text);
        expect(item).toBeDefined();
        expect(item.text).toEqual(itemToAdd.text);
        expect(item.index).toEqual(itemToAdd.index);
        expect(item.focus).toBeFalsy();
        expect(item.complete).toBeFalsy();
    });
});
