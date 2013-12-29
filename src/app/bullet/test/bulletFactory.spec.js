describe('Factory: bulletFactory', function() {
    'use strict';

    // load the factory's module
    beforeEach(module('bullet'));

    var bulletToAdd = {
        index: [0],
        text: 'foo',
        focus: false,
        complete: true
    }, factory;

    // Initialize the controller and a mock scope
    beforeEach(inject(function(bulletFactory) {
        factory = bulletFactory;
    }));

    it('should create an bullet with the correct attributes', function() {
        var bullet = factory.newBullet(bulletToAdd.index, bulletToAdd.text, bulletToAdd.focus, bulletToAdd.complete);
        expect(bullet).toBeDefined();
        expect(bullet.text).toEqual(bulletToAdd.text);
        expect(bullet.index).toEqual(bulletToAdd.index);
        expect(bullet.focus).toEqual(bulletToAdd.focus);
        expect(bullet.complete).toEqual(bulletToAdd.complete);
    });

    it('should have default values', function() {
        var bullet = factory.newBullet();
        expect(bullet).toBeDefined();
        expect(bullet.text).toEqual('');
        expect(bullet.index).toEqual([0]);
        expect(bullet.focus).toBeFalsy();
        expect(bullet.complete).toBeFalsy();
        expect(bullet.bullets).toEqual([]);
    });
});
