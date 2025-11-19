const activities = [];
const LIMIT = 90;
const activityDay = new Date(2025, 7, 23).toLocaleDateString("en-US");

// active: string, duration: number, date: string
function addActivity(activity, duration, date = new Date().toLocaleDateString("en-US")){
  activities.push({
    activity: activity,
    duration: duration,
    date: date,
  });
}

addActivity("Youtube", 30, activityDay);
addActivity("Instagram", 40, activityDay);
addActivity("Facebook", 20, activityDay);

console.log(activities);

function printActivities(){
  console.log("*** ALL ACTIVITIES ***");
  for(let item of activities){
    console.log(`date: ${item.date} - activity: ${item.activity} - duration: ${item.duration}`);
  }
}

printActivities();

// Show activities of the day
function showStatus(activities){
  console.log("*** STATUS TODAY ***")
  if (activities.length === 0){
    console.log("Add some activities before calling showStatus");
    return;
  }
  let totalDuration = 0;
  const today = new Date().toLocaleDateString("en-US");
  const currentDay = new Date(today).getTime();
  
  let numberActivities = 0;
  for (let item of activities){
    
    let day = new Date(item.date).getTime();
    // If date is stored as DD/MM/YYYY (new Date().toLocaleDateString()), it results in NaN.
    // But if it uses "en-US", like new Date().toLocaleDateString("en-US"), works. Why? 
    console.log("DAY:", day , "CURRENT DAY:", currentDay); 
    console.log("DATE COMPARISON:", day  < currentDay)
    
    if (day < currentDay){
      continue;
    }
    totalDuration += item.duration;
    numberActivities ++;
  }

  console.log(`You have added ${numberActivities} activities today. They amount to ${totalDuration} min. of usage.`);
  if (totalDuration >= LIMIT){
    console.log("You have reached your limit, no more smartphoning for you! ");
  }

}

showStatus(activities);
addActivity("WhatsApp", 10, activityDay);

printActivities();
showStatus(activities);

addActivity("Games", 30);
printActivities();
showStatus(activities);