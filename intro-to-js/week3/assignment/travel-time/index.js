const travelInformation = {
  speed: 50,
  destinationDistance: 432,
};

const travelTime = calculateTravelTime(travelInformation);

function calculateTravelTime(travelInformation){
    const hours = travelInformation.destinationDistance / travelInformation.speed;
    return timeConvert(hours);
}

function timeConvert(hours) {
  // Round down the total hours to get the number of full hours
  const fullHours = Math.floor(hours);
  // Calculate the remaining minutes after subtracting the full hours from the total hours
  const minutes = (hours - fullHours) * 60;
  // Round the remaining minutes to the nearest whole number
  const roundedMinutes = Math.round(minutes);
  // Construct and return a string representing the conversion result
  return fullHours + " hour(s) and " + roundedMinutes + " minute(s).";
}

console.log(travelTime); // 8 hours and 38 minutes