function isValidInput(input) {
  // Regular expression to validate the input
  // ^ → start of string
  // \d{9} → exactly 9 digits
  // $ → end of string
  const regex = /^\d{9}$/;
  return regex.test(input);
}

function formatNumber(input) {
  // If input is number, transform to String
  if (typeof input == "number") {
    input = input.toString();
  }
  // Transform input to array to use splice function
  const arr = Array.from(input);
  const position1 = 4;
  const position2 = 9;
  // at positionX, remove 0 elements, then add " " to that position
  arr.splice(position1, 0, " ");
  arr.splice(position2, 0, " ");
  // arr.toString() add commas into the string like "1,2,3"
  return arr.join(""); //remove commas from arr when transformed to String
}

function formatCreditCardNumber(number) {
  const output = {
    original: number,
    formatted: "",
  };
  if (isValidInput(number)) {
    output.formatted = formatNumber(number);
    return output;
  } else {
    return "Invalid input.";
  }
}

console.log(123456789, formatCreditCardNumber(123456789));
console.log("123456789", formatCreditCardNumber("123456789"));
console.log(12345678, formatCreditCardNumber(12345678));
console.log("123A56789", formatCreditCardNumber("123A56789"));

function getCreditCardType(number) {
  let type;
  const numberToString = number.toString();
  // Switch uses strict comparison (===)
  switch (numberToString[0]) {
    case "2":
    case "5":
      type = "mastercard";
      break;
    case "3":
      type = "american express";
      break;
    case "4":
      type = "visa";
      break;
  }
  return type;
}

console.log("4111 1111 1111 1111", getCreditCardType(4111111111111111));
console.log("5105 1051 0510 5100",  getCreditCardType(5105105105105100));
console.log("2223 0000 4848 0011", getCreditCardType(2223000048480011));
console.log("3782 822463 10005", getCreditCardType(378282246310005));