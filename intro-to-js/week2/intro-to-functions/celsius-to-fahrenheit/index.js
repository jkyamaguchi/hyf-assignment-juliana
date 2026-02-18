function celsiusToFahrenheit(celsius) {
  return (celsius * 1.8) + 32; 
}

const celsius = 30;
const fahrenheit = celsiusToFahrenheit(celsius);

console.log(`${celsius} °C is ${fahrenheit} °F.`);