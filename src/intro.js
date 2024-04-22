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