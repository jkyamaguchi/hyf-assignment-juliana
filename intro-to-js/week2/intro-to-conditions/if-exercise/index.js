const balance = 5000;

if (balance <= 0) {
  console.log(`Please deposit some money`);
} else if (balance <= 1000) {
  console.log(`Your balance is looking okay`);
} else if (balance <= 3000) {
  console.log(`Your balance is looking good`);
} else if (balance <= 10000) {
  console.log(`Your balance is fantastic`);
} else {
  console.log(`Your balance is AMAZING!`);    
}
