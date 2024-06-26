import { describe, it, expect } from 'vitest';
import { calculateAverage, factorial, fizzBuzz, max } from '../src/intro';

describe('Max', () => {
  it('should return the first argument if it is greater', () => {
    expect(max(2, 1)).toBe(2);
  });

  it('should return the second argument if it is greater', () => {
    expect(max(1, 2)).toBe(2);
  });

  it('should return the first argument if they are equal', () => {
    expect(max(1, 1)).toBe(1);
  });
});

describe('FizzBuzz', () => {
  it('should return FizzBuzz if its divisible by 3 and 5', () => {
    expect(fizzBuzz(15)).toBe('FizzBuzz');
  });

  it('should return Fizz if its divisible by 3', () => {
    expect(fizzBuzz(3)).toBe('Fizz');
  });

  it('should return Buzz if its divisible by 5', () => {
    expect(fizzBuzz(5)).toBe('Buzz');
  });

  it('should return the same number if its not divisible by either 3 or 5', () => {
    expect(fizzBuzz(1)).toBe('1');
  });
});

describe('calculateAverage', () => {
  it('should return NaN when given an empty array', () => {
    expect(calculateAverage([])).toBe(NaN);
  });

  it('should return the same number if given an array with a single element', () => {
    expect(calculateAverage([1])).toBe(1);
  });

  it('should return the average when given an array of two elements', () => {
    expect(calculateAverage([1, 2])).toBe(1.5);
  });

  it('should return the average when given an array of three elements', () => {
    expect(calculateAverage([1, 2, 3])).toBe(2);
  });
});

describe('Factorial', () => {
  it('should return 1 if given 0', () => {
    expect(factorial(0)).toBe(1);
  });

  it('should return 1 if given 1', () => {
    expect(factorial(1)).toBe(1);
  });

  it('should return 2 if given 2', () => {
    expect(factorial(2)).toBe(2);
  });

  it('should return 24 if given 4', () => {
    expect(factorial(4)).toBe(24);
  });

  it('should return undefined if given a negative value', () => {
    expect(factorial(-1)).toBeUndefined();
  });
});
