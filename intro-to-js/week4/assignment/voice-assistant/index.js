let userName = "";
let todoList = [];

// The function includes() returns a boolean.
// Return the index where values is included in myArray.
function getIndexOfMyArray(values, myArray) {
  const contains = (input) => values.includes(input);
  const index = myArray.findIndex(contains);
  return index;
}

function niceToMeetYou(command) {
  const tokens = command.split(" ");
  const arrayName = tokens.splice(4, tokens.length - 1);
  userName = arrayName.join(" ");
  return "Nice to meet you " + userName + "!";
}

function getName() {
  let output = "";
  if (userName !== "") {
    output = "Your name is " + userName + ".";
  } else {
    output = "You didn't informed your name.";
  }
  return output;
}

function getTask(command) {
  const tokens = command.split(" ");
  // Remove "to my todo" or "from my todo" from command
  tokens.splice(tokens.length - 3, tokens.length - 1);
  // Remove "add" or "remove" from command
  tokens.splice(0, 1);
  // Transform array to string
  return tokens.join(" ");
}

function addToDo(command) {
  const task = getTask(command);
  todoList.push(task);
  return task + " added to your todo.";
}

function removeToDo(command) {
  const task = getTask(command);
  const index = getIndexOfMyArray(task, todoList);

  if (index >= 0) {
    todoList.splice(index, 1);
  }
  return "Removed " + task + " from your todo.";
}

function getToDoList() {
  const size = todoList.length;
  let message = "";
  if (size > 0) {
    message = "You have " + size + " todos:";
    for (let task of todoList) {
      message += " " + task + ",";
    }
  } else {
    message = "You don't have todo.";
  }
  return message;
}

function getToday() {
  const date = new Date();
  const day = date.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = date.getMonth();
  const year = date.getFullYear();
  const output = `${day}. of ${monthNames[month]} ${year}`;
  return output;
}

function calculate(expression) {
  const a = Number(expression[0]);
  const operator = expression[1];
  const b = Number(expression[2]);
  let result;
  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      result = a / b;
      break;
  }
  return result;
}

function doMath(command) {
  const tokens = command.split(" ");
  // Remove "what is" from command
  tokens.splice(0, 2);
  const output = calculate(tokens);
  return output;
}

function getMilliseconds(tokens) {
  const value = Number(tokens[0]);
  const unit = tokens[1];
  let milliseconds;
  switch (unit) {
    case "minute":
    case "minutes":
      milliseconds = value * 60 * 1000;
      break;
    case "second":
    case "seconds":
      milliseconds = value * 1000;
      break;
  }
  return milliseconds;
}

function setAlert(){
  alert("Timer done");
}

function setTimer(command) {
  const tokens = command.split(" ");
  // Remove "set a timer for"
  tokens.splice(0, 4);
  const milliseconds = getMilliseconds(tokens);
  const message =  "Timer set for " + tokens[0] + " " + tokens[1];
  // Return multiples values as array
  return [message, milliseconds];
}

function getReply(command) {
  command = command.toLowerCase();
  const inputs = [
    "hello my name is",
    "what is my name",
    "add", //to my todo
    "remove", //from my todo
    "what is on my todo?",
    "what day is it today?",
    "what is",
    "set a timer for",
  ];

  const index = getIndexOfMyArray(command, inputs);

  let reply, milliseconds;
  switch (index) {
    case 0:
      reply = niceToMeetYou(command);
      break;
    case 1:
      reply = getName();
      break;
    case 2:
      reply = addToDo(command);
      break;
    case 3:
      reply = removeToDo(command);
      break;
    case 4:
      reply = getToDoList();
      break;
    case 5:
      reply = getToday();
      break;
    case 6:
      reply = doMath(command);
      break;
    case 7:
      //setTimer return multiples values as array  
      [reply, milliseconds] = setTimer(command); 
      setTimeout(setAlert, milliseconds);
      break;
  }
  return reply;
}

let command;

command = "hello my name is juliana yamaguchi";
console.log(getReply(command));

command = "what is my name";
console.log(getReply(command));

command = "add fishing to my todo";
console.log(getReply(command));
console.log(todoList);

command = "remove fishing from my todo";
console.log(getReply(command));
console.log(todoList);

command = "what is on my todo?";
console.log(getReply(command));

command = "add fishing to my todo";
console.log(getReply(command));

command = "add singing in the shower to my todo";
console.log(getReply(command));

command = "what is on my todo?";
console.log(getReply(command));

command = "what day is it today?";
console.log(getReply(command));

command = "what is 3 + 3";
console.log(getReply(command));

command = "what is 4 * 12";
console.log(getReply(command));

command = "Set a timer for 3 seconds";
console.log(getReply(command));
