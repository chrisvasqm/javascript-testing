// Lesson: Writing your first tests
export const max = (a, b) => (a > b) ? a : b;

// Exercise
export function fizzBuzz(n) {
  if (isDivisibleBy(n, 15)) return 'FizzBuzz';
  if (isDivisibleBy(n, 3)) return 'Fizz';
  if (isDivisibleBy(n, 5)) return 'Buzz';
  
  return n.toString();
}

function isDivisibleBy(number, divisor) {
  return number % divisor === 0;
} 

export function calculateAverage(numbers) {
  if (numbers.length === 0 ) return NaN;

  const sum = numbers.reduce((sum, current) => sum + current, 0);

  return sum / numbers.length;
}

export function factorial(n) {
  if (n < 0) return undefined;
  if (n === 0 || n === 1) return 1;

  return n * factorial(n - 1)
}