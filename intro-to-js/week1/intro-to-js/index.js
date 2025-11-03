console.log('Hello HYF');

let myVariable = 123;
myVariable = 456;

//String
const myString = 'a string';
const myOtherString = "a string";
const myOtherOtherString = `a string`;

//Number
const myNumber =1;
const myOtherNumber = 1.23;
const myBigNumber = 1_000_000_123;

//Boolean
const yes = true;
const no = false;

//Object
const myObject = {
    a: 123,
    b: 'a string'
};

console.log("myObject.a: ", myObject.a);
console.log("myObject['a']: ", myObject['a']);
console.log("myObject.c:", myObject.c);

//Array
const myArray = ['a', 'b', 'c'];
const myOtherArray = new Array(); //rare

console.log("myArray[0]: ", myArray[0]); //a

console.log("myArray[5]: ", myArray[5]); //undefined
console.log("myArray.length: ", myArray.length); //undefined

//JS gives 'undefined' if there's access for a non-existing index of the array

console.log("typeof 3: ", typeof 3);


const threeArray = [3]
const value = threeArray[0];
console.log("typeof value: ", typeof value); //equal to console.log(typeof [3][0]); creates an array and immediately access the first index 

const myEmptyArray = [];
console.log("typeof myEmptyArray: ", typeof myEmptyArray); //object

const mySecondArray = [1,2,3];
console.log(typeof mySecondArray[0]); //object
mySecondArray[3] = 4 ; //add 4 , even though it's const, JS can change the value inside the variable

const myOtherObject = {
    value: '321',
    value: 'j' //overwrite value
};

myOtherObject.property = 1; //change the value of myOtherObject
console.log("myOtherObject.property: ", myOtherObject.property);

console.log("typeof null: ", typeof null); //object
console.log("typeof undefined: ", typeof undefined); //undefined

console.log("1 == '1': ", 1 == '1'); //true
console.log("1 === '1'", 1 === '1'); // 1=='1' AND typeof 1 == typeof '1' false, the types are different 

//prefer user ===

console.log("1 <= '1': ", 1 <= '1'); //true
console.log("1 != '1': ", 1 != '1'); //false
console.log("1 !== '1': ", 1 !== '1'); //true

console.log("[] == []: ", [] == []); //false

console.log("[1,2,3] == [1,2,3]: ", [1,2,3] == [1,2,3]); //to check value, check manually

const num1 = 24;
const num2 = 55;
const result = num1*num2;
console.log(num1, " * ", num2 , " = ", result);

const myName = 'Juliana';
const myLastName = 'Yamaguchi';
console.log("First letter of myName: ", myName[0]);
console.log("Last letter of myName: ", myName[myName.length-1]);
const fullName = `${myName} ${myLastName}`;
console.log("Full name: ", fullName);

//array with 3 strings, three numbers and three booleans
const newArray = ["string1", "string2", "string3", 1, 2, 3, true, 1 ==='1', false];
console.log("newArray: ", newArray);

let name = "benjamin";
name = "benjamin-better";

const pizzaPrice = 78;
const pizzaPriceDiscounted = pizzaPrice - 10;

const users = ["peter", "Johnny", "Børge"];

const lastUser = users[users.length-1];