function isPalindrome(str) {
  let palindrome = false;
  let i, j;
  for (i = 0, j = str.length - 1; i < j; i++, j--) {
    if (str[i] !== str[j]) {
      break;
    }
  }
  // i === j for odd str.length
  // i === j + 1 for even str.length
  if (i === j || i === j + 1) {
    palindrome = true;
  }
  return palindrome;
}

function findLastIndexOf(element, array) {
  const indices = [];
  let idx = array.indexOf(element);
  while (idx !== -1) {
    indices.push(idx);
    idx = array.indexOf(element, idx + 1);
  }
  // if there's equal letters ahead in the word,
  // return the most far away one
  if (indices.length > 1) {
    return indices[indices.length - 1];
  } else {
    return -1;
  }
}

// Finds the longest palindromic substring of a given string
function palindromicSubstring(str) {
  let i = 0;
  let substr = "";
  while (i < str.length - 1) {
    const lastIndex = findLastIndexOf(str[i], str);
    if (lastIndex !== -1) {
      substr = str.substring(i, lastIndex + 1);
      if (isPalindrome(substr)) {
        return substr;
      }
    }
    i++;
  }
  return "Not a palindrome";
}

const inputs = [
  "levelheaded",
  "banana",
  "madamimadam",
  "repaperclip",
  "cliprepaper",
  "forgeeksskeegfor",
  "madam",
  "aabcdcbaxy",
  "pop",
  "palindrome",
  "abcd",
];

for (let input of inputs) {
  console.log(input, "palindrome:", palindromicSubstring(input));
}
