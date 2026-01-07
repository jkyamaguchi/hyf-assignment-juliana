const HOGWARTS_HOUSES = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
const inputName = document.getElementById("name");
const container = document.getElementById("chosen-house");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getHouse(name) {
  const index = getRandomInt(HOGWARTS_HOUSES.length);
  const house = HOGWARTS_HOUSES[index];
  return `${name} belongs in ${house}!`;
}

inputName.addEventListener("invalid", (e) => {
  e.target.setCustomValidity("Please enter your name.");
});

// Sets a custom error message when the browser validates 
// the field and it’s invalid (e.g., on submit).
inputName.addEventListener("input", (e) => {
  e.target.setCustomValidity("");
});

// Clears that custom message as soon as the user types,
// otherwise the custom validity persists and the field stays invalid even after fixing it
function clearContent(elementId) {
  const el = document.getElementById(elementId);
  if (el) el.textContent = "";
}

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  if (!form.checkValidity()) {
    // let the browser show the validation message
    return;
  }
  event.preventDefault(); // stop page reload only when valid
  clearContent("chosen-house");
  const name = inputName.value.trim();
  if (name) {
    const itemText = getHouse(name);
    container.textContent = itemText;
    form.reset(); // clear input(s)
    inputName.focus(); // focus back to the input
  }
  
});
