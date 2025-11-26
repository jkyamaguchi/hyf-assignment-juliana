function getCharacterFrequencies(word) {
  const output = {
    characters: [],
    length: word.length
  }

  // Iterate through the characters in the given word
  for (let i = 0; i < word.length; i++) {
    // For each character, put it in the output.characters array with 1 occurrence
    const character = word[i];

    const result = {
      character: character,
      count: 1
    }
    output.characters.push(result);
  }

  // Iterate through the characters in the given word
  for (let j = 0; j < output.characters.length; j++) {
    const letter = output.characters[j].character;

    // Iterate through the following characters
    for (let k = j + 1; k < output.characters.length; k++) {
      // Remove duplicates and increase the amount of occurrences
      if (output.characters[k].character === letter) {
        output.characters[j].count += 1;
        output.characters.splice(k, 1);
        // Go one step backward to avoid jumping over a letter
        k--;
      }
    }
  }

  return output;
}

console.log("happy", getCharacterFrequencies("happy"));

console.log("mississippi", getCharacterFrequencies("mississippi"));

console.log("smørrebrød", getCharacterFrequencies("smørrebrød"));

console.log("individual", getCharacterFrequencies("individual"));