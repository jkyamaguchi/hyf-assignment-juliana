// Get the container where the list will be added
const container = document.getElementById('list-container');

// Create a ul element
const ul = document.createElement('ul');

// Create li elements
const items = [
    "Sukiyaki",
    "Ramen",
    "Sushi",
    "Pizza",
    "Pasta"
]

items.forEach(itemText => {
  const li = document.createElement('li');  // Create a new li element
  const textNode = document.createTextNode(itemText);  // Create a text node
  li.appendChild(textNode);  // Append the text node to the li element
  ul.appendChild(li);  // Append the li element to the ul
});
// Append the ul to the container
container.appendChild(ul);