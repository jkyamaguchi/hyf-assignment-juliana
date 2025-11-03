let houseWidth, houseHeight, houseDepth;
let gardenSizeInM2;
let estimatedHousePrice;
let actualHousePrice;

function estimateHousePrice(
  houseWidth,
  houseHeight,
  houseDepth,
  gardenSizeInM2
) {
  let volumeInMeters;
  volumeInMeters = houseWidth * houseHeight * houseDepth;
  return volumeInMeters * 2.5 * 1000 + gardenSizeInM2 * 300;
}

//Peter's house
houseWidth = 8;
houseHeight = 10;
houseDepth = 10;
gardenSizeInM2 = 100;
actualHousePrice = 2_500_000;

estimatedHousePrice = estimateHousePrice(
  houseWidth,
  houseHeight,
  houseDepth,
  gardenSizeInM2
);

function showConsoleMessage(actualHousePrice, estimatedHousePrice) {
  if (actualHousePrice > estimatedHousePrice) {
    console.log(
      `Your actual house price is greater than the price estimated = ${estimatedHousePrice}.`
    );
  } else {
    console.log(
      `Your actual house price is less than or equal to the price estimated = ${estimatedHousePrice}.`
    );
  }
}

showConsoleMessage(actualHousePrice, estimatedHousePrice);

//Julia's house
houseWidth = 5;
houseHeight = 8;
houseDepth = 11;
gardenSizeInM2 = 70;
actualHousePrice = 1_000_000;

estimatedHousePrice = estimateHousePrice(
  houseWidth,
  houseHeight,
  houseDepth,
  gardenSizeInM2
);

showConsoleMessage(actualHousePrice, estimatedHousePrice);