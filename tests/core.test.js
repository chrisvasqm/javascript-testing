import { beforeEach, describe, expect, it } from 'vitest';
import {
  calculateDiscount,
  canDrive,
  fetchData,
  getCoupons,
  isPriceInRange,
  isValidUsername,
  Stack,
  validateUserInput,
} from '../src/core';

describe('getCoupons', () => {
  it('should not be empty ', () => {
    const coupons = getCoupons();

    expect(Array.isArray(coupons)).toBe(true);
    expect(coupons.length).toBeGreaterThan(0);
  });

  it('should return an array with valid coupons codes', () => {
    const coupons = getCoupons();

    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty('code');
      expect(typeof coupon.code).toBe('string');
      expect(coupon.code).toBeTruthy();
    });
  });

  it('should return an array with valid coupons discounts', () => {
    const coupons = getCoupons();

    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty('discount');
      expect(typeof coupon.discount).toBe('number');
      expect(coupon.discount).toBeGreaterThanOrEqual(0);
      expect(coupon.discount).toBeLessThanOrEqual(1);
    });
  });
});

describe('calculateDiscount', () => {
  it('should return discounted price if given a valid code', () => {
    expect(calculateDiscount(10, 'SAVE10')).toBe(9);
    expect(calculateDiscount(10, 'SAVE20')).toBe(8);
  });

  it('should handle non-numeric price', () => {
    expect(calculateDiscount('10', 'SAVE10')).toMatch(/invalid/i);
  });

  it('should handle negative price', () => {
    expect(calculateDiscount(-10, 'SAVE10')).toMatch(/invalid/i);
  });

  it('should handle non-string discount ', () => {
    expect(calculateDiscount(10, 10)).toMatch(/invalid/i);
  });

  it('should handle invalid discount code', () => {
    expect(calculateDiscount(10, 'INVALID')).toBe(10);
  });
});

describe('validateUserInput', () => {
  it('should return success if given a valid input', () => {
    expect(validateUserInput('abc', 18)).toMatch(/success/i);
  });

  it('should return an error if username is not a string', () => {
    expect(validateUserInput(1, 18)).toMatch(/invalid/i);
  });

  it('should return an error if username is not 3 characters long', () => {
    expect(validateUserInput('ab', 18)).toMatch(/invalid/i);
  });

  it('should return an error if username is longer than 255 characters', () => {
    expect(validateUserInput('a'.repeat(256), 18)).toMatch(/invalid/i);
  });

  it('should return an error if age is not a number', () => {
    expect(validateUserInput('abc', '18')).toMatch(/invalid/i);
  });

  it('should return an error if age is less than 18', () => {
    expect(validateUserInput('abc', 17)).toMatch(/invalid/i);
  });

  it('should return an error if age is greater than 100', () => {
    expect(validateUserInput('abc', 101)).toMatch(/invalid/i);
  });

  it('should return an error if both username and age are invalid', () => {
    expect(validateUserInput('', 0)).toMatch(/invalid username/i);
    expect(validateUserInput('', 0)).toMatch(/invalid age/i);
  });
});

describe('isPriceInRange', () => {
  it.each([
    { scenario: 'price < min', price: -1, result: false },
    { scenario: 'price = min', price: 0, result: true },
    { scenario: 'price between min and max', price: 50, result: true },
    { scenario: 'price > max', price: 101, result: false },
    { scenario: 'price = max', price: 100, result: true },
  ])('should return $result when $scenario', ({ price, result }) => {
    expect(isPriceInRange(price, 0, 100)).toBe(result);
  });
});

describe('isValidUsername', () => {
  it('should return false if length is outside the range', () => {
    expect(isValidUsername('a'.repeat(4))).toBe(false);
    expect(isValidUsername('a'.repeat(16))).toBe(false);
  });

  it('should return true if length is equal to min and max lengths', () => {
    expect(isValidUsername('a'.repeat(5))).toBe(true);
    expect(isValidUsername('a'.repeat(15))).toBe(true);
  });

  it('should return true if legth is between min and max lengths', () => {
    expect(isValidUsername('a'.repeat(10))).toBe(true);
  });

  it('should return false if username is falsy', () => {
    expect(isValidUsername(null)).toBe(false);
    expect(isValidUsername(undefined)).toBe(false);
    expect(isValidUsername(0)).toBe(false);
  });
});

describe('canDrive', () => {
  it('should return false if countryCode is invalid', () => {
    expect(canDrive(18, 'ES')).toMatch(/invalid/i);
  });

  it.each([
    { age: 15, country: 'US', result: false },
    { age: 16, country: 'US', result: true },
    { age: 17, country: 'US', result: true },
    { age: 16, country: 'UK', result: false },
    { age: 17, country: 'UK', result: true },
    { age: 18, country: 'UK', result: true },
  ])('should return $result for $age, $country', ({ age, country, result }) => {
    expect(canDrive(age, country)).toBe(result);
  });
});

describe('fetchData', () => {
  it('should return an array of numbers', async () => {
    const result = await fetchData();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
});

describe('Stack', () => {
  let stack = null;

  beforeEach(() => {
    stack = new Stack();
  });

  it('should be able to add an item to the stack', () => {
    stack.push(1);

    expect(stack.size()).toBe(1);
  });

  it('should be able to return and remove an item from the stack', () => {
    stack.push(1);

    const result = stack.pop();

    expect(result).toBe(1);
    expect(stack.size()).toBe(0);
  });

  it('should throw an error when popping if the stack is already empty', () => {
    expect(() => stack.pop()).toThrow(/empty/i);
  });

  it('should return the last item from the stack', () => {
    stack.push(1);
    stack.push(2);

    const result = stack.peek();

    expect(result).toBe(2);
  });

  it('should throw an error when peeking if the stack is empty', () => {
    expect(() => stack.peek()).toThrow(/empty/i);
  });

  it('should return true if the stack already is empty', () => {
    expect(stack.isEmpty()).toBe(true);
  });

  it('should return false if the stack is not empty', () => {
    stack.push(1);

    expect(stack.isEmpty()).toBe(false);
  });

  it('should return the number of items inside the stack', () => {
    expect(stack.size()).toBe(0);

    stack.push(1);

    expect(stack.size()).toBe(1);
  });

  it('should clear all the items inside a stack', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.clear();

    expect(stack.size()).toBe(0);
  });
});
