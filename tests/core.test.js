import { describe, expect, it } from 'vitest';
import { getCoupons } from '../src/core';

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
