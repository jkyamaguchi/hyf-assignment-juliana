function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getWeekday(index){
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"];
  return weekdays[index];
}

/**
 * numDays: how many days from today an event is being held
 */
function getEventWeekday(numDays){
  const today = new Date();
  const todayWeekday = today.getDay();
  console.log(`Today: `, todayWeekday);
  const eventDay = addDays(today, numDays);
  const eventWeekday = eventDay.getDay();
  console.log(`The event in ${numDays} days will be on `, eventWeekday);
  return getWeekday(eventWeekday); 
}

const numDays = 8;
console.log(`The event in ${numDays} days (from today) will be on `, getEventWeekday(numDays));