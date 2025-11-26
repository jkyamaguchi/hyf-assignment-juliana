/**
 * Given a specific position in the Fibonacci sequence,
 * return the Fibonacci number.
 */

function fib(position){
  if (position <= 0){
    console.error('Not allowed');
    return NaN;
  }
  const values = [0, 1];

  for (let i = 2; i < position; i++){
    const result = values[i - 1] + values[i - 2];
    values.push(result);
  }
  console.log(values);
  return values[position - 1];
 
}

const f = fib(-2);
console.log(f);