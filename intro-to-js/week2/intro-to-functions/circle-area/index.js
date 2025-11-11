function getCircleArea (radius){
  return Math.PI * Math.pow(radius, 2); //radius ** 2;
}

const radius = 3;
const circleArea = getCircleArea (radius);
console.log(`Circle area rounded = ${Math.round(circleArea)}`);

console.log(`Circle area rounded 2 decimals = ${circleArea.toFixed(2)}`);