import { describe, it, expect } from 'vitest';
import { fizzBuzz, max } from '../src/intro';

describe('Max', () => {
    it('should return the first argument if it is greater', () => {
        expect(max(2, 1)).toBe(2);
    })

    it('should return the second argument if it is greater', () => {
        expect(max(1, 2)).toBe(2);
    })

    it('should return the first argument if they are equal', () => {
        expect(max(1, 1)).toBe(1);
    })
})

describe('FizzBuzz', () => {
    it('should return FizzBuzz if its divisible by 3 and 5', () => {
        expect(fizzBuzz(15)).toBe('FizzBuzz');
    })

    it('should return Fizz if its divisible by 3', () => {
        expect(fizzBuzz(3)).toBe('Fizz');
    })

    it('should return Buzz if its divisible by 5', () => {
        expect(fizzBuzz(5)).toBe('Buzz');
    })

    it('should return the same number if its not divisible by either 3 or 5', () => {
        expect(fizzBuzz(1)).toBe('1');
    })
})