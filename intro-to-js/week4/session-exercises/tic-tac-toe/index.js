const positions = [
  [
    ["x", "o", " "],
    [" ", "o", " "],
    [" ", "o", "x"],
  ],
  [
    ["x", " ", "x"],
    [" ", " ", " "],
    [" ", "o", "x"],
  ],
  [
    ["x", "o", "o"],
    ["x", "x", "o"],
    ["o", "x", "o"],
  ],
  [
    ["x", "o", "o"],
    ["x", "o", "o"],
    ["o", "x", "x"],
  ],
  [
    ["x", "x", "x"],
    ["x", "o", "o"],
    ["o", "x", "x"],
  ],
  [
    ["x", "o", "x"],
    ["x", "o", "o"],
    ["x", " ", "x"],
  ],
  [
    ["x", "o", "x"],
    ["x", "x", "o"],
    ["o", "o", "x"],
  ],
  [
    ["x", "x", "o"],
    ["o", "o", "x"],
    ["o", "o", "x"],
  ],
  [
    [" ", " ", " "],
    ["x", "x", "o"],
    ["o", "o", "x"],
  ],
  [
    [" ", "o", " "],
    [" ", "x", "o"],
    [" ", "o", "x"],
  ],
  [
    [" ", "o", " "],
    [" ", " ", "o"],
    [" ", "o", " "],
  ],


];

const positionA = [
  ["x", "o", "x"],
  [" ", "x", "x"],
  [" ", "o", "x"],
];

function getRenderedGame(position) {
  let output = "";
  for (let i = 0; i < position.length; i++) {
    for (let j = 0; j < position[i].length; j++) {
      output += position[i][j];
      output += " ";
    }
    output += "\n";
  }
  return output;
}

// Reports the final state of the game. 
function getGameInfo(position) {
  const output = {
    winner: undefined,
    loser: undefined,
    hasEnded: false,
  };

  let hasWinner = false;
  const row = checkWinnerRow(position);
  // console.log("ROW", row);
  
  const column = checkWinnerColumn(position);
  // console.log("COLUMN", column);

  const d1 = checkWinnerDiagonalPrimary(position);
  // console.log("PRIMARY DIAGONAL", d1);

  const d2 = checkWinnerDiagonalSecondary(position);
  // console.log("SECONDARY DIAGONAL", d2);

  if (row !== ""){
    output.winner = row;
    output.loser = getOpponent(row.charAt(0));
    hasWinner = true;
  }
  if (column !== ""){
    output.winner = column;
    output.loser = getOpponent(column.charAt(0));
    hasWinner = true;
  }
  if (d1 !== ""){
    output.winner = d1;
    output.loser = getOpponent (d1);
    hasWinner = true;
  }
  if (d2 !== ""){
    output.winner = d2;
    output.loser = getOpponent(d2);
    hasWinner = true;
  }

  const completed = isFilled(position);

  if (completed || hasWinner){
    output.hasEnded = true;
  } 
  console.log(output);
  return output;
}

function checkWinnerRow(position) {
  let check = "";
  let row;
  for (let i = 0; i < position.length; i++) {
    for (let j = 0; j < position[i].length - 1; j++) {
      //console.log("CHECK ROW i j", i, j, position[i][j] );
      if (position[i][j] === position[i][j + 1] && position[i][j] !== " ") {
        check = position[i][j];
        row = i;
      } else {
        check = "";
        break;
      }
    }
    if (check !== "") {
      return check + " in row " + (row + 1);
    }
  }
  return check;
}

function checkWinnerColumn(position) {
  let check = "";
  let column;
  for (let i = 0; i < position.length; i++) {
    for (let j = 0; j < position[i].length - 1; j++) {
      //console.log("CHECK COLUMN j i", j, i, position[j][i] );
      if (position[j][i] === position[j + 1][i] && position[j][i] !== " ") {
        check = position[j][i];
        column = i;
        //console.log("equal j+1", check);
      } else {
        check = "";
        break;
      }
    }
    if (check !== "") {
      return check + " in column " + (column + 1);
    }
  }
  return check;
}

function checkWinnerDiagonalPrimary(position) {
  let check;
  for (let i = 0; i < position.length - 1; i++) {
    if (position[i][i] === position[i + 1][i + 1] && position[i][i] !== " ") {
      check = position[i][i];
    } else {
      check = "";
      break;
    }
  }
  return check;
}

function checkWinnerDiagonalSecondary(position) {
  let check;
  let j = position.length - 1;
  for (let i = 0; i < position.length - 1; i++) {
    if (position[i][j] === position[i + 1][j - 1] && position[i][j] !== " ") {
      check = position[i][j];
    } else {
      check = "";
      break;
    }
    j--;
  }
  return check;
}

function isFilled(position) {
  let isCompleted = false;
  for (let i = 0; i < position.length; i++) {
    for (let j = 0; j < position[i].length; j++) {
      if (position[i][j] !== " ") {
        isCompleted = true;
      } else {
        isCompleted = false;
        return isCompleted;
      }
    }
  }
  return isCompleted;
}

function getOpponent(symbol){
  if (symbol === "o"){
    return "x";
  }
  else{
    return "o";
  }
}

for (let position of positions) {
  const renderedGame = getRenderedGame(position);
  console.log(renderedGame);
  console.log(getGameInfo(position));
}

// const renderedGame = getRenderedGame(positionA);
// console.log(renderedGame);
// getGameInfo(positionA);
