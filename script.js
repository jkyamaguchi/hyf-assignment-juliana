// Array of background colors to cycle through
const colors = [
  "#47007a", // Original purple
  "#007a47", // Green
  "#7a4700", // Brown/Orange
  "#007a7a", // Teal
  "#7a0047", // Magenta
  "#4700aa", // Dark purple
];

let currentColorIndex = 0;

// Function to change background color by running through color indexes
function changeBackgroundColor() {
  currentColorIndex = (currentColorIndex + 1) % colors.length;
  const newColor = colors[currentColorIndex];

  // Update CSS custom property
  document.documentElement.style.setProperty("--accent", newColor);
}

// Add event listener to the palette button
document.addEventListener("DOMContentLoaded", function () {
  const paletteButton = document.querySelector(
    'button[aria-label="Change color"]'
  );
  if (paletteButton) {
    paletteButton.addEventListener("click", changeBackgroundColor);
  }
});
