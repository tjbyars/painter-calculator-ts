"use strict";
const getLargestCan = require('./Main');
test('getLargestCan', () => {
    it('gets the largest possible can needed for the given amount of paint', () => {
        expect(getLargestCan(11)).toBe(10);
        expect(getLargestCan(9)).toBe(5);
        expect(getLargestCan(2.6)).toBe(2.5);
        expect(getLargestCan(0.01)).toBe(1);
    });
});
