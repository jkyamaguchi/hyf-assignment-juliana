const seriesDurations = [
  {
    title: "Game of thrones",
    days: 3,
    hours: 1,
    minutes: 0,
  },
  {
    title: "Sopranos",
    days: 3,
    hours: 14,
    minutes: 0,
  },
  {
    title: "The Wire",
    days: 2,
    hours: 12,
    minutes: 0,
  },
  {
    title: "Friends",
    days: 3,
    hours: 11,
    minutes: 36,
  },
];

// Average lifespan in years
const averageLifespan = 80;

function getLifespanMinutes(averageLifespan) {
  // Calculate total days in lifespan
  const days = averageLifespan * 365;
  // Calculate total minutes
  const minutes = days * 24 * 60;
  return minutes;
}

function getSeriesDurationMinutes(seriesDuration) {
  const daysToMinutes = seriesDuration.days * 24 * 60;
  const hoursToMinutes = seriesDuration.hours * 60;
  return daysToMinutes + hoursToMinutes + seriesDuration.minutes;
}

function calculateWatchedPercentage(seriesDuration) {
  const lifespanMinutes = getLifespanMinutes(averageLifespan);
  const seriesDurationMinutes = getSeriesDurationMinutes(seriesDuration);
  const percentage = (seriesDurationMinutes * 100) / lifespanMinutes;
  return percentage;
}

function logOutSeriesText() {
  let totalPercentage = 0;
  for (const seriesDuration of seriesDurations) {
    const percentage = calculateWatchedPercentage(seriesDuration);
    const message = seriesDuration.title + " took " + percentage.toFixed(3) + "% of my life.";

    totalPercentage += percentage;
    console.log(message);
  }
  console.log("In total that is " + totalPercentage.toFixed(3) + "% of my life.");
}

logOutSeriesText();
