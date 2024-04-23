import { describe, expect, it } from 'vitest';
import { calculateDiscount, getCoupons, validateUserInput } from '../src/core';

describe('getCoupons', () => {

    it('should not be empty ', () => {
        const coupons = getCoupons();

        expect(Array.isArray(coupons)).toBe(true);
        expect(coupons.length).toBeGreaterThan(0);
    })

    it('should return an array with valid coupons codes', () => {
        const coupons = getCoupons();

        coupons.forEach(coupon => {
            expect(coupon).toHaveProperty('code');
            expect(typeof coupon.code).toBe('string');
            expect(coupon.code).toBeTruthy();
        })
    })

    it('should return an array with valid coupons discounts', () => {
        const coupons = getCoupons();

        coupons.forEach(coupon => {
            expect(coupon).toHaveProperty('discount');
            expect(typeof coupon.discount).toBe('number');
            expect(coupon.discount).toBeGreaterThanOrEqual(0);
            expect(coupon.discount).toBeLessThanOrEqual(1);
        })
    })

})


describe('calculateDiscount', () => {

    it('should return discounted price if given a valid code', () => {
        expect(calculateDiscount(10, 'SAVE10')).toBe(9);
        expect(calculateDiscount(10, 'SAVE20')).toBe(8);
    })

    it('should handle non-numeric price', () => {
        expect(calculateDiscount('10', 'SAVE10')).toMatch(/invalid/i)
    })

    it('should handle negative price', () => {
        expect(calculateDiscount(-10, 'SAVE10')).toMatch(/invalid/i)
    })

    it('should handle non-string discount ', () => {
        expect(calculateDiscount(10, 10)).toMatch(/invalid/i)
    })

    it('should handle invalid discount code', () => {
        expect(calculateDiscount(10, 'INVALID')).toBe(10)
    })
    
})

describe('validateUserInput', () => {

    it('should return success if given a valid input', () => {
        expect(validateUserInput('abc', 18)).toMatch(/success/i);
    })

    it('should return an error if username is not a string', () => {
        expect(validateUserInput(1, 18)).toMatch(/invalid/i);
    })

    it('should return an error if username is not 3 characters long', () => {
        expect(validateUserInput('ab', 18)).toMatch(/invalid/i);
    })

    it('should return an error if username is longer than 255 characters', () => {
        expect(validateUserInput('a'.repeat(256), 18)).toMatch(/invalid/i);
    })

    it('should return an error if age is not a number', () => {
        expect(validateUserInput('abc', '18')).toMatch(/invalid/i);
    })

    it('should return an error if age is less than 18', () => {
        expect(validateUserInput('abc', 17)).toMatch(/invalid/i);
    })

    it('should return an error if age is greater than 100', () => {
        expect(validateUserInput('abc', 101)).toMatch(/invalid/i)
    })

    it('should return an error if both username and age are invalid', () => {
        expect(validateUserInput('', 0)).toMatch(/invalid username/i);
        expect(validateUserInput('', 0)).toMatch(/invalid age/i);
    })

})