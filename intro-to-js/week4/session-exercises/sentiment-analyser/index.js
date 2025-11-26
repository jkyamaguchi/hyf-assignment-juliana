const positiveWords = [
  "awesome",
  "happy",
  "super",
];

const negativeWords = [
  "disappointed",
  "furious",
  "nothing",
];

function getSentimentScore(phrase){
  const output = {
    score: 0,
    positiveWords: [],
    negativeWords: []
  }

  // Split the phrase in tokens according to the regular expression
  const regex = /[ ;.]+/; // Split on one or more space, semicolon, or period
  const tokens = phrase.split(regex);
  console.log(tokens);

  // Iterate over each token checking if it is positive or negative word.
  for(let token of tokens){
    if (positiveWords.includes(token)){
      output.score++;
      output.positiveWords.push(token);
    } else if (negativeWords.includes(token)){
      output.score--;
      output.negativeWords.push(token);
    }
  }

  return output;
}

console.log(getSentimentScore("I am mega super awesome happy."));

console.log(getSentimentScore("I'm not just disappointed; I'm furious that nothing was handled properly from the start."));
