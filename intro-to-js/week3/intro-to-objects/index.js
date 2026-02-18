const fruits = ["banana", "apple", "cherry"];
console.log(fruits);

fruits[fruits.length] = "strawberry"; //fruits.push('strawberry');
printFruits(fruits)

function printFruits(fruits){
  console.log("=== FRUITS ===");
  for (let i = 0; i < fruits.length; i++){
    console.log(fruits[i]);  
  }
  console.log("==================");
}

function addAtBeginningOfArray01(arr, value) {
  const result = [value];
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i]);
  }
  return result; //create another array
}

function addAtBeginningOfArray02(arr, value) {
  for (let i = arr.length - 1; i >= 0 ; i--) {
    arr[i + 1] = arr[i];
    console.log("i:", i+1, arr[i+1]); 
  }
  arr[0] = value;
}

console.log("Adding at begin 01:", addAtBeginningOfArray01(fruits, 'peach'));
printFruits(fruits);

console.log("Adding at begin 02:" );
addAtBeginningOfArray02(fruits, 'ananas');
printFruits(fruits);

fruits.unshift('peach');

function popAndCopy(arr){
    const result = [];

    // validating the input
    if (arr.length <= 1){
        return [];
    }

    for(let i = 0; i<arr.length -2; i++){
        result[i] == arr[i];
    }
}


// arr is for reference and overrites the object.
console.log(popAndCopy(fruits));

printFruits(fruits);

fruits.shift();
printFruits(fruits);