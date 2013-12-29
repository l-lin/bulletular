describe('Service: bulletUtils', function() {
    'use strict';
    
    beforeEach(module('bullet'));
    
    var bulletsMock, 
        utils;
    
    beforeEach(inject(function(bulletUtils, bulletFactory) {
        utils = bulletUtils;
        
        bulletsMock = [
            bulletFactory.newBullet([0], 'Developing with AngularJS', true, true, [bulletFactory.newBullet([0, 0], 'foo'), bulletFactory.newBullet([0, 1], 'foo2')]),
            bulletFactory.newBullet([1],'Add a shortcut to clean all complete tasks',  false, false),
            bulletFactory.newBullet([2],'Add sub tasks',  false, false),
            bulletFactory.newBullet([3],'Add localestorage for saving tasks',  false, false),
            bulletFactory.newBullet([4],'Add the possibility to navigate through tasks',  false, false),
            bulletFactory.newBullet([5],'Add breadcrumb',  false, false)
        ];
    }));

    describe(', when testing an array,', function() {
        it('should return the object utils if the parameter is an array', function() {
            expect(utils.checkArray([0, 1])).toEqual(utils);
        });
        it('should throw an error if the parameter is undefined', function() {
            expect(function() {utils.checkArray();}).toThrow(new Error('undefined is not an array!'));
        });
        it('should throw an error if the parameter is not an array', function() {
            var obj = {name: 'foobar'};
            expect(function() {utils.checkArray(obj);}).toThrow(new Error(obj + ' is not an array!')); 
        });
    });

    describe(', when testing a number,', function() {
        it('should return the object utils if the parameter is a number', function() {
            expect(utils.checkNumber(123)).toEqual(utils);
        });
        it('should throw an error if the parameter is undefined', function() {
            expect(function() {utils.checkNumber();}).toThrow(new Error('undefined is not a number!'));
        });
        it('should throw an error if the parameter is not a number', function() {
            var obj = {name: 'foobar'};
            expect(function() {utils.checkNumber(obj);}).toThrow(new Error(obj + ' is not a number!')); 
        });
    });

    it('should fetch the item 0 from a given list of bullets and index 0', function() {
        var bulletsArray = utils.findBulletsArray(bulletsMock, [0]),
            bullet = utils.findBullet(bulletsMock, [0]),
            bulletMock = bulletsMock[0];
        expect(bulletsArray).toBeDefined();
        expect(bullet.text).toEqual(bulletMock.text);
        expect(bullet.index).toEqual(bulletMock.index);
        expect(bullet.focus).toEqual(bulletMock.focus);
        expect(bullet.complete).toEqual(bulletMock.complete);
    });
               
    it('should fetch the item 3 from a given list of bullets and index 3', function() {
        var bulletsArray = utils.findBulletsArray(bulletsMock, [3]),
            bullet = utils.findBullet(bulletsMock, [3]),
            bulletMock = bulletsMock[3];
        expect(bulletsArray).toBeDefined();
        expect(bullet.text).toEqual(bulletMock.text);
        expect(bullet.index).toEqual(bulletMock.index);
        expect(bullet.focus).toEqual(bulletMock.focus);
        expect(bullet.complete).toEqual(bulletMock.complete);
    });
    
    it('should fetch the item 0-1 from a given list of bullets and index 0-0', function() {
        var bulletsArray = utils.findBulletsArray(bulletsMock, [0, 0]),
            bullet = utils.findBullet(bulletsMock, [0, 0]),
            bulletMock = bulletsMock[0].bullets[0];
        expect(bulletsArray).toBeDefined();
        expect(bullet.text).toEqual(bulletMock.text);
        expect(bullet.index).toEqual(bulletMock.index);
        expect(bullet.focus).toEqual(bulletMock.focus);
        expect(bullet.complete).toEqual(bulletMock.complete);
    });

    it('should fetch the item 0-1 from a given list of bullets and index 0-1', function() {
        var bulletsArray = utils.findBulletsArray(bulletsMock, [0, 1]),
            firstBulletsArray = bulletsArray[0],
            bullet = utils.findBullet(bulletsMock, [0, 1]),
            firstBulletMock = bulletsMock[0].bullets[0],
            bulletMock = bulletsMock[0].bullets[1];
        expect(bulletsArray).toBeDefined();
        expect(firstBulletsArray.text).toEqual(firstBulletMock.text);
        expect(firstBulletsArray.index).toEqual(firstBulletMock.index);
        expect(firstBulletsArray.focus).toEqual(firstBulletMock.focus);
        expect(firstBulletsArray.complete).toEqual(firstBulletMock.complete);
        expect(bullet.text).toEqual(bulletMock.text);
        expect(bullet.index).toEqual(bulletMock.index);
        expect(bullet.focus).toEqual(bulletMock.focus);
        expect(bullet.complete).toEqual(bulletMock.complete);
    });

    it('should throw an error if the bullet is not found from a given index', function() {
        expect(function() {utils.findBullet(bulletsMock, [0, 10]);}).toThrow(new Error('Bullet not found for indexes ' + [0, 10]));
    });
});
