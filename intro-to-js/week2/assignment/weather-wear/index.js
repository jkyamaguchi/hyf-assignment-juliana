function getClothes(temperature){
  if (temperature <= 5){
    return "It's freezing cold! Wear long-sleeve wool + sweater + jacket + scarf + gloves + wind proof pants";
  } else if (temperature <= 10){
    return "It's very cool weather! Wear long-sleeve thermal or cotton shirt + jacket + jeans";
  } else if (temperature <= 15){
    return "It's cool weather! Wear short-sleeve t-shirt + jacket + jeans";
  } else if (temperature <= 20){
    return "It's mild weather! Wear short-sleeve cotton shirt + light cotton pants";
  } else if (temperature <= 25){
    return "It's warm! Wear short-sleeve or sleeveless t-shirt + linen or cotton shorts";
  } else if(temperature <= 30){
    return "It's hot! Wear lightweight cotton or linen t-shirt + loose linen or cotton shorts"
  } else if (temperature <= 35){
    return "It's very hot! Wear quick-dry fabrics t-shirts + ultra-light shorts or skirts";
  } else if (temperature <= 40){
    return "It's extremely hot! Wear breathable fabrics for t-shirts and shorts or skirts in very light colors";
  } else {
    return "It's boiling! Wear breathable and light fabrics for t-shirts and shorts or skirts in very light colors."; 
  }
}

const temperatures = [-3, 9, 20, 33, 40];

for(let i = 0; i < temperatures.length; i++){
    console.log(`It's ${temperatures[i]}°C. `, getClothes(temperatures[i]));
}
